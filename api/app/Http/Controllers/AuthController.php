<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\User;
use App\Models\VerifyEmail;
use Validator;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Validation\ValidationException; // Import the ValidationException class
use DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['me', 'login', 'register', 'showProfileData', 'updateprofile', 'updatePassword']]);
    }

    protected function validateLogin(Request $request)
    {
        //userCapInput
        $request->validate([
            'email'        => 'required|string',
            'password'     => 'required|string',
            'captchaInput' => 'required',
            'userCapInput' => 'required',
        ]);

        // Validate CAPTCHA
        if (strtolower($request->input('captchaInput')) !== strtolower($request->input('userCapInput'))) {
            throw ValidationException::withMessages([
                'userCapInput' => ['The CAPTCHA code is incorrect.'],
            ]);
        }
    }

    public function login(Request $request)
    {
        $this->validateLogin($request);
        $credentials = request(['email', 'password']);
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json([
                'errors' => [
                    'account' => [
                        "Invalid username or password"
                    ]
                ]
            ], 422);
        }
        $user = auth('api')->user();
        if (!empty($user)) {
            if ($user->status === 1) {
                $ipAddress = $request->ip(); //'5.193.226.195'; Testing ip Dubai
                $country = "";
                $data = [
                    'lastlogin_ip' => $ipAddress,
                    'lastlogin_country' => $country,
                    'lastlogin_datetime' => now()->format('Y-m-d H:i:s'),
                ];
                // Update the user table for the given user ID
                User::where('id', $user->id)->update($data);
            }
        }
        if ($user->status === 0) {
            return response()->json([
                'errors' => [
                    'account' => [
                        "This user is blocked"
                    ]
                ]
            ], 403);
        }
        return $this->respondWithToken($token);
    }



    public function generateUniqueRandomNumber()
    {
        $microtime = microtime(true); // Get the current microtime as a float
        $microtimeString = str_replace('.', '', (string)$microtime); // Remove the dot from microtime
        // Extract the last 5 digits
        $uniqueId = substr($microtimeString, -7);
        return $uniqueId; // Since we're generating only one number, return the first (and only) element of the array
    }

    public function checkMlmComission($inviteCode)
    {
        $setting = Setting::find(1);
        $checkInviteUser  = User::where('inviteCode', $inviteCode)->first();
        $firstLeveluserId = $checkInviteUser->id;
        if ($checkInviteUser) {
            $firstLeveluserId = $checkInviteUser->id;
            //echo "==Level-1==ID: $firstLeveluserId---Email: $checkInviteUser->email, Ref ID: $checkInviteUser->ref_id <br/>"; 
            $lev_1['available_balance'] = !empty($setting->level_1_bonus) ? $setting->level_1_bonus : 0;
            $lev_1['level_commission']  =  $lev_1['available_balance'];
            User::where('id', $firstLeveluserId)->update($lev_1);

            $secondLeveluser = User::where('id', $checkInviteUser->ref_id)->first();
            if ($secondLeveluser) {
                $secondLeveluserId = $secondLeveluser->id;
                // echo "==Level-2==ID: $secondLeveluserId---Email: $secondLeveluser->email, Ref ID: $secondLeveluser->ref_id <br/>"; 
                $lev_2['available_balance'] = !empty($setting->level_2_bonus) ? $setting->level_2_bonus : 0;
                $lev_2['level_commission']  =  $lev_2['available_balance'];
                User::where('id', $secondLeveluserId)->update($lev_2);

                $thirdLeveluser = User::where('id', $secondLeveluser->ref_id)->first();
                if ($thirdLeveluser) {
                    $thirdLeveluserId = $thirdLeveluser->id;
                    //  echo "==Level-3==ID: $thirdLeveluserId---Email: $thirdLeveluser->email, Ref ID: $thirdLeveluser->ref_id <br/>";
                    $lev_3['available_balance'] = !empty($setting->level_3_bonus) ? $setting->level_3_bonus : 0;
                    $lev_3['level_commission']  =  $lev_3['available_balance'];
                    User::where('id', $thirdLeveluserId)->update($lev_3);
                }
            }
        }
    }

    public function register(Request $request)
    {

        $setting = Setting::find(1);
        //dd($request->all());
        $this->validate($request, [
            'name'       => 'required',
            'email'      => 'required|unique:users,email',
            'password'   => 'required|min:6'
        ]);
        $email            = $request->email;

        $ipaddress = request()->ip();

        $t = microtime(true);
        $createTimeStamp =  strtok($t, '.');
        $code = $createTimeStamp; //uniqid().mt_rand(1, 999999);
        $inviteCode = !empty($request->inviteCode) ? $request->inviteCode : "";
        if (!empty($inviteCode)) {
            $user = User::where('inviteCode', $inviteCode)->first();
            if (!empty($user->id)) {
                $setting = Setting::first();
                // Update user data
                $userData = [
                    'reffer_bonus' => !empty($setting->reffer_bonus) ? $user->reffer_bonus + $setting->reffer_bonus : 0,
                ];
                User::where('inviteCode', $inviteCode)->update($userData);
                $inviteCode = $code;
                $joinId = $user->id;
            } else {
                $errorMessage = "Invalid Code: The provided invite code does not exist.";
                // You may want to log this error or return it to the client, depending on your application needs.
            }
        } else {
            $inviteCode = $code;
            $joinId = "";
        }


        $user = User::create([
            'name'                => $request->name,
            'email'               => $request->email,
            'role_id'             => 2,
            'available_balance'   => !empty($setting->register_bonus) ? $setting->register_bonus : 0, // 3 UIC
            'ref_id'              => $joinId,
            'status'              => 1,
            'register_ip'         => $request->ip(),
            'inviteCode'          => $this->generateUniqueRandomNumber(),
            'show_password'       => $request->password,
            'password'            => bcrypt($request->password),
        ]);

        $inviteCode               = $this->generateUniqueRandomNumber();
        $uic                      = 'w3p' . sprintf('%09d', $user->id);
        $user->update([
            'inviteCode'    => $inviteCode,
            'w3_id'        => $uic, // Add other fields and their respective values here
            'w3_address'   => md5($uic),
            // Add more fields as needed
        ]);
        // $this->sendMail($email);
        // Get the token
        $token = auth('api')->login($user);
        return $this->respondWithToken($token);
    }

    public function sendMail($email)
    {

        $uniqueNumber = $email; //rand(100000, 999999); // Or any other unique identifier
        $encryptedToken = Crypt::encryptString($uniqueNumber);
        $activationLink = url('/activate-account?token=' . urlencode($encryptedToken));

        $to      = $email;
        // Email content
        $subject = 'Activate Your UIC Account';
        $htmlMessage = "Please click the link below to activate your UIC account: <a href=\"$activationLink\">$activationLink</a>";

        // Remove HTML tags
        $message = trim(strip_tags($htmlMessage));
        //echo $message;exit; 

        // Set content-type header for HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: uic@gmail.com' . "\r\n" .
            'Reply-To: uic@gmail.com' . "\r\n";
        //dd($request->all());
        $headers = 'From: uic@gmail.com'       . "\r\n" .
            'Reply-To: uic@gmail.com' . "\r\n";
        mail($to, $subject, $message, $headers);

        $response = [
            'message' => 'Sending Vertification Email'
        ];
        return response()->json($response, 200);
    }

    public function me()
    {
        $user = auth('api')->user();
        //return response()->json($user);
        return response()->json($user);
    }

    public function getUsers()
    {
        $user = auth('api')->user();
        return response()->json($user);
        //return response()->json($this->guard('api')->user());
    }
    public function logout()
    {
        auth()->guard('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
    public function refresh()
    {
        return $this->respondWithToken($this->guard('api')->refresh());
    }
    protected function respondWithToken($token)
    {
        $user = auth('api')->user(); // Retrieve the authenticated user
        return response()->json([
            'access_token'  => $token,
            'token_type'    => 'bearer',
            'expires_in'    => auth('api')->factory()->getTTL() * 60,
            'user' => [
                'id'        => $user->id,
                'role_id'   => $user->role_id,
                'name'      => $user->name,
                'email'     => $user->email,
                'status'    => $user->status,
                // Add any other user information you want to include
            ],
        ]);
    }
    public function guard()
    {
        return Auth::guard();
    }
    public function profile(Request $request)
    {
        $user = auth('api')->user();
        $this->validate($request, [
            'name'          => 'required',
            'email'         => "required|unique:users,email, $user->id",
            'password'      => 'sometimes|nullable|min:8'
        ]);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        if ($request->password) {
            $user->update([
                'password' => bcrypt($request->password),
            ]);
        }
        return response()->json([
            'success' => true,
            'user' => $user
        ], 200);
    }

    public function updateUserProfileSocial(Request $request)
    {
        $user = auth('api')->user();
        $authId = $user->id;
        $telegram = $user->telegram;
        $whtsapp  = $user->whtsapp;
        $othersway_connect  = $user->othersway_connect;
        $validator = Validator::make($request->all(), [
            'telegram' => 'required',
            'whtsapp'  => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $data = array(
            'id'                => $authId,
            'telegram'          => !empty($request->telegram) ? $request->telegram : "",
            'whtsapp'           => !empty($request->whtsapp) ? $request->whtsapp : "",
            'othersway_connect' => !empty($request->othersway_connect) ? $request->othersway_connect : "",
        );
        //dd($data);
        DB::table('users')->where('id', $authId)->update($data);
        $response = [
            'telegram' => $telegram,
            'whtsapp'  => $whtsapp,
            'othersway_connect'  => $othersway_connect,
            'message'  => 'Successfully update'
        ];
        return response()->json($response);
    }

    public function updateprofile(Request $request)
    {
        $user               = auth('api')->user();
        $authId             = $user->id;

        $validator          = Validator::make($request->all(), [
            'name'          => 'required',
            'phone_number'  => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $data = array(
            'id'                => $authId,
            'name'              => !empty($request->name) ? $request->name : "",
            // 'email'             => !empty($request->email) ? $request->email : "",
            'phone_number'      => !empty($request->phone_number) ? $request->phone_number : "",
            'address'           => !empty($request->address) ? $request->address : "",
            'website'           => !empty($request->website) ? $request->website : "",
            'github'            => !empty($request->github) ? $request->github : "",
            'twitter'           => !empty($request->twitter) ? $request->twitter : "",
            'instagram'         => !empty($request->instagram) ? $request->instagram : "",
            'facebook'          => !empty($request->facebook) ? $request->facebook : "",
        );
        if (!empty($request->file('file'))) {
            $documents = $request->file('file');
            $fileName = Str::random(20);
            $ext = strtolower($documents->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $documents->move(public_path('/backend/files/'), $upload_url);
            $data['image'] = $upload_url;
        }
        //dd($data);
        DB::table('users')->where('id', $authId)->update($data);
        $response = [
            'imagelink' => !empty($user) ? url($user->image) : "",
            'message' => 'User successfully update',
        ];
        return response()->json($response);
    }
    public function showProfileData(Request $request)
    {
        $data   = auth('api')->user();
        $id     = (int)$data->id;
        $row    = User::where('id', $id)->first();
        $res['email']       =  is_string($row->email) ? $row->email : json_encode($row->email);
        $res['name']        =  is_string($row->name) ? $row->name : json_encode($row->name);
        $res['phone_number'] =  is_string($row->phone_number) ? $row->phone_number : json_encode($row->phone_number);
        $res['twitter']     =  is_string($row->twitter) ? $row->twitter : json_encode($row->twitter);
        $res['facebook']    =  is_string($row->facebook) ? $row->facebook : json_encode($row->facebook);
        $res['whtsapp']     =  is_string($row->whtsapp) ? $row->whtsapp : json_encode($row->whtsapp);
        $res['id']     =  $id;

        return response()->json($res);
    }
    public function changesPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:1|confirmed',
            'password_confirmation' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $id = auth('api')->user();
        $user = User::find($id->id);
        //dd($currentuser->username);
        $user->password = Hash::make($request->password);
        $user->show_password = $request->password;
        $user->save();
        $response = "Password successfully changed!";
        return response()->json($response);
    }


    public function updatePassword(Request $request)
    {

        //  dd($request->all());

        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|min:8|confirmed:new_password_confirmation',
            'new_password_confirmation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $id = auth('api')->user();
        $user = User::find($id->id);

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['errors' => ['old_password' => ['The old password is incorrect.']]], 422);
        }

        $user->password = Hash::make($request->new_password);
        $user->show_password = $request->new_password;
        $user->save();

        $response = "Password successfully changed!";
        return response()->json($response);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $id = auth('api')->user();
        $user = User::find($id->id);

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['errors' => ['old_password' => ['The old password is incorrect.']]], 422);
        }

        $user->password = Hash::make($request->new_password);
        $user->show_password = $request->new_password;
        $user->save();

        $response = "Password successfully changed!";
        return response()->json($response);
    }
}
