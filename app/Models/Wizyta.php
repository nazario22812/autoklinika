<?php

namespace App\Models;
use MongoDB\Laravel\Eloquent\Model;
//use Illuminate\Database\Eloquent\Model;

class Wizyta extends Model
{

    protected $connection = 'mongodb';
    protected $collection = 'wizytas';

    protected $fillable = [
        'marka',
        'model',
        'rok_produkcji',
        'numer_rejestracyjny',
        'usluga',
        'opis',
        'data_wizyty',
        'godzina_wizyty',
        'status',
        'user_id',
    ];

}
