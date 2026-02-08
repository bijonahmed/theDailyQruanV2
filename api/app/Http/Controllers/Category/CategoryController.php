<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Helper;
use App\Models\User;
use App\Models\Categorys;
use App\Category;
use App\Models\AttributeValues;
use App\Models\Attribute;
use App\Models\EpdfCategory;
use App\Models\McqInterview;
use App\Models\MiningCategory;
use App\Models\MiningHistory;
use App\Models\Mystore;
use App\Models\PostCategory;
use App\Models\SubAttribute;
use App\Models\ProductAttributes;
use App\Models\ProductAttributeValue;
use App\Models\Product;
use Illuminate\Support\Str;
use App\Rules\MatchOldPassword;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use DB;

class CategoryController extends Controller
{
    protected $userid;
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function index()
    {
        $categories = Categorys::with('children.children.children.children.children')->select('name')->where('parent_id', 0)->get();
        return response()->json($categories);
    }

    //insertePdfCategory

    public function insertePdfCategory(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name'                       => 'required',
            'status'                     => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if a category with the same name already exists
        $existingCategory = EpdfCategory::where('name', $request->input('name'))->first();
        if ($existingCategory) {
            return response()->json(['errors_name' => 'Category with this name already exists'], 422);
        }

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'status'                     => 1,

        );
        $resdata['id']                    = EpdfCategory::insertGetId($data);
        return response()->json($resdata);
    }





    public function inserMiningCategory(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name'                       => 'required',
            'minining_amount_per_secnd'  => 'required',
            'second'                     => 'required|integer|gt:0',
            'minute'                     => 'required|integer|gt:0',
            // 'duration_in_hour'           => 'required|integer|gt:0',
            'duration_in_hour'              => 'required',
            'mining_value_mention_at_hour'  => 'required',
            'status'                        => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if a category with the same name already exists
        $existingCategory = MiningCategory::where('name', $request->input('name'))->first();
        if ($existingCategory) {
            return response()->json(['errors_name' => 'Category with this name already exists'], 422);
        }

        $userData   = Helper::UserData();
        $user_id    = $userData['userId']; // fallback to null if not set

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'minining_amount_per_secnd'  => $request->minining_amount_per_secnd,
            'second'                     => $request->second,
            'minute'                     => $request->minute,
            'duration_in_hour'           => $request->duration_in_hour,
            'offer_description'          => $request->offer_description,

            'daily_mining_amount'          => $request->daily_mining_amount,
            'mining_value_mention_at_hour' => $request->mining_value_mention_at_hour,


            'status'                     => 1,
            'entry_by'                   => $user_id
        );
        $resdata['id']                    = MiningCategory::insertGetId($data);
        return response()->json($resdata);
    }



    public function editEpdfUpdate(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'name'                       => 'required',
            'status'                     => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'status'                     => $request->status,
        );
        $post = EpdfCategory::find($request->id);
        $post->update($data);

        return response()->json($data);
    }

    public function editMiningCategory(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name'                       => 'required',
            'minining_amount_per_secnd'  => 'required',
            'second'                     => 'required|integer|gt:0',
            'minute'                     => 'required|integer|gt:0',
            'duration_in_hour'           => 'required|integer|gt:0',
            'duration_in_hour'              => 'required',
            'mining_value_mention_at_hour'  => 'required',
            'status'                     => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userData   = Helper::UserData();
        $user_id    = $userData['userId']; // fallback to null if not set

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'minining_amount_per_secnd'  => $request->minining_amount_per_secnd,
            'offer_description'          => $request->offer_description,
            'second'                     => $request->second,
            'minute'                     => $request->minute,
            'duration_in_hour'           => $request->duration_in_hour,
            'daily_mining_amount'          => $request->daily_mining_amount,
            'mining_value_mention_at_hour' => $request->mining_value_mention_at_hour,
            'status'                     => 1,
            'entry_by'                   => $user_id
        );
        $post = MiningCategory::find($request->id);
        $post->update($data);

        return response()->json($data);
    }

    public function save(Request $request)
    {
        //dd($request->all());
        $validator = Validator::make(
            $request->all(),
            [
                'name'      => 'required|unique:categorys,name',
                'status'    => 'required',
            ],
            [
                'name'   => 'Category name is required',
                'status' => 'Status is required',
            ]
        );
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $slug     = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                      => $request->name,
            'slug'                      => $slug,
            /// 'percentage_amt'            => !empty($request->percentage_amt) ? $request->percentage_amt : "",
            'description'               => !empty($request->description) ? $request->description : "",
            'meta_title'                => !empty($request->meta_title) ? $request->meta_title : "",
            'meta_description'          => !empty($request->meta_description) ? $request->meta_description : "",
            'meta_keyword'              => !empty($request->meta_keyword) ? $request->meta_keyword : "",
            'parent_id'                 => !empty($request->parent_id) ? $request->parent_id : "",
            'status'                    => !empty($request->status) ? $request->status : "",
            'keyword'                   => !empty($request->keyword) ? $request->keyword : "",
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
            $data['file'] = $file_url;
            //$data['file'] = $file_url;
        }

        if (!empty($request->file('bg_images'))) {
            $files = $request->file('bg_images');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['bg_images'] = $file_url;
            //$data['file'] = $file_url;
        }

        if (!empty($request->file('store_images'))) {
            $files = $request->file('store_images');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['store_images'] = $file_url;
            //$data['file'] = $file_url;
        }
        // dd($data);
        Categorys::create($data);
        $response = [
            'message' => 'Successfully insert',
        ];
        return response()->json($response);
    }

    public function edit(Request $request)
    {
        // dd($request->all());

        $slug     = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        // Save to database

        $data = array(
            'name'                      => $request->name,
           // 'slug'                      => $slug,
            //  'percentage_amt'            => !empty($request->percentage_amt) ? $request->percentage_amt : "",
            'description'               => !empty($request->description) ? $request->description : "",
            'tutorial_content'          => !empty($request->tutorialContent) ? $request->tutorialContent : "",
            'meta_title'                => !empty($request->meta_title) ? $request->meta_title : "",
            'meta_description'          => !empty($request->meta_description) ? $request->meta_description : "",
            'meta_keyword'              => !empty($request->meta_keyword) ? $request->meta_keyword : "",
            'parent_id'                 => !empty($request->parent_id) ? $request->parent_id : "",
            'status'                    => !empty($request->status) ? $request->status : "",
            'keyword'                   => !empty($request->keyword) ? $request->keyword : "",
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
            $data['file'] = $file_url;
            //$data['file'] = $file_url;
        }

        if (!empty($request->file('bg_images'))) {
            $files = $request->file('bg_images');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['bg_images'] = $file_url;
            //$data['file'] = $file_url;
        }

        if (!empty($request->file('store_images'))) {
            $files = $request->file('store_images');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['store_images'] = $file_url;
            //$data['file'] = $file_url;
        }
        // dd($data); //bg_images

        Categorys::where('id', $request->id)->update($data);

        $response = [
            'message' => 'Successfull',
        ];
        return response()->json($response);
    }
    public function allCategory(Request $request)
    {
        try {
            $categories = Categorys::with('children.children.children.children.children')->where('parent_id', 0)->get();
            // dd($categories);
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function allInacCategory(Request $request)
    {
        try {
            $categories = Categorys::where('status', 0)->get();
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getAttribute(Request $request)
    {
        $attribute = Attribute::where('status', 1)->get();
        return response()->json($attribute);
    }

    public function postCategorysearch()
    {
        // $data = PostCategory::where('status', 1)->get(); parent_id
        $data = Categorys::where('parent_id', 0)->where('status', 1)->get();
        return response()->json($data);
    }


    public function epdfCategory()
    {
        $data = ePdfCategory::where('status', 1)->get();
        return response()->json($data);
    }

    public function getAttributeList(Request $request)
    {
        $attribute = Attribute::orderBy('name', 'asc')->get();
        $collection = collect($attribute);
        $modifiedArr = $collection->map(function ($item) {
            return [
                'id'     => $item['id'],
                'name'   => ucfirst($item['name']),
                'status' => $item['status'],
            ];
        });
        //dd($modifiedArr);
        return response()->json($modifiedArr);
    }

    public function getAttributeValList(Request $request)
    {
        $searchTerm = $request->terms;
        $attrWithsubAtt = Attribute::join('attributes_values', 'attributes_values.attributes_id', '=', 'attributes.id')
            ->select('attributes_values.*', 'attributes.name as att_name')
            ->where('attributes_values.name', 'like', '%' . $searchTerm . '%')
            ->orderBy('attributes.name', 'asc')
            ->get();
        $collection = collect($attrWithsubAtt);
        $modifiedArr = $collection->map(function ($item) {
            return [
                'id'         => $item['id'],
                'att_name'   => ucfirst($item['att_name']),
                'name'       => ucfirst($item['name']),
                'status'     => $item['status'],
            ];
        });
        return response()->json($modifiedArr, 200);
    }
    public function getCategoryListParent(Request $request)
    {
        $categories = Categorys::where('status', 1)->get();
        return response()->json($categories);
    }

    public function getCategoryList(Request $request)
    {
        $categories = Categorys::where('status', 1)->get();
        return response()->json($categories);
    }

    public function getCategoryUnderSubCat(Request $request)
    {
        //  dd($request->all());
        $sub_cat_rows = Categorys::where('parent_id', $request->categoryId)->where('status', 1)->get();
        $cat_row      = Categorys::where('id', $request->categoryId)->where('status', 1)->first();
        $data['category']    = $cat_row;
        $data['subcategory'] = $sub_cat_rows;

        return response()->json($data);
    }

    public function findCategoryRow($id)
    {
        $data = Categorys::find($id);
        $response = [
            'data'          => $data,
            'file'          => url($data->file),
            'bg_images'     => url($data->bg_images),
            'store_images'  => url($data->store_images),
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function attributeRow($id)
    {
        $data = Attribute::find($id);
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function attributeValRow($id)
    {
        ///122555
        $data = AttributeValues::find($id);
        $response = [
            'data' => $data,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function attributeValRows($product_id, $request_product_attribute_id)
    {

        //when click save attrbu and value
        //$request_product_attribute_id = $request->product_attribute_id;
        //$product_id = $request->product_id;
        //dd($request->all());
        $dataArr = AttributeValues::where('attributes_id', $request_product_attribute_id)->select('id', 'attributes_id', 'name')->get();
        $chkPost = ProductAttributes::where('product_id', $product_id)->where('attributes_id', $request_product_attribute_id)->first();
        if (empty($chkPost)) {
            $data = array(
                'product_id'                 => $product_id,
                'attributes_id'              => $request_product_attribute_id,
            );
            $product_attribute_id = ProductAttributes::insertGetId($data);
        } else {
            $product_attribute_id = $chkPost->id;
        }

        // dd($dataArr);
        $ar = [];
        foreach ($dataArr as $v) {
            $pro_id               = (int)$product_id;
            $attributes_id        = (int)$v->attributes_id;
            $product_attribute_id = empty($chkPost) ? $product_attribute_id : $chkPost->id; //(int)$product_attribute_id;
            $product_att_value_id = (int)$v->id;
            ProductAttributeValue::where('product_id', $pro_id)->where('attribute_id', $attributes_id)->where('product_attribute_id', $product_attribute_id)->where('product_att_value_id', $product_att_value_id)->delete();
            $ar = array(
                'product_id'         => $pro_id,
                'attribute_id'         => $attributes_id,
                'product_attribute_id' => $product_attribute_id,
                'product_att_value_id' => $product_att_value_id,
            );
            ProductAttributeValue::insert($ar);
        }

        $response = [
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }
    public function getSubCategoryChild($id)
    {
        $data = Categorys::where('parent_id', $id)->get();
        $collection = collect($data);
        $modifiedCollection = $collection->map(function ($item) {
            return [
                'value' => $item['id'],
                'label' => $item['name'],
            ];
        });
        return response()->json($modifiedCollection, 200);
    }
    public function getInSubCategoryChild($data)
    {
        $selectedValues = trim($data);
        $queries = DB::select("SELECT id,name,parent_id FROM `categorys` WHERE `parent_id` IN ($selectedValues)");
        $result = [];
        foreach ($queries as $key => $v) {
            $result[] = [
                'value' => $v->id,
                'label' => $v->name
            ];
        }
        return response()->json($result);
    }
    public function searchCategory(Request $request)
    {
        $term = $request->input('term');
        $results = Categorys::where('name', 'like', '%' . $term . '%')
            ->where('status', 1)
            // ->orWhere('category', 'like', '%' . $term . '%')

            ->get();
        $formattedResults = [];
        foreach ($results as $result) {
            $path = [];
            $category = $result;
            while ($category) {
                array_unshift($path, $category->name);
                $category = $category->parent;
            }
            $formattedResults[] = [
                'name' => $result->name,
                'id' => $result->id,
                'percentage_amt' => $result->percentage_amt,
                'category' => implode(' > ', $path)
            ];
        }
        return response()->json($formattedResults);
    }


    public function ePdfCategoryes(Request $request)
    {

        $page     = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 50);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $status         = $request->selectedFilter;
        // dd($selectedFilter);
        $query = EpdfCategory::orderBy('id', 'asc')
            ->select('epdf_category.*');

        if ($searchQuery !== null) {
            $query->where('epdf_category.name', 'like', '%' . $searchQuery . '%');
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
                'id'                        => $item->id,
                'name'                      => $item->name,
                'slug'                      => $item->slug,
                'status'                    => $item->status,
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

    public function getCategoryRow(Request $request)
    {

        $slug        = $request->slug;
        $chkPointCat = Categorys::where('slug', $slug)->first();
        $chkQuestion = McqInterview::where('category_id', $chkPointCat->id)->count();

        return response()->json([
            'data'          => $chkPointCat,
            'countQuestion' => $chkQuestion,
        ], 200);
    }


    public function allMiningCategoryes(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        // dd($selectedFilter);
        $query = EpdfCategory::orderBy('id', 'desc')
            ->select('epdf_category.*');

        if ($searchQuery !== null) {
            $query->where('epdf_category.name', 'like', '%' . $searchQuery . '%');
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            return [
                'id'                        => $item->id,
                'name'                      => $item->name,
                'duration_in_hour'          => $item->duration_in_hour,
                'minute'                    => $item->minute,
                'second'                    => $item->second,
                'minining_amount_per_secnd' => $item->minining_amount_per_secnd,
                'status'                    => $item->status,
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

    public function minningCategoryrow($id)
    {
        $responseData['data']  = MiningCategory::where('id', $id)->first();
        return response()->json($responseData);
    }
    public function ePdfCategoryChkRow($id)
    {
        $responseData['data']  = EpdfCategory::where('id', $id)->first();
        return response()->json($responseData);
    }
}
