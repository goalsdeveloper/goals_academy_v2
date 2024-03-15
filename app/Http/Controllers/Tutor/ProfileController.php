<?php

namespace App\Http\Controllers\Tutor;

use App\Enums\SkillEnum;
use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $profile = $user->load('profile', 'skills');
        $softSkills = Skill::where('category', SkillEnum::SOFTFKILL)->get();
        $hardSkills = Skill::where('category', SkillEnum::HARDSKILL)->get();
        return response()->json([
            'profile' => $profile,
            'hardSkills' => $hardSkills,
            'softSkills' => $softSkills,
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $newRequest = [];
        try {
            $profile_image = $request->file('profile_image');
            $skills = $request['skills'];
            if ($profile_image) {
                if ($user->profile->profile_image != null) {
                    Storage::delete($user->profile->profile_image);
                }
                $fileName = Str::random(4) . '_' . time() . '.' . $profile_image->extension();
                $path = Storage::putFileAs('user_profiles', $profile_image, $fileName);
                $newRequest = $request->except('profile_image');
                $newRequest['profile_image'] = $path;
            }
            if ($skills) {
                User::find($user->id)->skills()->detach();
                $user->skills()->attach($skills);
            }
            $user->profile->update($newRequest);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'failed',
                'messages' => $th->getMessage(),
            ]);
        }
        return response()->json([
            'status' => 'success',
            'messages' => 'Update Profile Berhasil',
        ]);

    }
}
