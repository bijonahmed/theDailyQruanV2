<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Helper;
use App\Models\Product;
use App\Models\Sliders;
use App\Models\ProductCategory;
use App\Models\Categorys;
use App\Models\EPdf;
use App\Models\EpdfCategory;
use App\Models\ExamAnswer;
use App\Models\InveterviewQandA;
use App\Models\McqInterview;
use App\Models\Post;
use App\Models\VerifyEmail;
use App\Models\Setting;
use App\Models\ProductAdditionalImg;
use App\Models\SEOModel;
use App\Models\Service;
use App\Models\TorrentFiles;
use App\Models\TorrentsTutorial;
use App\Models\User;
use Illuminate\Support\Str;
use App\Rules\MatchOldPassword;
use Illuminate\Support\Facades\Hash;
use DB;
use File;
use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Imagick;
use PhpParser\Node\Stmt\TryCatch;
use function Ramsey\Uuid\v1;

class UnauthenticatedController extends Controller
{
    protected $frontend_url;
    protected $userid;



    public function getSuraList()
    {
        $url = "https://api.alquran.cloud/v1/surah";
        $data = json_decode(file_get_contents($url), true);

        return response()->json($data);
    }


    public function filterepdfrow(Request $request)
    {

        //dd($request->all()); 
        $slug = $request->slug ?? "";
        $rows = EPdf::where('slug', $slug)->first();

        $chkCategory = EpdfCategory::where('id', $rows->categoryId)->first();
        $string = "{$rows->name}";
        // Remove underscores, dashes, and slashes
        $cleanString = str_replace(['_', '-', '/'], ' ', $string);
        // Capitalize the first letter of each word
        $capitalizedString = ucwords(strtolower($cleanString));

        $data['id']      = $rows->id;
        $data['name']    = $capitalizedString;
        $data['slug']    = $rows->slug;
        $data['catName'] = $chkCategory->name ?? "";
        $data['catSlug'] = $chkCategory->slug ?? "";
        $data['categoryId'] = $rows->categoryId ?? "";
        $data['download_link'] = $rows->download_link ?? "";


        $data['showPdf'] = !empty($rows->thumnail_img) ? url($rows->thumnail_img) : "";
        return response()->json($data);
    }



    public function gettorrentrow(Request $request)
    {
        //dd($request->all()); 
        $slug = $request->slug ?? "";
        $rows = TorrentFiles::where('slug', $slug)->first();
        $data = [
            'id'            => $rows->id,
            'name'          => $rows->name,
            'slug'          => $rows->slug,
            'site_name'     => $rows->site_name,
            'description'   => $rows->description,
            'meta_title'    => $rows->meta_title,
            'meta_description' => $rows->meta_description,
            'meta_keyword'     => $rows->meta_keyword,
            'download_link'    => !empty($rows->torrent_file) ? url($rows->torrent_file) : ""
        ];
        return response()->json($data);
    }

    public function filterepdfCategory(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 100);

        // Get search query from the request
        $searchQuery = $request->input('searchQuery');

        // Initialize the base query for EPdf
        $query = EPdf::where('status', 1);

        // If a search query exists, filter by name
        if (!empty($searchQuery)) {
            $query->where('name', 'like', '%' . $searchQuery . '%');
        }

        // Handle category slug if provided
        $slug = $request->input('slug', '');
        $category = EpdfCategory::where('slug', $slug)->where('status', 1)->first();

        if (!empty($category)) {
            // Filter PDFs by category
            $query->where('categoryId', $category->id);
        }

        // Apply pagination to the query
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        // Format the rows
        $formattedRows = $paginator->getCollection()->map(function ($pdf) {
            $cleanString = str_replace(['_', '-', '/'], ' ', $pdf->name);
            $capitalizedString = ucwords(strtolower($cleanString));

            return [
                'id'        => $pdf->id,
                'name'      => $capitalizedString,
                'shortName' => substr($capitalizedString, 0, 200),
                'show_pdf'  => !empty($pdf->thumnail_img) ? url($pdf->thumnail_img) : "",
                'slug'      => $pdf->slug,
                'status'    => $pdf->status,
            ];
        });

        // Prepare response data
        $data = [
            'data' => $formattedRows,
            'pagination' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
            'categoryName' => $category->name ?? "",
        ];

        return response()->json($data, 200);
    }


    public function getTorrentTutorial(Request $request)
    {
        //============================================= Pagination ========================================
        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 30);
        // Get search query from the request
        $searchQuery = $request->searchQuery;

        // Start building the query
        $query = TorrentFiles::where('status', 1)->orderBy(DB::raw('LOWER(name)'), 'asc');  // Case-insensitive sorting

        if ($searchQuery !== null) {
            $query->where('name', 'like', '%' . $searchQuery . '%');
        }

        // Apply pagination to the query
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        // Modify the collection
        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'            => $item->id,
                'name'          => $item->name,
                'slug'          => $item->slug,
                'site_name'     => $item->site_name,
                'download_link' => !empty($item->torrent_file) ? url($item->torrent_file) : "",
                'description'   => strip_tags($item->description),
                'thumnail_img'  => !empty($item->thumnail_img) ? url($item->thumnail_img) : "", //$item->thumnail_img,

            ];
        });

        $data = [
            'data'          => $modifiedCollection,
            'pagination' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
        ];
        return response()->json($data, 200);
    }

    public function getepdfCategoryList()
    {
        // Retrieve categories with their respective PDF counts
        $data = EpdfCategory::where('status', 1)
            ->withCount(['epdfs' => function ($query) {
                $query->where('status', 1); // Only count active PDFs
            }])
            ->get();

        // Format the response to include id, name, status, and count
        $formattedData = $data->map(function ($category) {
            return [
                'id'     => $category->id,
                'name'   => $category->name,
                'status' => $category->status,
                'slug'   => $category->slug,
                'count'  => $category->epdfs_count
            ];
        });
        // Return as a JSON response for Axios
        return response()->json($formattedData);
    }


    public function geteServiceList()
    {
        $data = Service::where('status', 1)->where('status', 1)->get();
        $formattedData = $data->map(function ($service) {
            return [
                'id'             => $service->id,
                'slug'           => $service->slug,
                'image'          => !empty($service->thumnail_img) ? url($service->thumnail_img) : "",
                'title'          => $service->name,
                'badge'          => "New",
                'instructor'     => "w3programmer.net",
                'status'         => $service->status,
                'price'          => $service->price,
                'description_full' => $service->description_full,
                'description_short' => $service->description_short,
            ];
        });
        // Return as a JSON response for Axios
        return response()->json($formattedData);
    }

    public function getSeoDataForIndex()
    {
        $data = SEOModel::where('id', 1)->select('index_pages_meta_description', 'index_pages_meta_keywords')->first();
        return response()->json($data, 200);
    }
    public function getSeoDataForQuesAnsw()
    {
        $data = SEOModel::where('id', 1)->select('q&a_pages_meta_description as q_a_meta_des', 'q&a_pages_meta_keywords as q_a_meta_key')->first();
        return response()->json($data, 200);
    }

    public function getSeoDataForTorrent()
    {
        $data = SEOModel::where('id', 1)->select('torrent_pages_meta_description', 'torrent_pages_meta_keywords')->first();
        return response()->json($data, 200);
    }

    public function getSeoDataForHome()
    {
        $data = SEOModel::where('id', 1)->select('home_pages_meta_description', 'home_pages_meta_keywords')->first();
        return response()->json($data, 200);
    }

    public function mainCategorySeo($slug)
    {
        $chkCategory = Categorys::where('slug', $slug)->first();
        $categoryId  =  !empty($chkCategory) ? $chkCategory->id : "";
        $data        = Post::where('categoryId', $categoryId)->select('meta_title', 'meta_description', 'meta_keyword')->first();
        return response()->json($data, 200);
    }

    public function generatePDF(Request $request, $slug)
    {
        // Fetch HTML data for PDF generation
        $html = $this->fetchHtmlData($slug);

        // Generate PDF using dompdf
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true); // Enable HTML5 parsing
        $options->set('isPhpEnabled', true); // Enable embedded PHP code

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait'); // Paper size and orientation

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF (inline or attachment)
        $output = $dompdf->output();

        // Example of sending the PDF as a response with headers
        return response($output, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="interview_qa.pdf"');
    }

    private function fetchHtmlData($slug)
    {

        $category = Category::where('slug', $slug)->where('status', 1)->firstOrFail();
        $qAndA = InveterviewQandA::where('category_id', $category->id)->where('status', 1)->get();

        // Prepare data for HTML table with watermark
        $html = '<html>';
        $html .= '<head>';
        $html .= '<style>';
        $html .= '.watermark {
        position: fixed;
        top: 45%;
        left: 60%;
        position: fixed;
        top: 50%;
        left: 60%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 50px;
        color: rgba(0, 0, 0, 0.2);
        z-index: -1;
        text-align: center; 
    }';
        $html .= 'table {
        width: 100%;
        border-collapse: collapse;
    }';
        $html .= 'th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }';
        $html .= '@page {
        margin: 100px 25px;
    }';
        $html .= 'header {
        position: fixed;
        top: -60px;
        left: 0px;
        right: 0px;
        height: 50px;
        background-color: #f2f2f2;
        text-align: center;
         
    }';
        $html .= 'footer {
        position: fixed;
        bottom: -60px;
        left: 0px;
        right: 0px;
        height: 50px;
        background-color: #f2f2f2;
        text-align: center;
        line-height: 35px;
    }';
        $html .= 'body {
        font-family: Arial, sans-serif;
    }';
        $html .= 'table, th, td {
        border: 1px solid #CCCCCC;
        border-collapse: collapse;
        padding: 8px;
    }';
        $html .= 'th {
        background-color: #f2f2f2;
    }';
        $html .= 'td.question {
        background-color: #e0e0e0;
    }';
        $html .= '</style>';
        $html .= '</head>';
        $html .= '<body>';

        $categoryDesc = !empty($category->description) ? $category->description : "";
        $html .= '<header>' . $categoryDesc . '</header>';
        $html .= '<footer>Provided by <a href="https://w3programmer.net" target="_blank">w3programmer.net</a></footer>';
        // Watermark overlay
        $html .= '<div class="watermark">w3programmer.net</div>';

        // Table with interview questions and answers
        $html .= '<table style="font-size: 13px;">';
        $html .= '<thead>';
        $html .= '<tr>';
        $html .= '<th>SL</th>';
        $html .= '<th>Question</th>';
        $html .= '<th>Answer</th>';
        $html .= '</tr>';
        $html .= '</thead>';
        $html .= '<tbody>';

        foreach ($qAndA as $index => $qa) {
            $html .= '<tr>';
            $html .= '<td>' . ($index + 1) . '</td>';
            $html .= '<td class="question">Q. ' . $qa->question . '</td>';
            $html .= '<td style="text-align:justify">A. ' . $qa->answer . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody>';
        $html .= '</table>';
        $html .= '</body>';
        $html .= '</html>';

        return $html;
    }



    public function getTechnology(Request $request)
    {

        $slug       = !empty($request->slug) ? $request->slug : "";
        $category   = Category::where('slug', $slug)->where('status', 1)->firstOrFail();
        $qAndA      = InveterviewQandA::where('category_id', $category->id)->where('status', 1)->get();

        $firstArray     = Category::where('parent_id', $category->id)->where('status', 1)->pluck('id')->toArray();
        $secondArray    = Category::where('status', 1)->pluck('id')->toArray();

        //============================================= Pagination ========================================
        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);
        // Get search query from the request
        $searchQuery = $request->searchQuery;

        // Start building the query
        $query = InveterviewQandA::where('category_id', $category->id)->where('status', 1);

        if ($searchQuery !== null) {
            $query->where('interview_questions.question', 'like', '%' . $searchQuery . '%');
        }

        // Apply pagination to the query
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        // Modify the collection
        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id' => $item->id,
                'language' => $item->language,
                'question' => $item->question,
                'answer' => $item->answer,
                'category_id' => $item->category_id,
            ];
        });

        $filteredCategories = Category::whereNotIn('id', $firstArray)
            ->select('id', 'name', 'slug')
            ->whereIn('id', $secondArray)
            ->limit(50)
            ->where('parent_id', '!=', 0)  // Adding the condition here
            ->get();

        $data = [
            'cateName'        => !empty($category->name) ? $category->name : "",
            'tutorialContent' => !empty($category->tutorial_content) ? $category->tutorial_content : "",
            'tags'     => $filteredCategories,

            //Pagination
            'data'          => $modifiedCollection,
            'pagination' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
        ];
        return response()->json($data, 200);
    }

    public function getAllChildCaegorys()
    {
        $rows = Category::where('status', 1)->where('parent_id', '!=', 0)->get();

        $result = $rows->map(function ($category) {
            return [
                'id'       => $category->id,
                'name'     => $category->name,
                'file'     => !empty($category->file) ? url($category->file) : "",
                'slug'     => $category->slug,
            ];
        });
        $data['result']         = $result;
        return response()->json($data, 200);
    }





    function strip_tags_content($text)
    {

        return preg_replace('@<(\w+)\b.*?>.*?</\1>@si', '', $text);
    }
    public function getChildDataParentWise($slug)
    {

        $rowCheck = Category::where('status', 1)->where('slug', $slug)->first();

        if (!$rowCheck) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        $categories = Category::where('parent_id', $rowCheck->id)->where('status', 1)->get();
        $result = $categories->map(function ($category) {
            return [
                'id'       => $category->id,
                'name'     => $category->name,
                'file'     => !empty($category->file) ? url($category->file) : "",
                'slug'     => $category->slug,
            ];
        });

        $firstArray     = Category::where('parent_id', $rowCheck->id)->where('status', 1)->pluck('id')->toArray();
        $secondArray    = Category::where('status', 1)->pluck('id')->toArray();

        // Initialize the filtered result array
        $filteredResult = [];
        $filteredResult = array_diff($secondArray, $firstArray);

        $filteredCategories = Category::whereNotIn('id', $firstArray)
            ->whereIn('id', $secondArray)
            ->where('parent_id', '!=', 0)  // Adding the condition here
            ->get();
        $othersCategory = $filteredCategories->map(function ($category) {
            return [
                'id'       => $category->id,
                'name'     => $category->name,
                'file'     => !empty($category->file) ? url($category->file) : "",
                'slug'     => $category->slug,
            ];
        });

        $data['result']         = $result;
        $data['name']           = !empty($rowCheck->name) ? $rowCheck->name : "";
        $data['othersCategory'] = $othersCategory;
        $postMsg = Post::where('categoryId', $rowCheck->id)->where('status', 1)->first();
        if (!empty($postMsg->description_full)) {
            $msg = $postMsg->description_full;
            // Remove HTML tags
            $val = preg_replace('/<[^>]+>/', ' ', $msg);
            $data['postMessages'] = $postMsg->description_full; //!empty($val) ? $val : "";
        } else {
            $data['postMessages'] = "";
        }

        //dd($data['postMessages']);
        return response()->json($data, 200);
    }
    public function childCategory()
    {
        $order = [60, 58, 57, 39, 59, 188];

        // Fetch categories and sort them based on the defined order
        $rows = Category::where('status', 1)
            ->where('parent_id', '!=', 0)
            ->whereIn('id', $order)
            ->orderBy(DB::raw('FIELD(id, ' . implode(',', $order) . ')'))
            ->get();

        $result = $rows->map(function ($category) {
            return [
                'id'       => $category->id,
                'name'     => $category->name,
                'thumnail' => !empty($category->file) ? url($category->file) : "",
                'slug'     => $category->slug,
            ];
        });
        $data['result']         = $result;
        return response()->json($data, 200);
    }

    public function parentChildCategory()
    {

        $categories = Category::with('children')->where('parent_id', 0)->where('status', 1)->get();
        return response()->json($categories);
    }

    public function geteServicerow(Request $request)
    {

        $row        = Service::where('slug', $request->slug)->where('status', 1)->first();
        $category   = Categorys::where('id', $row->categoryId)->first();

        $rowData = $row->toArray(); // Convert the Eloquent model to array
        $rowData['title'] = $row->name; // Add extra key inside the service object

        return response()->json([
            'id'                => $row->id,
            'meta_title'        => $row->meta_title,
            'meta_description'  => $row->meta_description,
            'meta_keyword'      => $row->meta_keyword,
            'categoryName'      => $category->name ?? '', // Safe access
            'name'              => $row->name ?? '', // Safe access
            'title'             => $row->name,
            'serviceName'       => $row->name,
            'slug'              => $row->slug,
            'description_full'  => $row->description_full,
            'description_short' => $row->description_short,
            'price'             => $row->price,
            'thumbnail'         => $row->thumnail_img ? url($row->thumnail_img) : '',
            'service'           => $rowData, // Includes custom 'title' inside
        ]);
    }



    public function allCategory(Request $request)
    {
        $categories = Categorys::with('children.children.children.children.children')->where('status', 1)->where('parent_id', 0)->get();
        $result = [];
        foreach ($categories as $v) {
            $result[] = [
                'id'            => $v->id,
                'name'          => $v->name,
                'thumnail'      => !empty($v->file) ? url($v->file) : "",
                'slug'          => $v->slug,

            ];
        }
        return response()->json($result, 200);
    }

    public function generateUniqueRandomNumber()
    {
        $numbers = [];

        while (count($numbers) < 4) {
            $randomNumber = rand(1000, 9999);
            if (!in_array($randomNumber, $numbers)) {
                $numbers[] = $randomNumber;
            }
        }

        return $numbers[0]; // Since we're generating only one number, return the first (and only) element of the array
    }

    public function getanswers(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'slug'                       => 'required',
            'uId'                        => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        //dd($request->all());
        $user_id = $request->uId;
        $chkUser = User::find($user_id);
        ///dd($chkUser);
        $examSlug   = $request->slug; // Get the exam slug
        $category   = Categorys::where('slug', $examSlug)->first();

        $userData   = Helper::UserData();
        $userName   = !empty($chkUser) ? $chkUser->name : null;


        $getAnswers = ExamAnswer::where('user_id', $user_id)
            ->where('category_id', $category->id)
            ->get()
            ->map(function ($item) {
                $checkQuestion = McqInterview::find($item->question_id);

                $status = '';
                if ($item->selected_option == $item->answer) {
                    $status = 1;
                } else {
                    $status = 0;
                }

                // Check if selected_option matches any option column
                $selectAnswerName = "";
                $validOptions = ['option_a', 'option_b', 'option_c', 'option_d'];

                if (!empty($item->selected_option) && !empty($checkQuestion) && in_array($item->selected_option, $validOptions)) {
                    $selectAnswerName = $checkQuestion->{$item->selected_option} ?? "";
                }

                return [
                    'id'                    => $item->id,
                    'question_id'           => $item->question_id,
                    'question'              => !empty($checkQuestion) ? $checkQuestion->question : "",
                    'option_a'              => !empty($checkQuestion) ? $checkQuestion->option_a : "",
                    'option_b'              => !empty($checkQuestion) ? $checkQuestion->option_b : "",
                    'option_c'              => !empty($checkQuestion) ? $checkQuestion->option_c : "",
                    'option_d'              => !empty($checkQuestion) ? $checkQuestion->option_d : "",
                    'answer'                => $item->answer,
                    'selected_option'       => $item->selected_option,
                    'selected_option_ans'   => $selectAnswerName,
                    'correct_answer'        => !empty($checkQuestion) ? $checkQuestion->correct_answer : "",
                    'is_correct'            => $status, // <-- Added new key
                ];
            });


        $forDate = ExamAnswer::where('user_id', $user_id)
            ->select('created_at')
            ->where('category_id', $category->id)
            ->first();

        $checkDate = date("M-d-Y", strtotime($forDate->created_at));

        return response()->json([
            'data'     => $getAnswers,
            'userName' => strtoupper($userName),
            'user_id'  => $user_id,
            'forDate'  => $checkDate,
            'cat_name' => !empty($category) ? $category->name : null,
            'message' => 'Fetech successfully!',
        ], 200);
    }
}
