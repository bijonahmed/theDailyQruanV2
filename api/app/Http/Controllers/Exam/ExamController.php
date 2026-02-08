<?php

namespace App\Http\Controllers\Exam;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Helper;
use App\Models\User;
use App\Models\Categorys;
use App\Models\ExamAnswer;
use App\Models\McqInterview;
use Illuminate\Support\Str;
use App\Rules\MatchOldPassword;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use DB;

class ExamController extends Controller
{
    protected $userid;
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getExamDetails(Request $request)
    {

        $slug        = $request->slug;
        $chkPointCat = Categorys::where('slug', $slug)->first();
        $chkQuestion = McqInterview::where('category_id', $chkPointCat->id)->get();

        return response()->json([
            'data'          => $chkPointCat,
            'countQuestion' => $chkQuestion,
        ], 200);
    }



    public function submitanswers(Request $request)
    {
        //dd($request->all());
        $request->validate([
            'answers' => 'required|array', // Ensure answers is an array
            'examSlug' => 'required', // Ensure examSlug is a string
            'answers.*' => 'required', // Each answer should be a string (selected option)
        ]);


        // Loop through each answer and store it
        $userData = Helper::UserData();
        $user_id = $userData['userId']; // Fallback to null if not set

        $examSlug = $request->examSlug; // Get the exam slug
        $category = Categorys::where('slug', $examSlug)->first();

        // Check if category exists
        if (!$category) {
            return response()->json(['message' => 'Invalid exam slug.'], 400);
        }


        ExamAnswer::where('user_id', $user_id)
            ->where('category_id', $category->id)
            ->delete();

        // Loop through each answer and store it
        foreach ($request->answers as $question_id => $selected_option) {
            $checkQuestionId = McqInterview::where('id', $question_id)->first();
            ExamAnswer::create([
                'category_id'     => !empty($category->id) ? $category->id : null,
                'user_id'         => $user_id,
                'question_id'     => $question_id,
                'selected_option' => $selected_option,
                'answer'          => !empty($checkQuestionId) ? 'option_' . strtolower($checkQuestionId->correct_answer) : null,
            ]);
        }


        return response()->json([
            'message' => 'Exam submitted successfully!',
        ], 200);
    }


    public function getanswers(Request $request)
    {

        $examSlug   = $request->slug; // Get the exam slug
        $category   = Categorys::where('slug', $examSlug)->first();

        $userData   = Helper::UserData();
        $user_id    = $userData['userId'];
        $userName   = $userData['name'];




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


    public function getCertificateDetails()
    {


        $userData   = Helper::UserData();
        $user_id    = $userData['userId'];
        $userName   = $userData['name'];
        
        $answers = ExamAnswer::where('user_id', $user_id)->get();
        
        // Group by category_id
        $groupedByCategory = $answers->groupBy('category_id')->map(function ($items, $categoryId) {
            $chkCategory = Categorys::find($categoryId);
        
            return [
                'category_id'           => $categoryId,
                'categoryName'          => !empty($chkCategory->name) ? $chkCategory->name : null,
                'categorySlug'          => !empty($chkCategory->slug) ? $chkCategory->slug : null,
                'answers'               => $items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        // You can add more fields from ExamAnswer here if needed
                    ];
                }),
            ];
        })->values(); // Use values() to reset the keys (optional)
        
        return response()->json([
            'data'    => $groupedByCategory,
            'message' => 'Fetched successfully!',
        ], 200);


    }
}
