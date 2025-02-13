<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Why;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class WhyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $whys = Why::latest()->paginate(5);
        return response()->json([
            'status' => true,
            'whys'   => $whys,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'required|max:100',
            'image'       => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        if ($request->hasFile('image')) {
            $image     = $request->file('image');
            $imageName = time() . '-' . 'why' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);

            Why::create([
                'title'       => $request->title,
                'image'       => $imageName,
                'description' => $request->description,
                'slug'        => str::slug($request->title),
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'Why Added!',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $why = Why::find($id);

        if (!$why) {
            return response()->json([
                'status' => false,
                'error'  => 'Why Not Found!',
            ]);
        }

        return response()->json([
            'status' => true,
            'why'    => $why,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $why = Why::find($id);

        if (!$why) {
            return response()->json([
                'status' => false,
                'error'  => 'Why Not Found!',
            ]);
        }

        return response()->json([
            'status' => true,
            'why'    => $why,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $why = Why::find($id);

        if (!$why) {
            return response()->json([
                'status' => false,
                'error'  => 'Why Not Found!',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'title'       => 'required|max:100',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        if ($request->hasFile('image')) {

            if (File::exists(public_path('images/' . $why->image))) {
                File::delete(public_path('images/' . $why->image));
            }

            $image     = $request->file('image');
            $imageName = time() . '-' . 'why' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
        } else {
            $imageName = $why->image;
        }

        $why->update([
            'title'       => $request->title,
            'image'       => $imageName,
            'description' => $request->description,
            'slug'        => str::slug($request->title),
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Why Updated!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $why = Why::find($id);

        if (!$why) {
            return response()->json([
                'status' => false,
                'error'  => 'Why Not Found!',
            ]);
        }

        if (File::exists(public_path('images/' . $why->image))) {
            File::delete(public_path('images/' . $why->image));
        }

        $why->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Why Deleted!',
        ]);
    }
}
