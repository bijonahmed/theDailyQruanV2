<?php

namespace App\Http\Controllers\Billing;

use Illuminate\Routing\Middleware\ThrottleRequests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Helper;
use App\Models\User;
use App\Models\Deposit;
use Illuminate\Support\Str;
use App\Rules\MatchOldPassword;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use DB;

class BillingController extends Controller
{
    protected $userid;
    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function getBillingDetails()
    {

        $userData   = Helper::UserData();
        $user_id    = $userData['userId']; // fallback to null if not set

        $query = Deposit::where('user_id', $user_id)->orderBy('id', 'desc')->get();
        $modifiedCollection = $query->map(function ($item) {
            return [
                'id'              => $item->id,
                'depositID'       => $item->depositID,
                'product'         => $item->product,
                'deposit_amount'  => $item->deposit_amount,
                'created_at'      => date("Y-m-d", strtotime($item->created_at)),
                'payment_status'  => $item->payment_status,
            ];
        });

        // Return the modified collection
        return response()->json([
            'data' => $modifiedCollection,
        ], 200);
    }
}
