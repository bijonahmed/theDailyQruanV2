<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;

class Category extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "categorys";
  protected $fillable = [
    'category_name',
    'status',
    'description',
    'created_at',
    'updated_at',
  ];

  // Define the relationship to get children categories
  public function children()
  {
    return $this->hasMany(Category::class, 'parent_id');
  }

  // Optionally, define the relationship to get the parent category
  public function parent()
  {
    return $this->belongsTo(Category::class, 'parent_id');
  }

  public static function checkCategoryRow($id)
  {
    return DB::table('category')->where('category_id', $id)->first();
  }

  public static function allCategory()
  {
    return DB::table('category')->where('status', 1)->orderBy('category_name', 'asc')->get();
  }

  public static function checkSubCategoryRow($id)
  {
    return  DB::table('sub_category')->where('sub_cate_id', $id)->first();
  }
}
