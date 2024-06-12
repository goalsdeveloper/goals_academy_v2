<?php

namespace App\Enums;

enum CourseStatusEnum: string
{
    case ONGOING = 'berjalan';
    case SUCCESS = 'selesai';
    case CANCEL = 'batal';
    case WAITING = 'menunggu';
}
