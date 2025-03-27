<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class UserExportController extends Controller
{
    public function export(Request $request)
    {
        try {
            $userRole = $request->input('user_role', 'user'); // Default ke 'user' jika tidak ada input

            // Nama file yang akan diunduh
            $fileName = $userRole . '_' . now()->format('YmdHis') . '.xlsx';

            // Simpan file ke storage sementara
            Excel::store(new UsersExport($userRole), $fileName, 'local');

            // Path lengkap file yang telah disimpan
            $filePath = storage_path("app/" . $fileName);

            // Berikan respons JSON dengan link unduhan
            return response()->json([
                'success' => true,
                'message' => 'File berhasil diekspor.',
                'download_url' => url("/admin/download-users?file_name=$fileName"),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengekspor data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function download(Request $request)
    {
        $fileName = $request->query('file_name');
        $filePath = storage_path("app/" . $fileName);

        if (!file_exists($filePath)) {
            return response()->json([
                'success' => false,
                'message' => 'File tidak ditemukan.',
            ], 404);
        }

        return response()->download($filePath)->deleteFileAfterSend(true);
    }
}
