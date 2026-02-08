<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;

class ExamAnswer extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $table = "exam_answers";
    protected $fillable = [
        'category_id',
        'user_id',
        'question_id',
        'selected_option',
        'answer'
    ];
}
