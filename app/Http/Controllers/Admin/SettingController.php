<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Skill;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    public function index ()
    {
        $skill = Skill::get();
        $user = User::with('skills')->where('id', Auth::user()->id)->first();
        return Inertia::render('Auth/Admin/Setting/Setting', [
            'skills' => $skill,
            'user' => $user,
        ]);
    }
}

