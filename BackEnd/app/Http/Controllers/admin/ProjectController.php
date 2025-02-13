<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::latest()->paginate(5);
        return response()->json([
            'status'   => true,
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'title' => 'required|max:100',
                'image' => 'required|image|mimes:jpeg,png,jpg',
            ],
            [
                'title.required' => 'The Title Field Is Required.',
                'title.max'      => 'The Title May Not Be Greater Than 100 Characters.',
                'image.required' => 'The Image Field Is Required.',
                'image.image'    => 'The Image Must Be An Image.',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        if ($request->hasFile('image')) {
            $image     = $request->file('image');
            $imageName = time() . '-' . 'project' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);

            Project::create([
                'title'             => $request->title,
                'slug'              => str::slug($request->title),
                'short_description' => $request->short_description,
                'description'       => $request->description,
                'image'             => $imageName,
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'Project Added!',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status'  => false,
                'message' => 'Project not found',
            ]);
        }

        return response()->json([
            'status'  => true,
            'project' => $project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status'  => false,
                'message' => 'Project not found',
            ]);
        }

        return response()->json([
            'status'  => true,
            'project' => $project,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status'  => false,
                'message' => 'Project Not Found!',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        };

        if ($request->hasFile('image')) {

            if (File::exists(public_path('images/' . $project->image))) {
                File::delete(public_path('images/' . $project->image));
            }

            $image     = $request->file('image');
            $imageName = time() . '-' . 'project' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
        } else {
            $imageName = $project->image;
        }

        $project->update([
            'title'             => $request->title,
            'slug'              => str::slug($request->title),
            'short_description' => $request->short_description,
            'description'       => $request->description,
            'image'             => $imageName,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Project Updated!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status'  => false,
                'message' => 'Project Not Found!',
            ]);
        }

        if (File::exists(public_path('images/' . $project->image))) {
            File::delete(public_path('images/' . $project->image));
        }

        $project->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Project Deleted!',
        ]);
    }
}
