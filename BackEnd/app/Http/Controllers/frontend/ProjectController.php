<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Project;

class ProjectController extends Controller
{
    public function fetchAllProjects()
    {
        $project = Project::latest()->paginate(6);

        return response()->json([
            'project' => $project,
        ]);
    }

    public function fetchFourProjects()
    {
        $project = Project::take(4)->get();

        return response()->json([
            'project' => $project,
        ]);
    }

    public function fetchSingleProject($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status'  => false,
                'message' => 'Project Not Found!',
            ]);
        }

        return response()->json([
            'status'  => true,
            'project' => $project,
        ]);
    }
}
