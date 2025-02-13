<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::latest()->paginate(5);
        return response()->json([
            'status'   => true,
            'services' => $services,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        };

        if ($request->hasFile('image')) {
            $image     = $request->file('image');
            $imageName = time() . '-' . 'Service' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);

            Service::create([
                'title'             => $request->title,
                'slug'              => str::slug($request->title),
                'short_description' => $request->short_description,
                'description'       => $request->description,
                'image'             => $imageName,
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'Service Added!',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status'  => false,
                'message' => 'Service not found',
            ]);
        }

        return response()->json([
            'status'  => true,
            'service' => $service,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function edit($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status'  => false,
                'message' => 'Service not found',
            ]);
        }

        return response()->json([
            'status'  => true,
            'service' => $service,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status'  => false,
                'message' => 'Service Not Found!',
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

            if (File::exists(public_path('images/' . $service->image))) {
                File::delete(public_path('images/' . $service->image));
            }

            $image     = $request->file('image');
            $imageName = time() . '-' . 'Service' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
        } else {
            $imageName = $service->image;
        }

        $service->update([
            'title'             => $request->title,
            'slug'              => str::slug($request->title),
            'short_description' => $request->short_description,
            'description'       => $request->description,
            'image'             => $imageName,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Service Updated!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status'  => false,
                'message' => 'Service Not Found!',
            ]);
        }

        if (File::exists(public_path('images/' . $service->image))) {
            File::delete(public_path('images/' . $service->image));
        }

        $service->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Service Deleted!',
        ]);
    }
}
