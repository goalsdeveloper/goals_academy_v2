<?php

namespace App\Exports;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

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
            orders.order_code AS order_id,
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
            JSON_UNQUOTE(JSON_EXTRACT(orders.form_result, '$.init_price')) AS init_price,
            JSON_UNQUOTE(JSON_EXTRACT(orders.form_result, '$.discount')) AS discount,
            (IFNULL(orders.quantity, 0) * IFNULL(orders.unit_price, 0)) AS total_price,
            CAST(((IFNULL(orders.quantity, 0) * IFNULL(orders.unit_price, 0)) - IFNULL(JSON_UNQUOTE(JSON_EXTRACT(orders.form_result, '$.admin')), 0)) AS SIGNED) AS revenue,
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
        // Pastikan discount tidak kosong, jika null maka ubah jadi 0
        $discount = $order->discount ?? 0;

        // Kode Promo
        $promoCode = $order->promo_code != 'null' ? $order->promo_code : '';

        return [
            $order->order_id,
            $order->customer_name,
            $order->customer_email,
            $order->customer_phone,
            $order->product_name,
            $order->payment_method,
            $order->order_status,
            (int) $order->init_price,
            $discount,
            $order->admin_fee,
            (int) floatval($order->total_price),
            (int) $order->revenue,
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
            'Harga Produk',
            'Diskon',
            'Estimasi Admin',
            'Harga Total',
            'Estimasi Earnings',
            'Tanggal Pesanan',
            'Kode Promo'
        ];
    }
}
