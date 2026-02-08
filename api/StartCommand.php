<?php

namespace App\Console\Commands;
use App\Models\User;
use App\Models\MiningCategory;
use App\Models\MiningHistory;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class StartCommand extends Command
{
    protected $signature = 'app:start-command';
    protected $description = 'Display time every second between start and end times';


    public function handle()
    {

        
        $id = auth('api')->user();
       
        date_default_timezone_set('Asia/Dhaka');
        //php artisan schedule:run  working
        $userid =Cache::get('current_userid');
        $mining_category_id =Cache::get('current_mining_category_id');
        \Log::info('StartCommand is executed with UserID: ('.$userid.') and mining category id: ('.$mining_category_id.')');
        $checkrow  = MiningHistory::orderBy('id', 'DESC')->where('user_id',$userid)->where('mining_category_id',$mining_category_id)->first();
        if ($checkrow) {
             $this->info("TestCommand executed with User ID: $userid and Mining Category ID: $mining_category_id.");
             $mining_id = $checkrow->mining_category_id;
             $getminCategory = MiningCategory::where('id', $mining_id)->first();
             $customTimeZone = 'Asia/Dhaka';
             $currentTime    = Carbon::now($customTimeZone);
             //$currentTimeFormatted = $currentTime->format('Y-m-d H:i:s');
             // echo "Current time : {$currentTimeFormatted}-- End Time: {$checkrow->end_time}<br>";
             $end_time = $checkrow->end_time;
             // Check if the current time is less than the end time
             if ($currentTime->lessThan($end_time)) {
                 $differenceInSeconds = $currentTime->diffInSeconds($end_time);
                 $minutes = intdiv($differenceInSeconds, 60);
                 $seconds = $differenceInSeconds % 60;
                 //For Assets Calculation 
                 $miningAmount = (float) $getminCategory->minining_amount_per_secnd;  // Convert to float first
                 $miningAmount = number_format($miningAmount, 10); // Format for display (optional)
                 $miningAmount = strval($miningAmount); // Convert back to string before bcmul
 
                 $startCatTime = $checkrow->start_time;
                 $getSeconds   = $currentTime->diffInSeconds($startCatTime);
             
                 $assets       = $getSeconds * $miningAmount;
                 $data['countdown']      = "{$minutes}:{$seconds}";
                 $data['current_assets'] = number_format($assets, 8); // Specify 10 decimal places for precision
                 $user = User::find($userid); // Replace 1 with the actual ID of the row you want to update
                 $user->available_balance = $user->available_balance + number_format($assets, 8); // Update specific fields
                 $user->save(); // Save the changes to the database
                 // sleep(1);
                 //return response()->json($data, 200);
             } else {
                echo "current time is not small";
              
             }
         }else{
            echo "No mining history record found!"; 
                //  $data['status']   = 0; 
                //  $data['messages'] ="No mining history record found!"; 
                //  return response()->json($data, 200);
         }







    }
}
