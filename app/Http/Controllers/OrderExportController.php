<?php

namespace App\Http\Controllers;

use App\Exports\OrdersExport;
use App\Models\ProductType;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class OrderExportController extends Controller
{
    public function export(Request $request)
    {
        try {
            $productTypeId = $request->input('product_type_id', 1); // Default ke 1 jika tidak ada input
            $productType = ProductType::find($productTypeId);

            // Nama file yang akan diunduh
            $fileName = 'orders_' . $productType->slug . '_' . now()->format('YmdHis') . '.xlsx';

            // Simpan file ke storage sementara
            Excel::store(new OrdersExport($productTypeId), $fileName, 'local');

            // Path lengkap file yang telah disimpan
            $filePath = storage_path("app/" . $fileName);

            // Berikan respons JSON dengan link unduhan
            return response()->json([
                'success' => true,
                'message' => 'File berhasil diekspor.',
                'download_url' => url("/admin/download-orders?file_name=$fileName"),
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
