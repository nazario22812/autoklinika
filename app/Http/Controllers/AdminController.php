<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Wizyta;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

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
        $dzisiejszeWizytyCount = Wizyta::where('data_wizyty', Carbon::today()->format('Y-m-d'))
                                   ->where('status', '!=', 'anulowane') // не рахуємо скасовані
                                   ->count();
        return Inertia::render('Admin/Dashboard', [
            'dzisiejszeWizytyCount' => $dzisiejszeWizytyCount,
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

    public function harmonogram(){
        $wizyty = Wizyta::where('status', '!=', 'anulowane')->get();

        // Перетворюємо їх для календаря
        $events = $wizyty->map(function($w) {
            return [
                'id' => $w->_id, // Для MongoDB
                'title' => $w->marka . ' ' . $w->model . ' (' . $w->usluga . ')',
            // Формуємо дату і час у стандарті ISO: "YYYY-MM-DDTHH:mm:00"
                'start' => $w->data_wizyty . 'T' . $w->godzina_wizyty,
            // Додаємо посилання, щоб при кліку відкривались деталі!
                'url' => route('admin.activeorders.detail', $w->_id), 
            // Робимо різні кольори залежно від статусу
                'color' => $w->status === 'gotowe' ? '#10b981' : ($w->status === 'oplacone' ? '#1f2937' : '#F1511A'),
            ];
        });

        return Inertia::render('Admin/Calendar', [
            'events' => $events
        ]);
    }

    public function updatezamowienie(Request $request, $id)
    {
        $zamowienie = Wizyta::find($id); 

        if ($zamowienie) {
            $zamowienie->status = $request->status;
            $zamowienie->cena = $request->cena;
            $zamowienie->komentarz_mechanika = $request->komentarz_mechanika;
            $zamowienie->save();
        }

        return back()->with('success', 'Zmiany zostały zapisane!');
    }

    public function getactiveorders(){
        $zamowienia = Wizyta::where('mechanik_id', Auth::id())->where('status', '!=', 'oplacone')->latest()->get();
        return Inertia::render('Admin/ActiveOrderList', [
            'zamowienia' => $zamowienia
        ]);
    }

    public function getactiveorderdetail($zamowienie_id){
        $zamowienie = Wizyta::find($zamowienie_id);
        return Inertia::render('Admin/ActiveOrderDetail', [
            'zamowienie' => $zamowienie
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
