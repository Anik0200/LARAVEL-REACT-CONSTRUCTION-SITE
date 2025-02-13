<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Testi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class TestiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testis = Testi::latest()->paginate(5);
        return response()->json([
            'status' => true,
            'testis' => $testis,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'required|max:100',
            'subTitle'    => 'required|max:100',
            'description' => 'required',
            'image'       => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        if ($request->hasFile('image')) {
            $image     = $request->file('image');
            $imageName = time() . '-' . 'testi' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);

            Testi::create([
                'title'       => $request->title,
                'subTitle'    => $request->subTitle,
                'description' => $request->description,
                'image'       => $imageName,
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'Testimonial Created!',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $testi = Testi::find($id);

        if (!$testi) {
            return response()->json([
                'status' => false,
                'error'  => 'Testimonial Not Found!',
            ]);
        }

        return response()->json([
            'status' => true,
            'teati'  => $testi,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $testi = Testi::find($id);

        if (!$testi) {
            return response()->json([
                'status' => false,
                'error'  => 'Testimonial Not Found!',
            ]);
        }

        return response()->json([
            'status' => true,
            'testi'  => $testi,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $testi = Testi::find($id);

        if (!$testi) {
            return response()->json([
                'status' => false,
                'error'  => 'Testimonial Not Found!',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'title'       => 'required|max:100',
            'subTitle'    => 'required|max:100',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        if ($request->hasFile('image')) {

            if (File::exists(public_path('images/' . $testi->image))) {
                File::delete(public_path('images/' . $testi->image));
            }

            $image     = $request->file('image');
            $imageName = time() . '-' . 'testi' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
        } else {
            $imageName = $testi->image;
        }

        $testi->update([
            'title'       => $request->title,
            'subTitle'    => $request->subTitle,
            'description' => $request->description,
            'image'       => $imageName,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Testimonial Updated!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $testi = Testi::find($id);

        if (!$testi) {
            return response()->json([
                'status' => false,
                'error'  => 'Testimonial Not Found!',
            ]);
        }

        if (File::exists(public_path('images/' . $testi->image))) {
            File::delete(public_path('images/' . $testi->image));
        }

        $testi->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Testimonial Deleted!',
        ]);
    }
}
