<?php

namespace App\Models;

use Exception;
use Illuminate\Support\Facades\Http;

class Moodle
{
    protected $token, $domain;
    public function __construct()
    {
        $this->token = env('MOODLE_TOKEN');
        $this->domain = env('MOODLE_DOMAIN');
    }

    public function auth_request(User $user,$data = []): object
    {
        $param = [
            'user' => [
                'email' => $user->email,
                'username' => $user->username,
                'firstname' => $user->name, // You will not need this parameter, if you are not creating/updating users
                'lastname' => 'User', // You will not need this parameter, if you are not creating/updating users
            ],
            'wstoken' => $this->token,
            'wsfunction' => 'auth_userkey_request_login_url',
            'moodlewsrestformat' => 'json',
        ];
        $param = array_merge($param, $data);
        $serverurl = $this->domain . '/webservice/rest/server.php' . '?' . http_build_query($param);
        $res = Http::post($serverurl);
        $res = json_decode($res);
        if (isset($res->exception)) {
                throw new Exception("errorCode: {$res->errorcode}, message: {$res->message}");
        }
        return $res;
    }

    private function web_service_request($data = [], string $functionName)
    {
        $param = [
            'wstoken' => env('MOODLE_WEBSERVICE_TOKEN'),
            'wsfunction' => $functionName,
            'moodlewsrestformat' => 'json',
        ];
        $param = array_merge($param, $data);
        $serverurl = $this->domain . '/webservice/rest/server.php' . '?' . http_build_query($param);
        $res = Http::post($serverurl);
        if ($res != null) {
            $res = json_decode($res);
            if (isset($res->exception)) {
                throw new Exception("errorCode: {$res->errorcode}, message: {$res->message}");
            }
            return $res;
        }
        return $res;
    }

    public function get_courses(array $param)
    {
        return $this->web_service_request($param, 'core_course_get_courses_by_field');
    }

    public function get_users(array $param)
    {
        return $this->web_service_request($param, 'core_user_get_users');
    }

    public function enrol_user(array $param)
    {
        return $this->web_service_request($param, 'enrol_manual_enrol_users');
    }

    public function add_user_to_cohort(string $username)
    {
        $param = [
            'members' => [
                0 => [
                    'cohorttype' => [
                        'type' => 'id',
                        'value' => '1',
                    ],
                    'usertype' => [
                        'type' => 'username',
                        'value' => $username,
                    ]
                ]
            ]
        ];
        return $this->web_service_request($param, 'core_cohort_add_cohort_members');
    }

    public function delete_user_from_cohort(int $userid)
    {
        $param = [
            'members' => [
                0 => [
                    'cohortid' => '1',
                    'userid' => $userid,
                ]
            ]
        ];
        return $this->web_service_request($param, 'core_cohort_delete_cohort_members');
    }
}
