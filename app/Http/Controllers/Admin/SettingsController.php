<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OverviewController extends Controller
{
    public function index ()
    {
        dd(Auth::user());
    }
}

