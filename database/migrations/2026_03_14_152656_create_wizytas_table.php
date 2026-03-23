<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */


    //  'marka',
    //     'model',
    //     'rok_produkcji',
    //     'numer_rejestracyjny',
    //     'usluga',
    //     'opis',
    //     'data_wizyty',
    //     'godzina_wizyty',
    //     'status',
    //     'user_id',
    public function up(): void
    {
        Schema::create('wizytas', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->index();            
            $table->string('marka');
            $table->string('model');
            $table->integer('rok_produkcji');
            $table->string('numer_rejestracyjny');
            $table->string('usluga');
            $table->string('opis')->nullable();
            $table->date('data_wizyty');
            $table->time('godzina_wizyty');
            $table->string('status')->default('oczekujący');
            $table->string('komentarz_mechanika');
            $table->float('cena');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wizytas');
    }
};
