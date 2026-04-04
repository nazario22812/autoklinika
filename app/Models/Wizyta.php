<?php

namespace App\Models;
use MongoDB\Laravel\Eloquent\Model;
//use Illuminate\Database\Eloquent\Model;

class Wizyta extends Model
{

    protected $connection = 'mongodb';
    protected $collection = 'wizytas';



//  $table->id();
//             $table->string('user_id')->index();            
//             $table->string('marka');
//             $table->string('model');
//             $table->integer('rok_produkcji');
//             $table->string('numer_rejestracyjny');
//             $table->string('usluga');
//             $table->string('opis')->nullable();
//             $table->date('data_wizyty');
//             $table->time('godzina_wizyty');
//             $table->string('status')->default('oczekujący');
//             $table->id('mechanik_id')->nullable();
//             $table->string('komentarz_mechanika');
//             $table->float('cena');
//             $table->timestamps();

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
        'mechanik_id',
        'komentarz_mechanika',
        'cena',
    ];

}
