<?php
namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;
class Transfer extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $table = "transfer";
    protected $fillable = [
        'previous_user_id',
        'transer_user_id',
        'order_id',
    ];
}
