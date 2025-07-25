<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class UsersExport implements FromQuery, WithHeadings, WithMapping
{
    protected $userRole;

    public function __construct($userRole)
    {
        $this->userRole = $userRole;
    }

    public function query()
    {
        return User::query('
            users.name AS name
            users.username AS username
            users.email AS email
            user_profiles.phone_number AS phone_number
            user_profiles.university AS university
            user_profiles.faculty AS faculty
            user_profiles.major AS major
            user_profiles.rumpun AS rumpun
        ')
        ->join('user_profiles', 'users.id', '=', 'user_profiles.user_id')
        ->where('users.user_role', $this->userRole)
        ->orderBy('users.username');
    }

    public function map($user): array
    {
        return [
            (string) $user->name,
            (string) $user->username,
            (string) $user->email,
            (string) $user->phone_number,
            (string) $user->university,
            (string) $user->faculty,
            (string) $user->major,
            (string) $user->rumpun
        ];
    }

    public function headings(): array
    {
        return [
            'Nama',
            'Username',
            'Email',
            'Telepon',
            'Universitas',
            'Fakultas',
            'Jurusan',
            'Rumpun'
        ];
    }
}
