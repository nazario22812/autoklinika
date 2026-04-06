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
        $request->validate([
            'marka' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'rok_produkcji' => 'required|digits:4', 
            'numer_rejestracyjny' => 'required|string|max:20', 
            'uslugi' => 'required|string', 
            'data' => 'required|date',      
            'godzina' => 'required',        
        ]);

        $czyZajete = Wizyta::where('data_wizyty', $request->data)
                       ->where('godzina_wizyty', $request->godzina)
                       ->where('status', '!=', 'anulowane') // Скасовані не рахуємо
                       ->exists();

        if ($czyZajete) {
            return back()->withErrors([
            'godzina' => 'Niestety, ta godzina jest już zajęta. Prosimy wybrać ińszą.'
            ]);
        }

        $wizyta = Wizyta::create([
            'marka' => $request->marka,
            'model' => $request->model,
            'rok_produkcji' => $request->rok_produkcji,
            'numer_rejestracyjny' => strtoupper($request->numer_rejestracyjny),
            'usluga' => $request->uslugi,
            'opis' => $request->opis,
            'data_wizyty' => $request->data,
            'godzina_wizyty' => $request->godzina,
            'status' => "oczekujące",
            'user_id' => $request->user()->id,
            'komentarz_mechanika' => null,
            'cena' => null,
        ]);

        return redirect()->route('check-order')->with('success', 'Wizyta została zarezerwowana!');
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
