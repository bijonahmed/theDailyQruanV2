<?php
namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;
class SEOModel extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $table = "setting";
    protected $fillable = [
        'id',
        'index_pages_meta_description',
        'index_pages_meta_keywords',
        'home_pages_meta_description',
        'home_pages_meta_keywords',
        'q&a_pages_meta_description ',
        'q&a_pages_meta_keywords',
        'torrent_pages_meta_description',
        'torrent_pages_meta_keywords',

    ];
}
