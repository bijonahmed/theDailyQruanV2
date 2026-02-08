<?php

namespace App\Http\Controllers\Deposit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Helper;
use App\Models\Holiday;
use App\Models\User;
use App\Models\ProductAttributeValue;
use App\Models\ProductVarrientHistory;
use App\Models\Categorys;
use App\Models\ProductAttributes;
use App\Models\ProductCategory;
use App\Models\Product;
use App\Models\ProductAdditionalImg;
use App\Models\ProductVarrient;
use App\Models\AttributeValues;
use App\Models\Deposit;
use App\Models\MiningServicesBuyHistory;
use App\Models\Setting;
use App\Models\TransactionHistory;
use App\Models\WalletAddress;
use App\Models\Withdraw;
use App\Models\addWithDrawMethod;
use App\Models\SendReceived;
use App\Models\Service;
use App\Models\WithdrawMethod;
use Illuminate\Support\Str;
use App\Rules\MatchOldPassword;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Session;
use Carbon\Carbon;
use DB;
use PDO;
use PhpParser\Node\Stmt\TryCatch;

class DepositController extends Controller
{
    protected $userid;
    public function __construct()
    {
        $this->middleware('auth:api');
        $id = auth('api')->user();
        if (!empty($id)) {
            $user = User::find($id->id);
            $this->userid = $user->id;
        }
    }

    public function getDepositList(Request $request)
    {

        $page           = $request->input('page', 1);
        $pageSize       = $request->input('pageSize', 10);
        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        $searchEmail    = $request->searchEmail;
        $filterFrmDate  = $request->filterFrmDate;
        $filterToDate   = $request->filterToDate;
        $searchOrderId  = $request->searchOrderId;

        // dd($selectedFilter);
        $query = Deposit::orderBy('deposit.id', 'desc')
            ->join('users', 'deposit.user_id', '=', 'users.id') // Join condition
            //   ->join('service', 'deposit.user_id', '=', 'service.id') // Join condition
            //->join('service', 'deposit.service_id', '=', 'service.id') // Corrected join
            ->select('deposit.*', 'users.email', 'users.name', 'users.phone_number')
            ->orderBy('deposit.id', 'desc'); // Sorting by 'id' in descending order

        // Check if filter dates are provided
        if (!empty($filterFrmDate) && !empty($filterToDate)) {
            // Filter by range (inclusive)
            $query->whereBetween(DB::raw('DATE(deposit.created_at)'), [$filterFrmDate, $filterToDate]);
        } elseif (!empty($filterFrmDate)) {
            // If only from date is provided, filter by that specific date
            $query->where(DB::raw('DATE(deposit.created_at)'), $filterFrmDate);
        } elseif (!empty($filterToDate)) {
            // If only to date is provided, filter by that specific date
            $query->where(DB::raw('DATE(deposit.created_at)'), $filterToDate);
        }

        if (!empty($searchEmail)) {
            $query->where('users.email', $searchEmail);
        }

        if (!empty($searchOrderId)) {
            // $query->where('depositID', 'like', '%' . $searchQuery . '%');
            $query->where('deposit.depositID', $searchOrderId);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            $checkService = Service::where('id',$item->service_id)->first();

        
            //Payment not received
            $userrow = User::find($item->user_id);
            return [
                'id'                => $item->id,
                'depositID'         => $item->depositID,
                'user_info_name'    => !empty($userrow->name) ?  $userrow->name : "N/A",
                'user_info_email'   => !empty($userrow->email) ?  $userrow->email : "N/A",
                'user_info_phone'   => !empty($userrow->phone_number) ?  $userrow->phone_number : "N/A",
                'deposit_amount'    => $item->deposit_amount,
                'receivable_amount' => !empty($item->receivable_amount) ? $item->receivable_amount : "Payment not received",
                'payment_method'    => $item->payment_method,
                'created_at'        =>  date("Y-m-d H:i:s", strtotime($item->created_at)),
                'payment_status'    => $item->payment_status,
                'serviceName'       => !empty($checkService->name) ? $checkService->name : "",

            ];
        });

        // Return the modified collection along with pagination metadata
        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }

    public function depositrow($id)
    {

        try {
            $user = Deposit::where('deposit.id', $id)
                ->select('users.name', 'deposit.*')
                ->leftJoin('users', 'deposit.user_id', '=', 'users.id')
                ->first();
            return response()->json($user);
        } catch (\Exception $e) {
            echo "Error: " . $e->getMessage();
            $error = $e->getMessage();
            return response()->json($error);
        }
    }

    public function withdrawrow($id)
    {

        try {

            $user = Withdraw::where('withdraw.id', $id)
                ->select('users.name', 'withdraw.*')
                ->join('users', 'withdraw.user_id', '=', 'users.id')
                ->first();

            $checkWalletAddress     =  WalletAddress::where('user_id', $user->user_id)->first();
            $wallet_address         = !empty($checkWalletAddress->wallet_address) ? $checkWalletAddress->wallet_address : "";
            $data['datarow']        = $user;
            $data['created_at']     = !empty($user->created_at) ? date("d-m-Y H:i:s", strtotime($user->created_at)) : "";
            $data['remarks']        = !empty($user->remarks) ? $user->remarks : "";
            $data['wallet_address'] = $wallet_address;
            return response()->json($data);
        } catch (\Exception $e) {
            echo "Error: " . $e->getMessage();
            $error = $e->getMessage();
            return response()->json($error);
        }
    }

    public function getWithMethodRow(Request $request)
    {
        $data = WithdrawMethod::where('id', $request->id)->first();
        return response()->json($data);
    }
}
