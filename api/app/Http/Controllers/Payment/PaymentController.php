<?php

namespace App\Http\Controllers\Payment;

use Illuminate\Http\Request;
use Stripe\Stripe;
use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\Service;
use Stripe\PaymentIntent;
use Stripe\Checkout\Session;
use App\Models\User;
use Helper;
use Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller


{
    protected $frontend_url;
    public function __construct(Request $request)
    {
        $this->middleware('auth:api');
       
    }

    public function createPaymentIntent(Request $request)
    {
        //dd($request->all());

        try {
            // ✅ Set Stripe API Key
            Stripe::setApiKey(config('services.stripe.secret')); //Stripe::setApiKey(env('STRIPE_SECRET'));
            // ✅ Validate the request
            $validator = Validator::make($request->all(), [
                'amount'     => 'required|numeric',
                'books_slug' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }


            $userData   =  Helper::UserData();
            $email    = $userData['email']; // fallback to null if not set
            // ✅ Retrieve values from the request
            $amountVal = $request->input('amount');
            $amount = intval($amountVal * 100); // Convert USD to cents
            $currency = 'USD';
            $cusEmail = $email; // FIX: Ensure email comes from the request
            // ✅ Create Stripe Checkout Session
            $frontendSuccessUrl = $request->input('success_url') ?? env('FRONTEND_URL') . "/success";
            $frontendCancelUrl  = $request->input('cancel_url') ?? env('FRONTEND_URL') . "/cancel";

            $books_slug    = $request->input('books_slug');
            $service       = Service::where('slug', $books_slug)->first();

            $checkoutSession = Session::create([
                'success_url'    => $frontendSuccessUrl,
                'cancel_url'     => $frontendCancelUrl,
                'customer_email' => $cusEmail,
                //'payment_method_types' => ['card', 'link', 'alipay'],
				'payment_method_types' => ['card', 'link'],
                'line_items'     => [[
                    'price_data' => [
                        'product_data' => [
                            'name' => $service->name ?? '',
                        ],
                        'unit_amount' => $amount,
                        'currency'    => $currency,
                    ],
                    'quantity' => 1,
                ]],
                'mode'                => 'payment',
                'allow_promotion_codes' => true,

            ]);
            $amountVal     = $request->amount;
            $uniqueID      = 'W3-' . $this->generateUnique4DigitNumber();
            $userData      = Helper::UserData();
            $user_id       = $userData['userId']; 
            // ✅ Insert deposit into the database
            $logData = Deposit::create([
                'depositID'      => $uniqueID,
                'email'          => $cusEmail,
                'product'        => $service->name ?? '',
                'service_id'     => $service->id,
                'service_price'  => $service->price,
                'deposit_amount' => $amountVal,
                'currency'       => $currency,
                'user_id'        => $user_id,
                'payment_method' => 'Stripe',
                'payment_status' => 'pending',
                'checkout_url'   => $checkoutSession->url,
            ]);
            // Save to 'public/deposits/{uniqueID}.log'
            $logPath = public_path("deposits/{$uniqueID}.log");
            $logData = json_encode([
                'depositID'      => $uniqueID,
                'email'          => $cusEmail,
                'product'        => $request->input('product') ?? 'Deposit Payment',
                'deposit_amount' => $amountVal,
                'currency'       => $currency,
                'payment_method' => 'Strip',
                'user_id'        => $user_id,
                'payment_status' => 'pending',
                'checkout_url'   => $checkoutSession->url,
            ], JSON_PRETTY_PRINT);

            // ✅ Ensure the 'deposits' folder exists inside 'public/'
            if (!file_exists(public_path('deposits'))) {
                mkdir(public_path('deposits'), 0777, true); // Create folder with full permissions
            }
            // ✅ Write log file
            if (file_put_contents($logPath, $logData) === false) {
                \Log::error("Failed to write log file: {$logPath}");
            }

            return response()->json([
                'checkout_url' => $checkoutSession->url
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in createPaymentIntent:', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Something went wrong! ' . $e->getMessage()], 500);
        }
    }

    function generateUnique4DigitNumber()
    {
        $latestInvoice = Deposit::orderBy('id', 'desc')->first();
        if (!$latestInvoice) {
            return sprintf('%06d', 1);  // Format with leading zeros (6 digits)
        }
        $newInvoiceNumber = $latestInvoice->id + 1;
        return sprintf('%06d', $newInvoiceNumber);
    }
}
