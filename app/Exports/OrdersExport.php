<?php

namespace App\Exports;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Support\Facades\DB;

class OrdersExport implements FromQuery, WithHeadings, WithMapping
{
    protected $productTypeId;

    public function __construct($productTypeId)
    {
        $this->productTypeId = $productTypeId;
    }

    public function query()
    {
        return Order::query()
        ->selectRaw("
            orders.id AS order_id,
            users.name AS customer_name,
            users.email AS customer_email,
            user_profiles.phone_number AS customer_phone,
            products.name AS product_name,
            payment_methods.name AS payment_method,
            orders.status AS order_status,
            CASE
                WHEN payment_methods.is_price = 0 THEN CONCAT(CAST(IFNULL(payment_methods.admin_fee, 0) AS SIGNED), '%')
                WHEN payment_methods.is_price = 1 THEN CAST(IFNULL(payment_methods.admin_fee, 0) AS SIGNED)
            END AS admin_fee,
            IFNULL(products.promo_price, 0) AS discount,
            (IFNULL(orders.quantity, 0) * IFNULL(orders.unit_price, 0)) AS total_price,
            CAST(((IFNULL(orders.quantity, 0) * IFNULL(orders.unit_price, 0)) - IFNULL(payment_methods.admin_fee, 0)) AS SIGNED) AS revenue,
            orders.created_at AS order_date,
            JSON_UNQUOTE(JSON_EXTRACT(orders.form_result, '$.promo')) AS promo_code
        ")
        ->join('users', 'orders.user_id', '=', 'users.id')
        ->join('user_profiles', 'users.id', '=', 'user_profiles.user_id')
        ->join('products', 'orders.products_id', '=', 'products.id')
        ->join('payment_methods', 'orders.payment_method_id', '=', 'payment_methods.id')
        ->where('products.product_type_id', $this->productTypeId)
        ->orderBy('orders.created_at', 'desc'); // Urutkan berdasarkan tanggal pesanan terbaru
    }

    public function map($order): array
    {
        // Ambil kode promo dari JSON di kolom form_result
        $formResult = json_decode($order->form_result, true);
        $promoCode = $formResult['promo'] ?? 'N/A';

        // Konversi admin_fee agar selalu bernilai numerik
        $adminFee = floatval($order->admin_fee);
        $totalPrice = floatval($order->total_price);

        // Format admin_fee sesuai dengan kondisi
        $formattedAdminFee = $order->is_price == 0
            ? $adminFee
            : $adminFee;

        // Hitung Revenue (Pendapatan) = Total Harga - Biaya Admin
        $revenue = (int) ($totalPrice - $adminFee);

        return [
            $order->order_id,
            $order->customer_name,
            $order->customer_email,
            $order->customer_phone,
            $order->product_name,
            $order->payment_method,
            $order->order_status,
            $formattedAdminFee, // Biaya Admin dengan format yang sesuai
            floatval($order->discount), // Pastikan discount selalu numerik
            $revenue, // Pendapatan sudah dikonversi ke integer
            (int) $totalPrice,
            $order->order_date,
            $promoCode
        ];
    }

    public function headings(): array
    {
        return [
            'Id Pesanan',
            'Nama Pembeli',
            'Email',
            'Telepon',
            'Produk',
            'Pembayaran',
            'Status',
            'Estimasi Admin',
            'Diskon',
            'Estimasi Earnings',
            'Harga Total',
            'Tanggal Pesanan',
            'Kode Promo'
        ];
    }
}
