<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\AttributeValues;
use AuthorizesRequests;
use DB;

class Withdraw extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "withdraw";
  
  protected $fillable = [
    'withdrawID',
    'depscription',
    'transection_fee',
    'account_number',
    'usd_amount',
    'uic_amount',
    'withdrawal_method_id',
    'user_id',
    'withdraw_amount',
    'payable_amount',
    'remarks',
    'password',
    'approved_by',
    'status',
  ];
 
}
