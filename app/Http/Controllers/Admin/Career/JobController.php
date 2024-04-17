<?php

namespace App\Http\Controllers\Admin\Career;

use App\Models\Job;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Division;
use App\Models\Experience;
use App\Models\TypeJob;
use App\Models\WorkSystem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Auth::user()->user_role == "admin") {
            $search = $request->input('search');
            $perPage = $request->input('perPage', 10);

            $query = Job::with('division', 'workSystem', 'typeJob');


            if ($search) {
                $query->where('title', 'LIKE', "%$search%");
            }

            $jobs = $query->paginate($perPage);
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data job success', 'data' => $jobs], 200);

            // return Inertia::render('Auth/Admin/Career/Job', ['status' => true, 'statusCode' => 200, 'message' => 'get data job success', 'data' => $jobs], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (Auth::user()->user_role == "admin") {
            $divisions = Division::get();
            $cities = City::get();
            $work_systems = WorkSystem::get();
            $type_jobs = TypeJob::get();
            $experiences = Experience::get();
            $type_jobs = TypeJob::get();
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data job success', 'data' => [
                'divisions' => $divisions,
                'cities' => $cities,
                'work_systems' => $work_systems,
                'type_jobs' => $type_jobs,
                'experiences' => $experiences,
            ]], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                // Validate the incoming request data
                $validatedData = $request->validate([
                    'title' => 'required|string',
                    'slug' => 'required|string',
                    'image' => 'required|image',
                    'requirement' => 'required|string',
                    'responsibility' => 'required|string',
                    'division_id' => 'required|exists:divisions,id',
                    'city_id' => 'required|exists:cities,id',
                    'work_system_id' => 'required|exists:work_systems,id',
                    'type_job_id' => 'required|exists:type_jobs,id',
                    'experience_id' => 'required|exists:experiences,id',
                    'education_id' => 'required|exists:educations,id',
                ]);


                $job = new Job();
                $job->title = $validatedData['title'];
                $job->slug = $validatedData['slug'];
                // $job->image = $validatedData['image'];
                $job->requirement = $validatedData['requirement'];
                $job->responsibility = $validatedData['responsibility'];
                $job->division_id = $validatedData['division_id'];
                $job->city_id = $validatedData['city_id'];
                $job->work_system_id = $validatedData['work_system_id'];
                $job->type_job_id = $validatedData['type_job_id'];
                $job->experience_id = $validatedData['experience_id'];
                $job->education_id = $validatedData['education_id'];

                if ($request->File('image')) {
                    $job->image = $request->file('image')->store('resource/img/career/job/');
                }


                $job->save();


                return response()->json([
                    'status' => true,
                    'statusCode' => 201,
                    'message' => 'Job created successfully',
                    'data' => $job
                ], 201);
            } else {
                abort(403);
            }
        } catch (ValidationException $e) {

            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Failed to create job',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An unexpected error occurred',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job)
    {
        if (Auth::user()->user_role == "admin") {
            $job->load('division', 'city', 'workSystem', 'typeJob', 'experience', 'education')->get();
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data job success', 'data' => $job], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job $job)
    {
        if (Auth::user()->user_role == "admin") {
            $divisions = Division::get();
            $cities = City::get();
            $work_systems = WorkSystem::get();
            $type_jobs = TypeJob::get();
            $experiences = Experience::get();
            $type_jobs = TypeJob::get();
            $job->load('division', 'city', 'workSystem', 'typeJob', 'experience', 'education')->get();
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => [
                'job' => $job,
                'divisions' => $divisions,
                'cities' => $cities,
                'work_systems' => $work_systems,
                'type_jobs' => $type_jobs,
                'experiences' => $experiences,
            ]], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Job $job)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $validatedData = $request->validate([
                    'title' => 'string',
                    'slug' => 'string',
                    'image' => 'image',
                    'requirement' => 'string',
                    'responsibility' => 'string',
                    'division_id' => 'exists:divisions,id',
                    'city_id' => 'exists:cities,id',
                    'work_system_id' => 'exists:work_systems,id',
                    'type_job_id' => 'exists:type_jobs,id',
                    'experience_id' => 'exists:experiences,id',
                    'education_id' => 'exists:educations,id',
                ]);

                if ($request->hasFile('image')) {
                    // Hapus foto lama jika ada
                    if ($job->image) {
                        Storage::delete($job->image);
                    }
                    $validatedData['image'] = $request->file('image')->store('resource/img/career/job/');
                }

                $job->update($validatedData);

                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'Job updated successfully',
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while processing your request.', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                if ($job->image) {
                    Storage::delete($job->image);
                }
                $job->delete();
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete job success'], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while processing your request.', 'error' => $e->getMessage()], 500);
        }
    }

}
