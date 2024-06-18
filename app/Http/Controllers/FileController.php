<?php

namespace App\Http\Controllers;

use App\Enums\UserRoleEnum;
use App\Models\FileUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function downloadFileCourse(Request $request, string $fileName)
    {
        $user = Auth::user();
        $file = FileUpload::where('filename', $fileName)->first();
        if (!$file) {
            return abort(404);
        }
        switch ($user->user_role) {
            case UserRoleEnum::TUTOR:
                if ($user->id != $file->course->tutor_id) {
                    return abort(403);
                }
                break;

            case UserRoleEnum::USER:
                if ($user->id != $file->course->user_id) {
                    return abort(403);
                }
                break;
        }
        if(!Storage::exists($file->path)){
            return abort(404);
        }
        return Storage::download($file->path, $file->name);
    }
}
