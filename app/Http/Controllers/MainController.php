<?php

namespace App\Http\Controllers;

use App\Enums\UserRoleEnum;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MainController extends Controller
{
    public function profilTutor(Request $req)
    {
        $skill_query = $req->skill;
        $tutors = User::where('user_role', UserRoleEnum::TUTOR->value)
            ->when($skill_query, function ($q) use ($skill_query) {
                return $q->whereHas('skills', function ($q) use ($skill_query) {
                    $q->where('name', 'like', "%$skill_query%");
                });
            })->with('skills', 'profile')->paginate(5);
        if ($req->wantsJson()) {
            return response()->json([
                'tutors' => $tutors,
                'skill' => $req->skill ?? "",
            ]);
        }
        $skill = $req->skill ?? "";
        return Inertia::render('Main/ProfilTutor', [
            'tutors' => $tutors,
            'skill' => $skill,
        ]);
    }
}
