<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Pytanie extends Model
{
    protected $connection = 'mongodb';
    protected $table = 'pytania'; 
    protected $collection = 'pytania';

    protected $fillable = [
        'temat',
        'tresc',
        'mechanik_id',
        'odpowiedz',
        'user_id',
        'status',
    ];
}
