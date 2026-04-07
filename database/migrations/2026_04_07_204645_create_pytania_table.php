<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        // 'temat',
        // 'tresc',
        // 'mechanik_id',
        // 'odpowiedz',
        // 'user_id'
        Schema::create('pytania', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->index();
            $table->string('temat');
            $table->text('tresc');
            $table->id('mechanik_id')->nullable()->index();
            $table->text('odpowiedz')->nullable();
            $table->string('status')->default('oczekujące');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pytania');
    }
};
