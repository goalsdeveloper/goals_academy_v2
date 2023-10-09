<?php

namespace App\Enums;

enum UserRoleEnum: string
{
    case ADMIN = 'Admin';
    case MODERATOR = 'Moderator';
    case TUTOR = 'Tutor';
    case USER = 'User';
}
