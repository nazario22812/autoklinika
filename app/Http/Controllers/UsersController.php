<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Wizyta;
use App\Models\Pytanie;
use Illuminate\Validation\Rules\In;
use Inertia\Inertia;
class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    

    public function zadajpytanie()
    {
        $mojepytania = Pytanie::where('user_id', Auth::id())->get();
        return Inertia::render('Questions', [
            'mojePytania' => $mojepytania
        ]);
    }

    public function wyslijpytanie(Request $request){
        $request->validate([
            'temat' => 'required|string|max:255',
            'tresc' => 'required|string',
        ]);

        Pytanie::create([
            'temat' => $request->temat,
            'tresc' => $request->tresc,
            'user_id' => Auth::id(),
            'status' => 'oczekujące'
        ]);

        return redirect()->route('faq.zadaj-pytanie')->with('success', 'Twoje pytanie zostało wysłane!');

    }

    public function faq(){
        return Inertia::render('FAQ');
    }

    public function index()
    {
        //

        $wizyty = Wizyta::where('user_id', Auth::id())->get();

        return Inertia::render('CheckOrder', [
            'mojeWizyty' => $wizyty 
        ]);

    }

    public function szczegoly($id){
        $zamowienie = Wizyta::where('_id', $id)
                        ->where('user_id', Auth::id())
                        ->firstOrFail(); 

        return Inertia::render('SzczegolyOrder', [
            'zamowienie' => $zamowienie
        ]);
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
       

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
