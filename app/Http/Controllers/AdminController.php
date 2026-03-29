<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Wizyta;
use Inertia\Inertia;

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
        return Inertia::render('Admin/Dashboard', [
            'userCount' => $userCount,
            'zamowieniaCount' => $zamowieniaCount
        ]);
    }
    public function getallusers(){
        $usery = User::latest()->get();

        return Inertia::render('Admin/UserList', [
            'uzytkowniki' => $usery 
        ]);

    }

    public function getallorders(){
        $zamowienia = Wizyta::latest()->get();
        return Inertia::render('Admin/ZamowienieList', [
            'zamowienia' => $zamowienia,
        ]);

    }
}
