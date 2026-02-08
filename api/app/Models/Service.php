<?php
namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;
class Service extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $table = "service";
    protected $fillable = [
        'name',
        'slug',
        'description_short',
        'description_full',
        'meta_title',
        'meta_description',
        'meta_keyword',
        'categoryId',
        'entry_by',
        'price',
        'thumnail_img',
        'pdf_file',
        'status'
    ];

     
}
