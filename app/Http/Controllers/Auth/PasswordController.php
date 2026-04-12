<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\In;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
        'password' => [
            'required', 
            'confirmed',
            Password::min(8) 
                ->letters()   
                ->mixedCase()
                ->numbers()   
                ->symbols()   
            ], 
        ]);

        $email = session('password_reset_email');
    
        if (!$email) {
            return redirect()->route('password.request')
                ->withErrors(['email' => 'Session expired. Please try again.']);
        }

        $user = User::where('email', $email)->first();

        if ($user) {
            $user->password = Hash::make($validated['password']);
            $user->save();

            session()->forget('password_reset_email');
            session()->forget('reset_code');

            return redirect()->route('login')->with('status', 'Password updated successfully.');
        }

        return back()->withErrors(['email' => 'User not found.']);
    }

    public function generateResetCode(Request $request): RedirectResponse
    {   

        $validated = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);
        $code = rand(100000, 999999);

        session(['password_reset_code' => $code, 'password_reset_email' => $validated['email']]);
        Mail::to($validated['email'])->send(new \App\Mail\OrderShipped($code));
        return redirect()->route('password.code')->with('status', 'A password reset code has been sent to your email address.');
    }

    public function codeforgotPassword(Request $request): Response
    {
        
        return Inertia::render('Auth/CodePasswordReset', [
            'status' => session('status'),
        ]);
        
    }

    public function verifyCode(Request $request) : RedirectResponse{
        $request->validate([
            'code' => ['required', 'digits:6'],
        ]);

        $wprowadzonyKod = $request->input('code');
        $sprawdzonycode = session('password_reset_code');
        if ($wprowadzonyKod == $sprawdzonycode) {
            return redirect()->route('password.reset');
        }
        else {
            return redirect()->back()->withErrors(['code' => 'Invalid code. Please try again.']);
        }
        
    }
}
