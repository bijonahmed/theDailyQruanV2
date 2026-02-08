<?php

namespace App\Http\Controllers\Documents;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Helper;
use App\Models\User;
use App\Models\Project;
use App\Models\Documents;
use App\Models\Service;
use Illuminate\Support\Str;
use App\Rules\MatchOldPassword;
use Illuminate\Support\Facades\Hash;
use DB;

class DocumentsController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function geteBooks(Request $request)
    {

        $userData   =  Helper::UserData();
        $user_id    = $userData['userId']; // fallback to null if not set
        //dd($user_id);
        try {
            $rows = Deposit::leftJoin('service', 'service.id', '=', 'deposit.service_id')
                ->select(
                    'deposit.*',
                    'service.name as service_name',
                    'service.thumnail_img',
                    'service.pdf_file',
                    'service.slug'
                )
                ->where('deposit.user_id', $user_id)
                ->get(); // Get the data as a collection

            $modifiedCollection = $rows->map(function ($item) {
                return [
                    'id'              => $item->id,
                    'depositID'       => $item->depositID,
                    'depositID'       => $item->depositID,
                    'service_slug'    => $item->slug,
                    'thumnail_img'    => !empty($item->thumnail_img) ? url($item->thumnail_img) : "",
                    'pdf_file'        => !empty($item->pdf_file) ? url($item->pdf_file) : "",
                    'created_at'      => date("Y-m-d", strtotime($item->created_at)),
                    // Add any other fields you need to modify
                ];
            });
            // Return the modified collection
            return response()->json([
                'data'  => $modifiedCollection,
                'count' => count($modifiedCollection),
                'message' => 'success'
            ], 200);
        } catch (\Throwable $th) {
            $response = [
                'data' => [],
                'message' => 'failed'
            ];
        }
        return response()->json($response, 200);
    }

    /*
    public function readebooks(Request $request)
    {
        $slug = $request->slug;
        $userData = Helper::UserData();
        $user_id = $userData['userId'];

        $row = Service::where('status', 1)->where('slug', $slug)->first();

        if (!$row || empty($row->pdf_file)) {
            return response()->json([
                'message' => 'PDF not found',
            ], 404);
        }

        $filePath = public_path($row->pdf_file); // assuming file is stored in public

        if (!file_exists($filePath)) {
            return response()->json([
                'message' => 'PDF file missing on server',
            ], 404);
        }

        return response()->stream(function () use ($filePath) {
            readfile($filePath);
        }, 200, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => url($row->pdf_file),
            'x-pdf-name'            => !empty($row->name) ? $row->name : "",
        ]);
    }
    */

    public function readebooks(Request $request)
    {
        $slug = $request->slug;
        $userData = Helper::UserData();
        $user_id = $userData['userId'];

        try {
            $row = Service::where('status', 1)->where('slug', $slug)->first();

            if (!$row || empty($row->pdf_file)) {
                return response()->json([
                    'data' => [],
                    'message' => 'PDF file not found',
                ], 404);
            }

            // Return full public URL of PDF file
            $data = [
                'pdf_file' => url($row->pdf_file),
                'title'    => !empty($row->name) ? $row->name : "",
                'slug'     => $row->slug ?? '',
            ];

            return response()->json([
                'data'    => $data,
                'message' => 'success',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'data' => [],
                'message' => 'Server error: ' . $th->getMessage(),
            ], 500);
        }
    }
}
