<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\MystoreHistory;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Crypt;
use App\Models\ProductCategory;
use App\Models\User;
use App\Jobs\ProcessExcelUpload;
use App\Models\CustomerHistory;
use App\Models\TorrentFiles;
use App\Models\TorrentsTutorial;
//use Darryldecode\Cart\Cart;
use Illuminate\Support\Facades\Session;
use Cart;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Redirect;

class PublicController extends Controller
{

    public function activationAccount(Request $request)
    {

        $activationUrl  = !empty($request->token) ? $request->token : ""; // Example URL
        $decryptedToken = Crypt::decryptString(urldecode($activationUrl));

        if (!empty($decryptedToken)) {
            //echo $decryptedToken;
            $user = User::where('email', trim($decryptedToken))->first();
            //dd($user->id);
            $userId = $user->id;
            $data['status'] = 1;
            User::where('id', $userId)->update($data);
            return Redirect::away('https://uicmax.com/login/');
        }
    }

    function generateUniqueRandomNumber()
    {
        // Get current microtime as a string and remove the decimal point
        $microtime          = (string) microtime(true); // Current time with microseconds
        $microtimeStr       = str_replace('.', '', $microtime); // Remove the dot0.656545545455000
        // Extract the last 6 digits

        return md5($microtimeStr); // Return the 6-digit unique value
    }


    public function allTorrentFiles()
    {

        $chkTorrent  = TorrentFiles::where('torrent_status', 1)->get();


        foreach ($chkTorrent as $v) {
            // Original file path
            $originalPath = public_path($v->torrent_file);

            // Sanitize the name and ensure .torrent extension
            $safeName = preg_replace('/[^A-Za-z0-9_\-]/', '_', pathinfo($v->name, PATHINFO_FILENAME));
            $newFilePath = 'backend/torrent/' . $safeName . '.torrent';
            $newFullPath = public_path($newFilePath);

            // Check if original file exists
            if (file_exists($originalPath)) {
                if (rename($originalPath, $newFullPath)) {
                    echo "Renamed: $v->torrent_file => $newFilePath<br/>";

                    // Update database
                    $v->torrent_file = $newFilePath;
                    $v->torrent_status = 2;
                    $v->save();
                } else {
                    echo "Failed to rename: $v->torrent_file<br/>";
                }
            } else {
                echo "File not found: $v->torrent_file<br/>";
            }
        }
    }

    public function upload()
    {
        $uploads = CustomerHistory::paginate(10); // Fetch 10 uploads per page
        return view('upload', compact('uploads'));
    }


    public function submit(Request $request)
    {
        // Validate the uploaded file
        $request->validate([
            'file' => 'required|mimes:xlsx,xls'
        ]);

        // Store the uploaded file
        $filePath = $request->file('file')->store('excel_files');

        // Dispatch the job to process the file
        ProcessExcelUpload::dispatch($filePath);
        return redirect()->back()->with('success', 'File uploaded successfully. Processing in background.');
    }
}
