<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EmailDiskonController extends Controller
{
    public function handler(Request $request)
    {
        // dd($request);
        $email = $request->validate([
            'email' => 'required|email:dns'
        ]);
        
        $data = [
            'message' => 'This is Promo Email Test!'
        ];

        Mail::send('email.promo', $data, function (Message $message) use ($email) {
            $message->to($email['email'])->subject('Promo Test Email.');
        });

        Log::info("Email sent successfully to {$email['email']}", ['email' => $email['email']]);

        return redirect()->back()->with('success', 'Email sent successfully');
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email tidak bisa kosong',
        ];
    }
}
