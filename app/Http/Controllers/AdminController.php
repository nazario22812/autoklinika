<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Wizyta;
use App\Models\Pytanie;
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
        $zamowieniaCount = Wizyta::where([['status', '!=', 'oplacone'],[ 'status', '!=', 'anulowane']])->latest()->count();
        $ostatnieZamowienia = Wizyta::where('mechanik_id', Auth::id())->where([['status', '!=', 'anulowane'], ['status', '!=', 'oplacone']])->latest()->first();
        $dzisiejszeWizytyCount = Wizyta::where('data_wizyty', Carbon::today()->format('Y-m-d'))
                                   ->where([['status', '!=', 'anulowane'], ['mechanik_id', Auth::id()]])
                                   ->count();
        $historyczneZamowieniaCount = Wizyta::whereIn('status', ['oplacone', 'anulowane'])->count();
        $pytaniaCount = Pytanie::where('status', 'oczekujące')->latest()->count();
        return Inertia::render('Admin/Dashboard', [
            'dzisiejszeWizytyCount' => $dzisiejszeWizytyCount,
            'userCount' => $userCount,
            'zamowieniaCount' => $zamowieniaCount,
            'ostatnieZamowienia' => $ostatnieZamowienia,
            'historyczneZamowieniaCount' => $historyczneZamowieniaCount,
            'pytaniaCount' => $pytaniaCount
        ]);
    }

    public function getallquestions(){
        $questions = Pytanie::latest()->get();
        return Inertia::render('Admin/QuestionList', [
            'questions' => $questions
        ]);
    }

    public function wyslijodpowiedz(Request $request, $id){
        $pytanie = Pytanie::find($id);
        if ($pytanie) {
            $pytanie->odpowiedz = $request->odpowiedz;
            $pytanie->status = 'odpowiedziane';
            $pytanie->mechanik_id = Auth::id();
            $pytanie->save();
        }
        return redirect()->route('admin.questions')->with('success', 'Odpowiedź została wysłana!');
    }

    public function getallusers(){
        $usery = User::latest()->get();

        return Inertia::render('Admin/UserList', [
            'uzytkowniki' => $usery 
        ]);

    }

    public function harmonogram(){
        $wizyty = Wizyta::where([['status', '!=', 'anulowane'], ['mechanik_id', Auth::id()]])->get();

        $events = $wizyty->map(function($w) {
            return [
                'id' => $w->_id, 
                'title' => $w->marka . ' ' . $w->model . ' (' . $w->usluga . ')',
                'start' => $w->data_wizyty . 'T' . $w->godzina_wizyty,
                'url' => route('admin.activeorders.detail', $w->_id), 
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
        $zamowienia = Wizyta::where('mechanik_id', Auth::id())->where([['status', '!=', 'oplacone'], ['status', '!=', 'anulowane']])->latest()->get();
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
        $zamowienia = Wizyta::where([['status', '!=', 'oplacone'],[ 'status', '!=', 'anulowane']])->latest()->get();
    
        return Inertia::render('Admin/ZamowienieList', [
            'zamowienia' => $zamowienia,
        ]);

    }

    public function gethistory(){
        $zamowienia = Wizyta::whereIn('status', ['oplacone', 'anulowane'])->latest()->get();
        return Inertia::render('Admin/Historia', [
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
