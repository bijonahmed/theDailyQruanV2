<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Helper;
use App\Models\User;
use App\Models\Setting;
use App\Models\Profile;
use App\Models\Sliders;
use Illuminate\Support\Str;
use App\Rules\MatchOldPassword;
use Illuminate\Support\Facades\Hash;
use DB;

class SettingController extends Controller
{
    protected $userid;
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function insertEmployeeType(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'      => 'required',
            'status'    => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];
        $data = array(
            'name'          => !empty($request->name) ? $request->name : "",
            'status'        => !empty($request->status) ? $request->status : "",
            'entry_by'      => $user_id,
        );
        // dd($data);
        if (empty($request->id)) {
            DB::table('employee_type')->insertGetId($data);
        } else {
            DB::table('employee_type')->where('id', $request->id)->update($data);
        }
        $response = [
            'message' => 'Successfull',
        ];
        return response()->json($response);
    }

    public function sliderrow($id)
    {
        $id = (int) $id;
        $data = Sliders::find($id);
        $response = [
            'id'           => $data->id,
            'redirect_url' => $data->redirect_url,
            'status'       => $data->status,
            'images'       => !empty($data->images) ? url($data->images) : "",
        ];

        //dd($response);
        return response()->json($response, 200);
    }

    public function insertSlider(Request $request)
    {
        if (empty($request->id)) {
            $validator = Validator::make($request->all(), [
                'files'         => 'required',
                'redirect_url'  => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
        } else {
            $validator = Validator::make($request->all(), [
                //  'files'         => 'required',
                'redirect_url'  => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
        }

        $data = array(
            'redirect_url'               => $request->redirect_url,
            'status'                     => !empty($request->status) ? $request->status : "",
        );

        // dd($data);
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/slider_imaes/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/slider_imaes/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['images'] = $file_url;
        }

        if (empty($request->id)) {
            Sliders::insert($data);
        } else {
            DB::table('sliders')->where('id', $request->id)->update($data);
        }
        $response = [
            'message' => 'Successfull',
        ];
        return response()->json($response);
    }

    public function slidersImages(Request $request)
    {

        //dd($request->all());
        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        // dd($selectedFilter);
        $query = Sliders::orderBy('id', 'desc');

        if ($searchQuery !== null) {
            $query->where('redirect_url', 'like', '%' . $searchQuery . '%');
        }

        if ($selectedFilter !== null) {

            $query->where('status', $selectedFilter);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'                 => $item->id,
                'redirect_url'       => $item->redirect_url,
                'images'             => !empty($item->images) ? url($item->images) : "",
                'status'             => $item->status,
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


    public function getEmployeeTypeList(Request $request)
    {
        try {
            $rows = Setting::filterEmpList($request->all());
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

    public function checkrowEmpleeType($id)
    {
        $id = (int) $id;
        $data = Setting::editEmpTypeId($id);
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }



    public function settingrow()
    {

        $data = Setting::find(1);


        $data['qa_pages_meta_description'] = $data['q&a_pages_meta_description'];
        $data['qa_pages_meta_keywords']    = $data['q&a_pages_meta_keywords'];
        $response = [

            'data' => $data,
            'message' => 'success'
        ];



        return response()->json($response, 200);
    }


    public function upateSetting(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required',
            'email'       => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $data = array(
            'name'              => !empty($request->name) ? $request->name : "",
            'email'             => !empty($request->email) ? $request->email : "",
            'address'           => !empty($request->address) ? $request->address : "",
            'whatsApp'          => !empty($request->whatsApp) ? $request->whatsApp : "",
            'description'       => !empty($request->description) ? $request->description : "",
            'copyright'         => !empty($request->copyright) ? $request->copyright : "",
            'currency'          => !empty($request->currency) ? $request->currency : "",
            'fblink'            => !empty($request->fblink) ? $request->fblink : "",
            'website'           => !empty($request->website) ? $request->website : "",
            'telegram'          => !empty($request->telegram) ? $request->telegram : "",

            'level_1_bonus'          => !empty($request->level_1_bonus) ? $request->level_1_bonus : "",
            'level_2_bonus'          => !empty($request->level_2_bonus) ? $request->level_2_bonus : "",
            'level_3_bonus'          => !empty($request->level_3_bonus) ? $request->level_3_bonus : "",

            'deposit_service_charge'      => !empty($request->deposit_service_charge) ? $request->deposit_service_charge : "",
            'withdraw_service_charge'     => !empty($request->withdraw_service_charge) ? $request->withdraw_service_charge : "",
            'crypto_wallet_address'       => !empty($request->crypto_wallet_address) ? $request->crypto_wallet_address : "",
            'store_policy'                => !empty($request->store_policy) ? $request->store_policy : "",
            'register_bonus'              => !empty($request->register_bonus) ? $request->register_bonus : 0,
            'maximum_supply'              => !empty($request->maximum_supply) ? $request->maximum_supply : 0,
            'total_supply'                => !empty($request->total_supply) ? $request->total_supply : 0,

            'index_pages_meta_description'         => !empty($request->index_pages_meta_description) ? $request->index_pages_meta_description : "",
            'index_pages_meta_keywords'            => !empty($request->index_pages_meta_keywords) ? $request->index_pages_meta_keywords : "",
            'home_pages_meta_description'          => !empty($request->home_pages_meta_description) ? $request->home_pages_meta_description : "",
            'home_pages_meta_keywords'             => !empty($request->home_pages_meta_keywords) ? $request->home_pages_meta_keywords : "",
            'q&a_pages_meta_description'           => !empty($request->qa_pages_meta_description) ? $request->qa_pages_meta_description : "",
            'q&a_pages_meta_keywords'              => !empty($request->qa_pages_meta_keywords) ? $request->qa_pages_meta_keywords : "",
            'torrent_pages_meta_description'       => !empty($request->torrent_pages_meta_description) ? $request->torrent_pages_meta_description : "",
            'torrent_pages_meta_keywords'          => !empty($request->torrent_pages_meta_keywords) ? $request->torrent_pages_meta_keywords : "",

        );

        //dd($data);
        DB::table('setting')->where('id', 1)->update($data);

        $response = [
            'message' => 'Successfull',
        ];
        return response()->json($response);
    }
}
