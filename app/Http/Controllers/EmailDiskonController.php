<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

class EmailDiskonController extends Controller
{
    public function handler(Request $request)
    {
        // dd($request);
        $email = $request->input('email');
        
        $data = [
            'message' => 'This is Promo Email Test!'
        ];

        Mail::send('emails.email-layout', $data, function(Message $message) use ($email){
            $message->to($email)->subject('Promo Test Email.');
        });

        return redirect()->back()->with('success', 'Email sent successfully');
    }
}
