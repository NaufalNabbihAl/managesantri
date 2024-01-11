<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absen extends Model
{
    protected $fillable = [
        'santri_id',
        'kehadiran',
    ];
    use HasFactory;
}
