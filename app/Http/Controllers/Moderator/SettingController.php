<?php

namespace App\Http\Controllers\Moderator;

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
        $user = User::with('skills', 'profile')->where('id', Auth::user()->id)->first();
        return Inertia::render('Auth/Moderator/Setting/Setting', [
            'skills' => $skill,
            'user' => $user,
        ]);
    }

    public function update (Request $request)
    {
        try {
            $user = Auth::user();
            $validatedData = $request->validate([
                'name' => 'string',
                'username' => 'string',
                'phone_number' => 'string',
                'university' => 'string',
                'major' => 'string',
                'linkedin_url' => 'string',
                'skills' => 'array',
                'skills.*' => 'exists:skills,id',
                'profile_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            $user->update($validatedData);

            if ($request->has(['phone_number', 'university', 'major', 'linkedin_url'])) {
                $user->profile->update($validatedData);
            }

            $user->skills()->detach();
            $user->skills()->attach($validatedData['skills']);

            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update success'], 200);

        } catch (ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => $e->getMessage()], 500);
        }
    }
}

