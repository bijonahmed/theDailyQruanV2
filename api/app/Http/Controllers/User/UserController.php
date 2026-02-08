<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Categorys;
use App\Models\Community;
use App\Models\Countrys;
use App\Models\Deposit;
use App\Models\ExpenseHistory;
use App\Models\ManualAdjustment;
use App\Models\ManualAdjustmentDelete;
use App\Models\MiningServicesBuyHistory;
use App\Models\MystoreHistory;
use App\Models\Order;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Helper;
use App\Models\User;
use App\Models\Profile;
use App\Models\RuleModel;
use Illuminate\Support\Str;
use App\Rules\MatchOldPassword;
use Illuminate\Support\Facades\Hash;
use DB;
use File;
use PhpParser\Node\Stmt\TryCatch;
use function Ramsey\Uuid\v1;
use Illuminate\Http\JsonResponse;
use PhpParser\Node\Stmt\Catch_;

class UserController extends Controller
{
    protected $frontend_url;
    protected $userid;
    protected $email;
    public function __construct(Request $request)
    {
        $this->middleware('auth:api');
    }


    public function checkCurrentUser()
    {
        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        try {
            $user              = User::where('id', $user_id)->first();
            $data['user']      = $user;
            $data['image']     = !empty($user->image) ? url($user->image) : "";
            $data['country']   = Countrys::where('status', 1)->get();
            return response()->json($data, 200);
        } catch (\Exception $e) {
            \Log::error('Error retrieving user: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while retrieving the user'], 500);
        }
    }


    public function me()
    {
        $me = auth('api')->user();
        return response()->json($me);
    }

    public function saveUserBookMark(Request $request)

    {

        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'slug' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            // Check if the slug exists
            $checkSlug = Categorys::where('slug', $request->slug)->first();
            //dd($checkSlug->id);
            if (!$checkSlug) {
                return response()->json(['errors' => 'Invalid category slug.'], 422);
            }

            $check_slug = Bookmark::where('category_id', $checkSlug->id)->first();
            if ($check_slug) {
                return response()->json(['errors' => 'Bookmark already save.'], 422);
            }
            $userData      = Helper::UserData();
            $user_id       = $userData['userId'];
            // Create new user entry
            $data = Bookmark::create([
                'category_id' => $checkSlug->id,
                'user_id'     => $user_id,
            ]);

            return response()->json(['success' => true, 'data' => $data], 200);
        } catch (\Exception $e) {
            // Log the error for debugging (optional)
            Log::error('Error in store method: ' . $e->getMessage());

            return response()->json([
                'error' => 'Something went wrong!',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function saveRole(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $data = User::addEditRole($request->all());
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function getUsersList(Request $request)
    {
        $data = User::getUsersList($request->all());
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }


    public function deleteBookmark(Request $request)
    {

        $bookmarkId = !empty($request->bookmarkId) ? $request->bookmarkId : "";
        if ($bookmarkId) {
            // Find the bookmark by ID and delete it
            $bookmark = Bookmark::find($bookmarkId);

            if ($bookmark) {
                $bookmark->delete();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Bookmark deleted successfully.',
                ], 200);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bookmark not found.',
                ], 404);
            }
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Bookmark ID is required.',
        ], 400);
    }


    public function fetechBookmark(Request $request)
    {
        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];
        try {
            $data = Bookmark::leftjoin('categorys', 'categorys.id', '=', 'bookmark.category_id')
                ->select('bookmark.*', 'categorys.slug', 'categorys.name as bookmarkName')
                ->where('bookmark.user_id', $user_id)->get()->map(function ($user) {
                    return [
                        'id'              => $user->id,
                        'bookmarkName'    => $user->bookmarkName,
                        'slug'            => $user->slug,
                        'created_at'       => date("Y-m-d", strtotime($user->created_at)),
                        // add more fields as needed
                    ];
                });
            $response = [
                'data'  => $data,
                'count' => count($data),
                'message' => 'success'
            ];
        } catch (\Throwable $th) {

            $response = [
                'data'  => [],
                'count' => 0,
                'message' => 'failed'
            ];
        }
        return response()->json($response, 200);
    }


    public function getDepartmentList(Request $request)
    {
        try {
            $rows = User::allDepartment($request->all());
            $response = [
                'data' => $rows,
                'message' => 'success'
            ];
        } catch (\Throwable $th) {
            $response = [
                'data' => [],
                'message' => 'failed'
            ];
        }
        return response()->json($response, 200);
    }
    public function typeofdoucments(Request $request)
    {
        try {
            $rows = User::alltypedocutms($request->all());
            $response = [
                'data' => $rows,
                'message' => 'success'
            ];
        } catch (\Throwable $th) {
            $response = [
                'data' => [],
                'message' => 'failed'
            ];
        }
        return response()->json($response, 200);
    }
    public function getDesignationList(Request $request)
    {
        try {
            $rows = User::allDesignation($request->all());
            $response = [
                'data' => $rows,
                'message' => 'success'
            ];
        } catch (\Throwable $th) {
            $response = [
                'data' => [],
                'message' => 'failed'
            ];
        }
        return response()->json($response, 200);
    }
    public function getEmployeeList(Request $request)
    {
        try {
            $rows = User::allEmployee($request->all());
            $response = [
                'data' => $rows,
                'message' => 'success'
            ];
        } catch (\Throwable $th) {
            $response = [
                'data' => [],
                'message' => 'failed'
            ];
        }
        return response()->json($response, 200);
    }

    public function allrolelist()
    {
        $activeRule = RuleModel::where('status', 1)->whereNot('id', 3)->get();
        return response()->json($activeRule);
    }


    public function referralCode()
    {

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $data = User::where('ref_id', $user_id)->get()->map(function ($user) {
            return [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'inviteCode' => $user->inviteCode,
                'created_at' => date("Y-m-d", strtotime($user->created_at)),
                // add more fields as needed
            ];
        });
        return response()->json([
            'count' => $data->count(),
            'data'  => $data,
        ]);
    }

    public function allrolelistsInfo()
    {
        $activeRule = RuleModel::where('status', 1)->get();
        return response()->json($activeRule);
    }

    public function getRoleList(Request $request)
    {
        //RuleModel::all();

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        // dd($selectedFilter);
        $query = RuleModel::orderBy('rule.id', 'desc');
        if ($searchQuery !== null) {
            $query->where('rule.name', 'like', '%' . $searchQuery . '%');
        }

        if ($selectedFilter !== null) {

            $query->where('rule.status', $selectedFilter);
        }
        // $query->whereNotIn('users.role_id', [2]);
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'            => $item->id,
                'name'          => $item->name,
                'created_at'    => date("Y-M-d H:i:s", strtotime($item->created_at)),
                'updated_at'    => date("Y-M-d H:i:s", strtotime($item->updated_at)),
                'status'        => $item->status == 1 ? 'Active' : 'Inactive',
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

    public function getUserWiseCurrentBalance(Request $request)
    {
        $userid = $request->userid;
        $response       = app('App\Http\Controllers\Dropshipping\DropUserController')->getCurrentBalanceCheckAdminIndivUser($userid);
        $currentBalance = $response instanceof JsonResponse ? $response->getData(true)['current_balance'] : 0;
        return response()->json($currentBalance);
    }

    public function allAgent(Request $request)
    {
        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        // dd($selectedFilter);
        $query = User::orderBy('users.id', 'desc')
            ->join('rule', 'users.role_id', '=', 'rule.id')
            ->select('users.created_at', 'users.updated_at', 'lastlogin_country', 'register_ip', 'lastlogin_ip', 'users.ref_id', 'users.telegram', 'users.whtsapp', 'users.role_id', 'users.id', 'users.name', 'users.email', 'users.phone_number', 'users.show_password', 'users.status', 'rule.name as rulename');
        if ($searchQuery !== null) {
            $query->where('users.name', 'like', '%' . $searchQuery . '%');
        }

        if ($selectedFilter !== null) {
            $query->where('users.status', $selectedFilter);
        }
        $query->where('users.role_id', 4);
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            $status         = $item->status == 1  ? 'Active' : "None";
            $ref_id         = !empty($item->ref_id) ? $item->ref_id : ""; //$item->ref_id == 1  ? 'Active' : "None";
            $chkInviteUser  = User::where('id', $ref_id)->select('name', 'phone_number', 'email')->first();
            $registerIP     = $item->register_ip;
            $ipdat = @json_decode(file_get_contents(
                "http://www.geoplugin.net/json.gp?ip=" . $registerIP
            ));

            return [
                'id'            => $item->id,
                'name'          => substr($item->name, 0, 250),
                'rulename'      => substr($item->rulename, 0, 250),
                'email'         => $item->email,
                'phone_number'  => $item->phone_number,
                'show_password' => $item->show_password,
                'status'        => $status,
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

    public function allAdmin(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        // dd($selectedFilter);
        $query = User::orderBy('users.id', 'desc')
            ->join('rule', 'users.role_id', '=', 'rule.id')
            ->select('users.created_at', 'users.updated_at', 'lastlogin_country', 'register_ip', 'lastlogin_ip', 'users.ref_id', 'users.telegram', 'users.whtsapp', 'users.role_id', 'users.id', 'users.name', 'users.email', 'users.phone_number', 'users.show_password', 'users.status', 'rule.name as rulename');
        if ($searchQuery !== null) {
            $query->where('users.name', 'like', '%' . $searchQuery . '%');
        }

        if ($selectedFilter !== null) {
            $query->where('users.status', $selectedFilter);
        }
        $query->where('users.role_id', 3);
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            $status         = $item->status == 1  ? 'Active' : "None";
            $ref_id         = !empty($item->ref_id) ? $item->ref_id : ""; //$item->ref_id == 1  ? 'Active' : "None";
            $chkInviteUser  = User::where('id', $ref_id)->select('name', 'phone_number', 'email')->first();
            $registerIP     = $item->register_ip;
            $ipdat = @json_decode(file_get_contents(
                "http://www.geoplugin.net/json.gp?ip=" . $registerIP
            ));

            return [
                'id'            => $item->id,
                'name'          => substr($item->name, 0, 250),
                'rulename'      => substr($item->rulename, 0, 250),
                'email'         => $item->email,
                'phone_number'  => $item->phone_number,
                'show_password' => $item->show_password,
                'status'        => $status,
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
    public function allSuperAdmin(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        // dd($selectedFilter);
        $query = User::orderBy('users.id', 'desc')
            ->join('rule', 'users.role_id', '=', 'rule.id')
            ->select('users.created_at', 'users.updated_at', 'lastlogin_country', 'register_ip', 'lastlogin_ip', 'users.ref_id', 'users.telegram', 'users.whtsapp', 'users.role_id', 'users.id', 'users.name', 'users.email', 'users.phone_number', 'users.show_password', 'users.status', 'rule.name as rulename');
        if ($searchQuery !== null) {
            $query->where('users.name', 'like', '%' . $searchQuery . '%');
        }

        if ($selectedFilter !== null) {
            $query->where('users.status', $selectedFilter);
        }
        $query->where('users.role_id', 1);
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            $status         = $item->status == 1  ? 'Active' : "None";
            $ref_id         = !empty($item->ref_id) ? $item->ref_id : ""; //$item->ref_id == 1  ? 'Active' : "None";
            $chkInviteUser  = User::where('id', $ref_id)->select('name', 'phone_number', 'email')->first();
            $registerIP     = $item->register_ip;
            $ipdat = @json_decode(file_get_contents(
                "http://www.geoplugin.net/json.gp?ip=" . $registerIP
            ));

            return [
                'id'            => $item->id,
                'name'          => substr($item->name, 0, 250),
                'rulename'      => substr($item->rulename, 0, 250),
                'email'         => $item->email,
                'phone_number'  => $item->phone_number,
                'show_password' => $item->show_password,
                'status'        => $status,
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

    public function autocompleteUser(Request $request)
    {

        $query = $request->query('query', ''); // Get the 'query' parameter from the request
        // Retrieve users whose names contain the search query, case-insensitive
        $users = User::where('email', 'LIKE', "%{$query}%")->get();

        return response()->json($users); // Return the result as JSON

    }

    public function inactiveUser(Request $request)
    {
        $userId = $request->user_id;
        $data['status'] = 0;
        User::where('id', $userId)->update($data);
        return response()->json("Update successfully");
    }

    public function AllUsersList(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        // dd($selectedFilter);
        $query = User::orderBy('users.id', 'desc')
            ->join('rule', 'users.role_id', '=', 'rule.id')
            ->select('users.created_at', 'users.updated_at', 'lastlogin_country', 'register_ip', 'lastlogin_ip', 'users.ref_id', 'users.telegram', 'users.whtsapp', 'users.role_id', 'users.id', 'users.name', 'users.email', 'users.phone_number', 'users.show_password', 'users.status', 'rule.name as rulename');

        if ($searchQuery !== null) {
            //$query->where('users.email', 'like', '%' . $searchQuery . '%');
            $query->where('users.email', $searchQuery);
        }

        if ($selectedFilter !== null) {

            $query->where('users.status', $selectedFilter);
        }
        $query->where('users.role_id', 2);
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            $telegram       = !empty($item->telegram) ? $item->telegram : "None";
            $phone          = !empty($item->phone_number) ? $item->phone_number : "";
            $whtsapp        = !empty($item->whtsapp) ? $item->whtsapp : "None";
            $status         = $item->status == 1  ? 'Active' : "Inactive";
            $ref_id         = !empty($item->ref_id) ? $item->ref_id : ""; //$item->ref_id == 1  ? 'Active' : "None";
            $chkInviteUser  = User::where('id', $ref_id)->select('name', 'phone_number', 'email')->first();
            $registerIP     = $item->register_ip;
            $ipdat = @json_decode(file_get_contents(
                "http://www.geoplugin.net/json.gp?ip=" . $registerIP
            ));

            return [
                'id'            => $item->id,
                'name'          => substr($item->name, 0, 250),
                'rulename'      => substr($item->rulename, 0, 250),
                'userInfo_1'    => "Name:" . $item->name,
                'userInfo_2'    => "Phone:" . $phone,
                'userInfo_3'    => "Email:" . $item->email,
                'userInfo_4'    => "Telegram:" . $telegram,
                'userInfo_5'    => "WhatsApp:" . $whtsapp,
                'invite_user_1' => !empty("Name:" . $chkInviteUser->name) ? "Name:" . $chkInviteUser->name : "",
                'invite_user_2' => !empty("Cell Phone:" . $chkInviteUser->phone_number) ? "Cell Phone:" . $chkInviteUser->phone_number : "",
                'invite_user_3' => !empty("Email:" . $chkInviteUser->email) ? "Email:" . $chkInviteUser->email : "",
                'email'         => $item->email,
                'register_ip'   => $item->register_ip,
                'lastlogin_ip'  => $item->lastlogin_ip,

                'register_country'   => !empty($ipdat->geoplugin_countryName) ? $ipdat->geoplugin_countryName : "",
                'lastlogin_country'  => !empty($item->lastlogin_country) ?: "",

                'created_at'  => date("Y-M-d H:i:s", strtotime($item->created_at)), //$item->created_at,
                'updated_at'  => date("Y-M-d H:i:s", strtotime($item->updated_at)), //$item->updated_at,

                'phone_number'  => $item->phone_number,
                'show_password' => $item->show_password,
                'status'        => $status,
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



    public function editUserId($id)
    {
        $data = User::checkUserRow($id);

        $response = [
            'data' => $data,
            'dataImg'  => !empty($data->image) ? url($data->image) : "",
            'doc_file' => !empty($data->doc_file) ? url($data->doc_file) : "",
            'message'  => 'success'
        ];
        return response()->json($response, 200);
    }

    public function roleCheck($id)
    {
        $data = User::checkRoleRow($id);
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function departmentCheck($id)
    {
        $data = User::checkDepartmentRow($id);
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function designationCheck($id)
    {
        $data = User::checkDesignationRow($id);
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function checkUserDetails($id)
    {
        $data = User::checkRoleRow($id);
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function getCountry()
    {
        $data = User::countryList();
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function getTime()
    {
        $data = User::getTimes();
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function inactiveEmployee()
    {
        $data = User::inactiveEmployees();
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function saveDepartment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $data = array(
            'name'     => !empty($request->name) ? $request->name : "",
            'entry_by' => $user_id,
            'status'   => $request->status,
        );
        if (empty($request->id)) {
            $id = DB::table('department')->insertGetId($data);
        } else {
            $id = $request->id;
            DB::table('department')->where('id', $request->id)->update($data);
        }
        $response = [
            'message' => 'User register successfully insert UserID:' . $id
        ];
        return response()->json($response);
    }
    public function saveDesignation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $data = array(
            'name' => !empty($request->name) ? $request->name : "",
            'entry_by' => $user_id,
            'status' => $request->status,
        );
        if (empty($request->id)) {
            $id = DB::table('designation')->insertGetId($data);
        } else {
            $id = $request->id;
            DB::table('designation')->where('id', $request->id)->update($data);
        }
        $response = [
            'message' => 'Successfull:' . $id,
        ];
        return response()->json($response);
    }

    public function updateUserProfileImg(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            //'file'    => 'required',
            'file' => 'required|image|mimes:jpeg,png,jpg,gif', // Adjust max file size as needed
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        if (!empty($request->file('file'))) {
            $files = $request->file('file');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['image'] = $file_url;
            DB::table('users')->where('id', $user_id)->update($data);
            $response = [
                'dataImg' => !empty($file_url) ? url($file_url) : "",
                'message' => 'success'
            ];
        } else {
            $response = [
                'dataImg' =>  "",
                'message' => 'failed'
            ];
        }
        return response()->json($response);
    }

    public function updateUser(Request $request)
    {
        //dd($request->all());
        $validator = Validator::make($request->all(), [
            'name'             => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $user = User::find($user_id);
        if ($request->email === $user->email) {
            // $unqie=uniqid();
            //  $email= $request->email.$unqie;
        } else {
            $email = $request->email;
        }
        $data['name']            = $request->name;
        if (!empty($request->phone_number)) {
            $data['phone_number'] = $request->phone_number;
        }
        $data['nationality_id']  = $request->nationality_id;
        //dd($data);
        if (!empty($request->file('file'))) {
            $files = $request->file('file');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['image'] = $file_url;
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        User::where('id', $user_id)->update($data);
        $response = [
            'message' => 'User successfully update:',
        ];
        return response()->json($response);
    }

    public function saveUser(Request $request)
    {
        //dd($request->all());
        $validator = Validator::make($request->all(), [
            'role_id'    => 'required',
            'name'       => 'required',
            'phone'      => 'required',
            'email'      => 'required|email',
            // 'email' => 'required|email|unique:users',
            'password' => 'min:2|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:2'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $data = array(
            'role_id'       => !empty($request->role_id) ? $request->role_id : "",
            'name'          => !empty($request->name) ? $request->name : "",
            'address'       => !empty($request->address) ? $request->address : "",
            'phone_number'  => !empty($request->phone) ? $request->phone : "",
            'email'         => !empty($request->email) ? $request->email : "",
            'password'      => !empty($request->password) ? Hash::make($request->password) : "",
            'show_password' => !empty($request->password) ? $request->password : "",
            'status'        => $request->status,
            'entry_by'      => $user_id,
        );
        if (!empty($request->file('file'))) {
            $files = $request->file('file');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['image'] = $file_url;
        }

        if (empty($request->id)) {
            $userId = DB::table('users')->insertGetId($data);
        } else {
            $userId = $request->id;
            DB::table('users')->where('id', $request->id)->update($data);
        }
        $response = [
            'message' => 'User register successfully insert UserID:' . $userId
        ];
        return response()->json($response);
    }
    public function assignToUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role_id'    => 'required',
            'employee_id' => 'required',
            'name'       => 'required',
            'phone'      => 'required',
            'email'      => 'required|email',
            // 'email' => 'required|email|unique:users',
            'password' => 'min:2|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:2'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $data = array(
            'role_id'       => !empty($request->role_id) ? $request->role_id : "",
            'employee_id'   => !empty($request->employee_id) ? $request->employee_id : "",
            'name'          => !empty($request->name) ? $request->name : "",
            'address'       => !empty($request->address) ? $request->address : "",
            'phone_number'  => !empty($request->phone) ? $request->phone : "",
            'email'         => !empty($request->email) ? $request->email : "",
            'password'      => !empty($request->password) ? Hash::make($request->password) : "",
            'show_password' => $request->password,
            'status'        => $request->status,
            'entry_by'      => $user_id,
        );
        if (!empty($request->file('file'))) {
            $files = $request->file('file');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['image'] = $file_url;
        }

        $userId = DB::table('users')->insertGetId($data);

        // if (empty($request->id)) {
        //     $userId = DB::table('users')->insertGetId($data);
        // } else {
        //     $userId = $request->id;
        //     DB::table('users')->where('id', $request->id)->update($data);
        // }
        $response = [
            'message' => 'Successfully Assign to User. UserID:' . $userId
        ];
        return response()->json($response);
    }

    public function changePasswordClient(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'password' => 'required|min:2|confirmed', // Use 'confirmed' rule for password confirmation
            'password_confirmation' => 'required|min:2',
            'old_password' => 'required|min:2', // Add validation for old password
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::find($request->id);

        // Validate old password before updating
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['errors' => ['old_password' => ['The old password does not match.']]], 422);
        }

        $user->password = Hash::make($request->password);
        $user->show_password = $request->password; // Consider removing this line for security reasons
        $user->save();

        $response = "Password successfully changed!";
        return response()->json($response);
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'password' => 'min:2|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:2'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user = User::find($request->id);
        $user->password = Hash::make($request->password);
        $user->show_password = $request->password;
        $user->save();
        $response = "Password successfully changed!";
        return response()->json($response);
    }

    public function updateUserProPass(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            //'file'    => 'required',
            'doc_file' => 'required|image|mimes:jpeg,png,jpg,gif', // Adjust max file size as needed
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];
        if (!empty($request->file('doc_file'))) {
            $files = $request->file('doc_file');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['doc_file'] = $file_url;
            DB::table('users')->where('id', $user_id)->update($data);
            $response = [
                'doc_file' => !empty($file_url) ? url($file_url) : "",
                'message' => 'success'
            ];
        } else {
            $response = [
                'doc_file' =>  "",
                'message' => 'failed'
            ];
        }
        return response()->json($response);
    }

    public function getInviteCode()
    {
        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];
        $response  = User::where('id', $user_id)->first();
        return response()->json($response);
    }
    
}