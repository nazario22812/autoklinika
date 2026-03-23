<?php

namespace App\Http\Controllers;

use App\Models\Wizyta;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use MongoDB\Builder\Expression\ToUpperOperator;

class WizytaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 'marka',
        // 'model',
        // 'rok_produkcji',
        // 'numer_rejestracyjny',
        // 'usluga',
        // 'opis',
        // 'data_wizyty',
        // 'godzina_wizyty',
        // 'status',
        // 'user_id',

        $request->validate([
            'marka' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'rok_produkcji' => 'required|digits:4', 
            'numer_rejestracyjny' => 'required|string|max:20', 
            //'usluga' => 'required|string|max:100',
            //'opis' => 'nullable|string|max:255',
            //'data_wizyty' => 'required|date',
            //'godzina_wizyty' => 'required|time',
        ]);

        

        $wizyta = Wizyta::create([
            'marka' => $request->marka,
            'model' => $request->model,
            'rok_produkcji' => $request->rok_produkcji,
            'numer_rejestracyjny' =>strtoupper($request->numer_rejestracyjny),
            'usluga' => $request->uslugi,
            'opis' => $request->opis,
            'data_wizyty' => $request->data,
            'godzina_wizyty' => $request->godzina,
            'status' => "oczekujące",
            'user_id' => $request->user()->id,
            'komentarz_mechanika' => null,
            'cena' => null,
        ]);



        return redirect()->route('check-order');
    }

    /**
     * Display the specified resource.
     */
    public function show(Wizyta $wizyta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wizyta $wizyta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Wizyta $wizyta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wizyta $wizyta)
    {
        //
    }
}
