<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class WebinarController extends Controller
{
    public function webinar()
    {
        return Inertia::render('Auth/User/Webinar/Webinar');
    }

    public function detailWebinar(string $id)
    {
        return Inertia::render('Auth/User/Webinar/DetailWebinar');
    }
}
