<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\MyMessage;
use Illuminate\Http\Request;
use App\Events\Message;
use Helper;

class ChatController extends Controller
{

    protected $userid;
    protected $email;
    public function __construct()
    {
        $this->middleware('auth:api');
       
    }

    public function message(Request $request)
    {

        $data = $request->validate([
            // 'username' => 'required',
            'message' => 'required',
            'community_slug' => 'required',
        ]);
        $userData   = Helper::UserData();
        $user_id    = $userData['userId']; 
        $email      = $userData['email']; 
        // fallback to null if not set
        //event(new Message($this->email, $data['message'], $data['community_slug']));
        //event(new Message('b@gmail.com', $data['message'])); // Example message number
        //event(new Message($request->input('username'), $request->input('message')));
        //return [];
        $rdata['user_id']        = $user_id;
        $rdata['community_slug'] = $request->community_slug;
        $rdata['message']        = $request->message;
        $rdata['username']       = $email; ///$request->username;
        $message = MyMessage::insertGetId($rdata);

        return response()->json($message);
    }

    public function getMessages($community_slug)
    {
        $messages = MyMessage::where('community_slug', $community_slug)->get();

        $data = [];
        foreach ($messages as $v) {
            $check = User::where('email', $v->username)->select('name')->first();
            $data[] = [
                'id'                => $v->id,
                'user_id'           => $v->user_id,
                'username'          => $v->username,
                'name'              => !empty($check) ? $check->name : "",
                'community_slug'    => $v->community_slug,
                'message'           => $v->message,
                'created_at'        => $v->created_at,
                'updated_at'        => $v->updated_at,
            ];
        }
        return response()->json($data, 200);
    }

    public function longPoll(Request $request, $communitySlug)
    {
        $lastMessageId = $request->query('last_message_id', 0);
        while (true) {
            $messages = MyMessage::where('community_slug', $communitySlug)
                ->get();
            if ($messages->count() > 0) {
                return $messages;
            }
            usleep(5); // 500ms
        }
    }
}
