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

class SwapHistory extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "swapHistory";
  
  protected $fillable = [
    'swap_amount',
    'user_id',
    'wallet_type_frm',
    'wallet_type_to',
    'swape_date',
    'request_amount'
  ];
 
 

}
