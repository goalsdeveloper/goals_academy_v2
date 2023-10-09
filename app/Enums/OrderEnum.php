<?php

namespace App\Enums;

enum OrderEnum: string
{
    case PENDING = 'Pending';
    case SUCCESS = 'Success';
    case FAILED = 'Failed';
}
