<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Wizyta;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function updateRole(Request $request){
        $user = User::find($request->user_id);
        
        if ($user) {
            $user->is_admin = !$user->is_admin; 
            $user->save();
        }

        return redirect()->route('admin.users')->with('success', 'Rola użytkownika została zaktualizowana.');
    }

    public function counts(){
        $userCount = User::latest()->count();
        $zamowieniaCount = Wizyta::latest()->count();
        $ostatnieZamowienia = Wizyta::where('mechanik_id', Auth::id())->where('status', '!=', 'anulowane')->where('status', '!=', 'oplacone')->latest()->first();
        return Inertia::render('Admin/Dashboard', [
            'userCount' => $userCount,
            'zamowieniaCount' => $zamowieniaCount,
            'ostatnieZamowienia' => $ostatnieZamowienia
        ]);
    }
    public function getallusers(){
        $usery = User::latest()->get();

        return Inertia::render('Admin/UserList', [
            'uzytkowniki' => $usery 
        ]);

    }

    public function getactiveorders(){
        $zamowienia = Wizyta::where('mechanik_id', Auth::id())->latest()->get();
        return Inertia::render('Admin/ActiveOrderList', [
            'zamowienia' => $zamowienia
        ]);
    }

    public function getallorders(){
        $zamowienia = Wizyta::where('status', '!=', 'oplacone')->latest()->get();
        return Inertia::render('Admin/ZamowienieList', [
            'zamowienia' => $zamowienia,
        ]);

    }

    public function anulowanie(Request $request, $id){
        $zamowienie = Wizyta::find($id);
        if ($zamowienie) {
            $zamowienie->status = 'anulowane';
            $zamowienie->save();
        }
        return redirect()->route('admin.zamowienia')->with('success', 'Zamówienie zostało anulowane.');
    }

    public function wziaczamowienie(Request $request, $id){
        $zamowienie = Wizyta::find($id);
        if ($zamowienie) {
            $zamowienie->status = 'rozpatrywane';
            $zamowienie->mechanik_id = Auth::id();
            $zamowienie->save();
        }
        return redirect()->route('admin.zamowienia')->with('success', 'Zamówienie zostało wzięte do realizacji.');
    }
}
