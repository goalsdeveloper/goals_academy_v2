<?php

namespace App\Http\Controllers\Admin\Career;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Support\Facades\Auth;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Auth::user()->user_role == "admin") {
            $search = $request->input('search');
            $perPage = $request->input('perPage', 10);

            $query = Participant::with('job:id,city_id,education_id', 'job.city', 'job.education');


            if ($search) {
                $query->where('name', 'LIKE', "%$search%");
            }

            $participants = $query->paginate($perPage);
            // return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data participants success', 'data' => $participants], 200);

            return Inertia::render('Auth/Admin/Career/Participant');
        } else {
            abort(403);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
