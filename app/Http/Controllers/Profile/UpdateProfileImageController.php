<?php

namespace App\Http\Controllers\Profile;

use Exception;
use Nette\Utils\Image;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UpdateProfileImageController extends Controller
{
    public function updateImage(Request $request)
    {
        // dd($request->image);
        $user = User::where('id', Auth::user()->id)->with('profile')->first();
        $oldImage = $user->profile->profile_image;

        if ($oldImage) {
            Storage::disk('public')->delete($oldImage);
        }

        try {
            $image = $request->image;
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            $fileName = 'usrProfile' . $user->id . time() . '.jpeg';
            $path = storage_path('/app/public/profile_image/' . $fileName);

            file_put_contents($path, $image);
            $user->profile->update([
                'profile_image' => 'profile_image/' . $fileName
            ]);
            return back();
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
