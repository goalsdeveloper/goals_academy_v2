<?php

namespace App\Enums;

enum UserRoleEnum: string
{
    case ADMIN = 'admin';
    case MODERATOR = 'moderator';
    case TUTOR = 'tutor';
    case USER = 'user';
}
