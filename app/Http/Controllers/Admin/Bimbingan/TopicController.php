<?php

namespace App\Http\Controllers\Admin\Bimbingan;

use App\Http\Controllers\Controller;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            return Inertia::render('Auth/Admin/Bimbingan/Topic', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data topic success',
                'topics' => function () use ($request) {
                    $search = $request->input('search');
                    $perPage = $request->input('perPage', 10);
                    $topics = Topic::when($search, function($q) use ($search){
                        $q->where('topic', 'LIKE', "%$search%");
                    })->orderBy('is_visible', 'desc')->orderBy('topic', 'asc')->paginate($perPage);
                    return $topics;
                },
            ], 200);
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
            $validateData = $request->validate([
                'topic' => 'required|string',
                'slug' => 'required|string',
            ]);

            $topic = new Topic();
            $topic->topic = $validateData['topic'];
            $topic->slug = $validateData['slug'];

            $topic->save();
            return redirect()->back();
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
    public function edit(Topic $topic)
    {
        return response()->json(['status' => true, 'statusCode' => 200, "data" => $topic], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Topic $topic)
    {
        try {
            $validateData = $request->validate([
                'topic' => 'string',
                'slug' => 'string',
                'is_visible' => 'boolean'
            ]);

            $topic->update($validateData);
            return redirect()->back();
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function updateVisible(Request $request, Topic $topic)
    {
        try {
            $validateData = $request->validate([
                'is_visible' => 'boolean',
            ]);
            $topic->update($validateData);
            return redirect()->back();

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
            $topic->delete();
            return redirect()->back();
        } catch (ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'topic not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete topic. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}
