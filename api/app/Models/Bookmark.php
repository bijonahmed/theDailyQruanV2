<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use DB;

class Bookmark extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "bookmark";
  protected $fillable = [
    'category_id',
    'user_id',
  ];
}
