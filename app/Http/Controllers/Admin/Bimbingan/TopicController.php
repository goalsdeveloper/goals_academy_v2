<?php

namespace App\Http\Controllers\Admin\Bimbingan;

use App\Http\Controllers\Controller;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $search = $request->input('search');
                $perPage = $request->input('perPage', 10);

                $query = Topic::query();

                if ($search) {
                    $query->where('topic', 'LIKE', "%$search%");
                }

                $topics = $query->paginate($perPage);

                return Inertia::render('Auth/Admin/Bimbingan/Topic', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data topic success',
                    'data' => $topics,
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to retrieve data. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
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
        try {
            if (Auth::user()->user_role == "admin") {
                $validateData = $request->validate([
                    'topic' => 'required|string',
                    'slug' => 'required|string',
                ]);

                $topic = new Topic();
                $topic->topic = $validateData['topic'];
                $topic->slug = $validateData['slug'];

                $topic->save();

                return response()->json(['status' => true, 'statusCode' => 201, 'message' => 'create topic success'], 201);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
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
    public function update(Request $request, Topic $topic)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $validateData = $request->validate([
                    'topic' => 'string',
                    'slug' => 'string',

                ]);

                $topic->update($validateData);
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update topic success'], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $topic->delete();
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete topic success'], 200);
            } else {
                abort(403);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'topic not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete topic. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}
