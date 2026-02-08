<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;

class Categorys extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "categorys";
  protected $fillable = [
    'name',
    'slug',
    'tutorial_content',
    'description',
    'meta_title',
    'meta_description',
    'percentage_amt',
    'meta_keyword',
    'parent_id',
    'file',
    'bg_images',
    'store_images',
    'keyword',
    'sort_order',
    'status',
  ];

  public function categories()
  {
    return $this->hasMany(Categorys::class);
  }

  public function children()
  {
      return $this->hasMany(Categorys::class, 'parent_id')->where('status', 1);
  }

  public function parent()
  {
      return $this->belongsTo(Categorys::class, 'parent_id')->where('status', 1);
  }

 
 
}
