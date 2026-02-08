<?php
namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;
class TorrentFiles extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $table = "torrent_files";
    protected $fillable = [
        'name',
        'slug',
        'site_name',
        'description',
        'download_link',
        'meta_title',
        'meta_description',
        'meta_keyword',
        'torrent_file',
        'status'
    ];

     
}
