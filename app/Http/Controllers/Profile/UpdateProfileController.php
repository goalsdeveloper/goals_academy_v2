<?php

namespace App\Http\Controllers\Profile;

use App\Models\User;
use Inertia\Inertia;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UpdateProfileController extends Controller
{
    public function index()
    {
        $user = User::where('id', Auth::user()->id)->with('profile')->first();

        return Inertia::render('Auth/User/Pengaturan/Index', [
            'userData' => $user,
            'profileData' => $user->profile,
        ]);
    }

    public function ubahProfil()
    {
        $user = User::where('id', Auth::user()->id)->with('profile')->first();
        return Inertia::render('Auth/User/Pengaturan/UbahProfil', [
            'userData' => $user,
            'profileData' => $user->profile,
        ]);
    }

    public function store(Request $request)
    {
        $user = User::where('id', Auth::user()->id)->with('profile')->first();
        // $validateData = $request->validate([
        //     'username' => 'required|unique:users,username,' . Auth::user()->id . 'id',
        //     'name' => 'required|max:255',
        //     'phone_number' => 'required|numeric|max:15',
        //     'university' => 'required|max:255',
        //     'faculty' => 'required|max:255',
        //     'major' => 'required|max:255',
        //     'referral' => 'sometimes'
        // ]);

        if (
            $user->username === $request['username'] &&
            $user->name === $request['name'] &&
            $user->profile->phone_number === $request['phone_number'] &&
            $user->profile->university === $request['university'] &&
            $user->profile->faculty === $request['faculty'] &&
            $user->profile->major === $request['major'] &&
            $user->profile->rumpun === $request['rumpun']
        ) {
            return back();
        }

        User::where('id', $user->id)->update([
            'username' => $request['username'],
            'name' => $request['name']
        ]);
        UserProfile::where('user_id', $user->id)->update([
            'phone_number' => $request['phone_number'],
            'university' => $request['university'],
            'faculty' => $request['faculty'],
            'major' => $request['major'],
            'rumpun' => $request['rumpun']
        ]);

        return redirect()->back();
    }
}
