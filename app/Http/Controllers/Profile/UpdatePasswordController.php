<?php

namespace App\Http\Controllers\Profile;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UpdatePasswordController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/User/Pengaturan/UbahPassword');
    }

    public function store(Request $request)
    {
        $validateData = $request->validate([
            'old_password' => 'required|min:8|max:255',
            'new_password' => 'required|min:8|max:255',
            'validation_password' => 'required|min:8|max:255',
        ]);
        $user = Auth::user();
        $check = Hash::check($validateData['old_password'], $user->password);

        if (!$check) {
            return back()->with('checkOldFailed', 'Password lama tidak sama!');
        }
        if ($validateData['new_password'] != $validateData['validation_password']) {
            return back()->with('invalidPassword', 'Password tidak sama, silahkan cek kembali!');
        } else {
            $data = User::find($user->id);
            $data->password = Hash::make($validateData['new_password']);
            $data->save();

            Auth::logout();
            return redirect()->route('auth.index');
        }
    }
}
