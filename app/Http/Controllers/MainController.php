<?php

namespace App\Http\Controllers;

use App\Enums\UserRoleEnum;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MainController extends Controller
{
    public function profilTutor (Request $req) {
        return Inertia::render('Main/ProfilTutor', [
            'tutors' => function () use($req) {
                $skill_query = $req->skill;
                $tutors = User::where('user_role', UserRoleEnum::TUTOR->value)
                ->when($skill_query, function($q) use($skill_query) {
                    return $q->whereHas('skills', function($q) use($skill_query) {
                        $q->where('name', 'like', "%$skill_query%");
                    });
                })->with('skills', 'profile')->paginate(5);
                // dd($tutors);
                return $tutors;
            },
            'skill' => function () use($req){
                return $req->skill ?? "";
            }
        ]);
    }
}
