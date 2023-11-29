<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $this->getUserWithProfile($request),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'csrf_token' => csrf_token(),
        ];
        // return array_merge(parent::share($request), [
        //     'auth' => [
        //         'user' => $request->user()
        //     ]
        // ]);
    }
    protected function getUserWithProfile(Request $request)
    {
        $user = $request->user();

        if ($user) {
            // Load the 'profile' relation along with the user
            $user->load('profile');
        }

        return $user;
    }
}
