<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\AttributeValues;
use App\Models\Category;
use App\Models\Categorys;
use App\Models\EPdf;
use App\Models\EpdfCategory;
use App\Models\Holiday;
use App\Models\Post;
use App\Models\Product;
use App\Models\ProductAdditionalImg;
use App\Models\ProductAttributes;
use App\Models\ProductAttributeValue;
use App\Models\ProductCategory;
use App\Models\ProductVarrient;
use App\Models\ProductVarrientHistory;
use App\Models\Service;
use App\Models\ServiceImages;
use App\Models\TorrentFiles;
use App\Models\User;
use App\Rules\MatchOldPassword;
use Auth;
use DB;
use Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Session;
use Validator;

class PostController extends Controller
{
    protected $userid;
    public function __construct()
    {
        $this->middleware('auth:api');
    }



    public function addTorrent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'       => 'required',
            'site_name'  => 'required',
            'files'      => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'site_name'                  => $request->site_name,
            'slug'                       => $slug,
            'description'                => !empty($request->description_full) ? $request->description_full : "",
            'meta_title'                 => !empty($request->meta_title) ? $request->meta_title : "",
            'meta_description'           => !empty($request->meta_description) ? $request->meta_description : "",
            'meta_keyword'               => !empty($request->meta_keyword) ? $request->meta_keyword : "",
            'download_link'              => !empty($request->download_link) ? $request->download_link : "",
            'status'                     => !empty($request->status) ? $request->status : "",
            'entry_by'                   => $user_id
        );
        // dd($data);
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $slug . '.' . $ext;
            $uploadPath = '/backend/torrent/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path($uploadPath), $path);
            $data['torrent_file'] = $upload_url;
        }
        /*
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/torrent/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/torrent/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['torrent_file'] = $file_url;
        }
        */
        //$data['id'] = $request->id;
        ///dd($data);
        //Post::create($data);

        if (empty($request->id)) {
            TorrentFiles::create($data);
        } else {
            $post = TorrentFiles::find($request->id);
            $post->update($data);
            $resdata['torrentId'] = $post->id;
        }

        return response()->json("Successfully update");
    }


    public function TorrentUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'           => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'description'                => !empty($request->description_full) ? $request->description_full : "",
            'download_link'              => !empty($request->download_link) ? $request->download_link : "",
            'status'                     => !empty($request->status) ? $request->status : "",
            'entry_by'                   => $user_id
        );
        // dd($data);
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $slug . '.' . $ext;
            $uploadPath = '/backend/torrent/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path($uploadPath), $path);
            $data['torrent_file'] = $upload_url;
        }
        // if (!empty($request->file('files'))) {
        //     $files = $request->file('files');
        //     $fileName = Str::random(20);
        //     $ext = strtolower($files->getClientOriginalExtension());
        //     $path = $fileName . '.' . $ext;
        //     $uploadPath = '/backend/files/';
        //     $upload_url = $uploadPath . $path;
        //     $files->move(public_path('/backend/files/'), $upload_url);
        //     $file_url = $uploadPath . $path;
        //     $data['thumnail_img'] = $file_url;
        // }

        $data['id'] = $request->id;

        ///dd($data);
        //Post::create($data);
        $post = TorrentFiles::find($request->id);
        $post->update($data);
        $resdata['torrentId'] = $post->id;
        return response()->json($resdata);
    }




    public function updateService(Request $request)
    {
        //dd($request->all());
        $validator = Validator::make($request->all(), [
            'name'           => 'required',
            'categoryId'     => 'required',
            'price'          => 'required',
          //  'pdf_file'       => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'description_short'          => !empty($request->description_short) ? $request->description_short : "",
            'description_full'           => !empty($request->description_full) ? $request->description_full : "",
            'meta_title'                 => !empty($request->meta_title) ? $request->meta_title : "",
            'meta_description'           => !empty($request->meta_description) ? $request->meta_description : "",
            'meta_keyword'               => !empty($request->meta_keyword) ? $request->meta_keyword : "",
            'categoryId'                 => !empty($request->categoryId) ? $request->categoryId : "",
            'price'                       => !empty($request->price) ? $request->price : "",
            'status'                     => !empty($request->status) ? $request->status : "",
            'entry_by'                   => $user_id
        );
        // dd($data);
        // dd($data);
        if (!empty($request->file('pdf_file'))) {
            $files = $request->file('pdf_file');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/service/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/service/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['pdf_file'] = $file_url;
        }

        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/service/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/service/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['thumnail_img'] = $file_url;
        }

        $data['id'] = $request->id;
        //insert multiple images
        if (!empty($request->file('images'))) {
            foreach ($request->file('images') as $file) {
                $name = $file->getClientOriginalName();
                $dic_name = uniqid() . $name;
                $uploadPath = '/backend/ebook_covers/';
                $file->move(public_path() . '/backend/ebook_covers/', $dic_name);
                // $docs[] = $name;  
                $img_data['images']       = $uploadPath . $dic_name;
                $img_data['service_id']   = $request->id;
                $img_data['categoryId']   = !empty($request->categoryId) ? $request->categoryId : "";
                DB::table('service_img_history')->insert($img_data);
            }
        }
        ///dd($data);
        //Post::create($data);
        $post = Service::find($request->id);
        $post->update($data);
        $resdata['id'] = $post->id;
        return response()->json($resdata);
    }




    public function update(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'name'           => 'required',
            'categoryId'     => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'description_short'          => !empty($request->description_short) ? $request->description_short : "",
            'description_full'           => !empty($request->description_full) ? $request->description_full : "",
            'meta_title'                 => !empty($request->meta_title) ? $request->meta_title : "",
            'meta_description'           => !empty($request->meta_description) ? $request->meta_description : "",
            'meta_keyword'               => !empty($request->meta_keyword) ? $request->meta_keyword : "",
            'categoryId'                 => !empty($request->categoryId) ? $request->categoryId : "",
            'status'                     => !empty($request->status) ? $request->status : "",
            'entry_by'                   => $user_id
        );
        // dd($data);
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['thumnail_img'] = $file_url;
        }

        $data['id'] = $request->id;

        ///dd($data);
        //Post::create($data);
        $post = Post::find($request->id);
        $post->update($data);
        $resdata['product_id'] = $post->id;
        return response()->json($resdata);
    }



    public function updateePdf(Request $request)
    {

        //dd($request->all());

        $validator = Validator::make($request->all(), [
            'name'           => 'required',
            'categoryId'     => 'required',
            //  'download_link'  => 'nullable|url', // Ensure it's a valid URL if provided
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];


        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'description_full'           => !empty($request->description_full) ? $request->description_full : "",
            'download_link'              => !empty($request->download_link) ? $request->download_link : "",
            'categoryId'                 => !empty($request->categoryId) ? $request->categoryId : "",
            'status'                     => !empty($request->status) ? $request->status : "",
            'entry_by'                   => $user_id
        );
        //    dd($data);
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['thumnail_img'] = $file_url;
        }

        $post = EPdf::find($request->id);
        $post->update($data);
        //Post::create($data);
        $resdata['id'] = $request->id;
        return response()->json($resdata);
    }


    public function savePdf(Request $request)
    {
        // dd($request->all());

        $validator = Validator::make($request->all(), [
            'name'           => 'required',
            'categoryId'     => 'required',
            //'download_link'  => 'nullable|url', // Ensure it's a valid URL if provided
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $categoryId = (int)$request->categoryId;

        $existingRecord = EPdf::where('slug', $slug)->first();
        if (!empty($existingRecord)) {
            return response()->json(['message' => 'A record with this slug already exists.'], 200);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];


        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'description_full'           => !empty($request->description_full) ? $request->description_full : "",
            'download_link'              => !empty($request->download_link) ? $request->download_link : "",
            'categoryId'                 => !empty($request->categoryId) ? $request->categoryId : "",
            'status'                     => 1, //!empty($request->status) ? $request->status : "",
            'entry_by'                   => $user_id
        );

        $existingThumbnail = EPdf::where('name', $request->name)
            ->first();


        //    dd($data);
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['thumnail_img'] = $file_url;
        }
        //Post::create($data);
        $resdata['id'] = EPdf::insertGetId($data);
        return response()->json($resdata);
    }


    public function saveService(Request $request)
    {
        //dd($request->all());
        $validator = Validator::make($request->all(), [
            'name'           => 'required',
            'categoryId'     => 'required',
            'price'          => 'required',
            'pdf_file'       => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'description_short'          => !empty($request->description_short) ? $request->description_short : "",
            'description_full'           => !empty($request->description_full) ? $request->description_full : "",
            'meta_title'                 => !empty($request->meta_title) ? $request->meta_title : "",
            'meta_description'           => !empty($request->meta_description) ? $request->meta_description : "",
            'meta_keyword'               => !empty($request->meta_keyword) ? $request->meta_keyword : "",
            'price'                      => !empty($request->price) ? $request->price : "",
            'categoryId'                 => !empty($request->categoryId) ? $request->categoryId : "",
            'status'                     => 1, //!empty($request->status) ? $request->status : "",
            'entry_by'                   => $user_id
        );
        // dd($data);
        if (!empty($request->file('pdf_file'))) {
            $files = $request->file('pdf_file');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/service/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/service/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['pdf_file'] = $file_url;
        }


        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/service/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/service/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['thumnail_img'] = $file_url;
        }

        //Post::create($data);
        $resdata['id'] = Service::insertGetId($data);

        //insert multiple images
        if (!empty($request->file('images'))) {
            foreach ($request->file('images') as $file) {
                $name = $file->getClientOriginalName();
                $dic_name = uniqid() . $name;
                $uploadPath = '/backend/ebook_covers/';
                $file->move(public_path() . '/backend/ebook_covers/', $dic_name);
                // $docs[] = $name;  
                $img_data['images']       = $uploadPath . $dic_name;
                $img_data['service_id']   = $resdata['id'];
                $img_data['categoryId']   = !empty($request->categoryId) ? $request->categoryId : "";
                DB::table('service_img_history')->insert($img_data);
            }
        }
        return response()->json($resdata);
    }





    public function save(Request $request)
    {
        //dd($request->all());
        $validator = Validator::make($request->all(), [
            'name'           => 'required',
            'categoryId'     => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData      = Helper::UserData();
        $user_id       = $userData['userId'];


        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'description_short'          => !empty($request->description_short) ? $request->description_short : "",
            'description_full'           => !empty($request->description_full) ? $request->description_full : "",

            'meta_title'                 => !empty($request->meta_title) ? $request->meta_title : "",
            'meta_description'           => !empty($request->meta_description) ? $request->meta_description : "",
            'meta_keyword'               => !empty($request->meta_keyword) ? $request->meta_keyword : "",

            'categoryId'                 => !empty($request->categoryId) ? $request->categoryId : "",
            'status'                     => 1, //!empty($request->status) ? $request->status : "",
            'entry_by'                   => $user_id
        );
        // dd($data);
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['thumnail_img'] = $file_url;
        }
        //Post::create($data);
        $resdata['product_id'] = Post::insertGetId($data);
        return response()->json($resdata);
    }







    public function allTorrentFiles(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $status         = $request->selectedFilter;
        // dd($selectedFilter);
        $query = TorrentFiles::orderBy('id', 'desc')
            ->select('torrent_files.*');

        if ($searchQuery !== null) {
            $query->where('torrent_files.name', 'like', '%' . $searchQuery . '%');
        }


        if ($status !== null) {
            // If the status is '1', we consider it 'active'; if '0', it is 'inactive'
            if ($status == 1) {
                $query->where('status', 1); // Active
            } elseif ($status == 0) {
                $query->where('status', 0); // Inactive
            }
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'            => $item->id,
                'name'          => substr($item->name, 0, 250),
                'download_link' => !empty($item->torrent_file) ? url($item->torrent_file) : "",
                'status'        => $item->status,
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



    public function ePdfallPost(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);
        $status    = $request->selectedFilter;
        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        // dd($selectedFilter);
        $query = EPdf::orderBy('id', 'desc')
            ->select('epdf.*');

        if ($searchQuery !== null) {
            $query->where('epdf.name', 'like', '%' . $searchQuery . '%');
        }


        if ($status !== null) {
            // If the status is '1', we consider it 'active'; if '0', it is 'inactive'
            if ($status == 1) {
                $query->where('status', 1); // Active
            } elseif ($status == 0) {
                $query->where('status', 0); // Inactive
            }
        }


        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            $chkCategory = EpdfCategory::where('id', $item->categoryId)->first();

            $string = "{$item->name}";
            // Remove underscores, dashes, and slashes
            $cleanString = str_replace(['_', '-', '/'], ' ', $string);
            // Capitalize the first letter of each word
            $capitalizedString = ucwords(strtolower($cleanString));

            return [
                'id'            => $item->id,
                'name'          => $capitalizedString,
                'download_link' => $item->download_link,
                'categoryName'  => $chkCategory->name ?? "",
                'status'        => $item->status,
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

    public function allServices(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        // dd($selectedFilter);
        $status         = $request->selectedFilter;


        $query = Service::select('service.*', 'categorys.name as category_name')
            ->join('categorys', 'service.categoryId', '=', 'categorys.id');

        if ($searchQuery !== null) {
            $query->where('service.name', 'like', '%' . $searchQuery . '%');
        }


        if ($status !== null) {
            // If the status is '1', we consider it 'active'; if '0', it is 'inactive'
            if ($status == 1) {
                $query->where('service.status', 1); // Active
            } elseif ($status == 0) {
                $query->where('service.status', 0); // Inactive
            }
        }


        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'            => $item->id,
                'category_name' => $item->category_name,
                'price'         => $item->price,
                'pdf_file'      => !empty($item->pdf_file) ? url($item->pdf_file) : "",
                'name'          => substr($item->name, 0, 250),
                'status'        => $item->status,
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

    public function allPostList(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        // dd($selectedFilter);
        $status         = $request->selectedFilter;


        $query = Post::select('posts.*', 'categorys.name as category_name')
            ->join('categorys', 'posts.categoryId', '=', 'categorys.id');

        if ($searchQuery !== null) {
            $query->where('posts.name', 'like', '%' . $searchQuery . '%');
        }


        if ($status !== null) {
            // If the status is '1', we consider it 'active'; if '0', it is 'inactive'
            if ($status == 1) {
                $query->where('posts.status', 1); // Active
            } elseif ($status == 0) {
                $query->where('posts.status', 0); // Inactive
            }
        }


        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'            => $item->id,
                'category_name' => $item->category_name,
                'name'          => substr($item->name, 0, 250),
                'status'        => $item->status,
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

    public function serviceImgDelete(Request $request)
    {
        $id = $request->id;
        ServiceImages::where('id', $id)->delete();
        return response()->json("Delete Images");
    }

    public function postrow($id)
    {
        $data = Post::where('posts.id', $id)
            ->select('posts.*', 'categorys.name as category_name')
            ->join('categorys', 'posts.categoryId', '=', 'categorys.id')
            ->first();
        $responseData['data']      = $data;
        $responseData['images']    = !empty($data->thumnail_img) ? url($data->thumnail_img) : "";
        // dd($responseData);
        return response()->json($responseData);
    }


    public function servicerow($id)
    {
        $data = Service::where('service.id', $id)
            ->select('service.*', 'categorys.name as category_name')
            ->join('categorys', 'service.categoryId', '=', 'categorys.id')
            ->first();

        $serviceImage = ServiceImages::where('service_img_history.service_id', $data->id)->get();


        $formatedImg = [];

        foreach ($serviceImage as $val) {
            $formatedImg[] = [
                'id'             => $val->id,
                'image'          => !empty($val->images) ? url($val->images) : "",
            ];
        }
        // dd($formatedImg);

        $responseData['data']         = $data;
        $responseData['images']       = !empty($data->thumnail_img) ? url($data->thumnail_img) : "";
        $responseData['pdf_file']     = !empty($data->pdf_file) ? url($data->pdf_file) : "";
        $responseData['mul_image']    = $formatedImg;

        // dd($responseData);
        return response()->json($responseData);
    }
    public function postTorrentRow($id)
    {
        $data = TorrentFiles::where('id', $id)->first();
        $responseData['data']      = $data;
        $responseData['images']    = !empty($data->thumnail_img) ? url($data->thumnail_img) : "";
        // dd($responseData);
        return response()->json($responseData);
    }


    public function epdfRow($id)
    {
        $data = EPdf::where('id', $id)->first();
        $responseData['data']      = $data;
        $responseData['images']    = !empty($data->thumnail_img) ? url($data->thumnail_img) : "";
        // dd($responseData);
        return response()->json($responseData);
    }




    public function postCategoryData(Request $request)
    {

        $id =  $request->id;
        $data = Post::where('posts.categoryId', $id)
            ->select('posts.*', 'post_category.name as category_name')
            ->join('post_category', 'posts.categoryId', '=', 'post_category.id')
            ->get();

        $arryData = [];
        foreach ($data as $v) {
            $arryData[] = [
                'id'                         => $v->id,
                'name'                       => $v->name,
                'question'                   => $v->question,
                'answer'                     => $v->answer,
                'description_full'           => strip_tags($v->description_full),
                'images'                     => url($v->thumnail_img),
            ];
        }
        $responseData['data']  = $arryData;
        return response()->json($responseData);
    }
}
