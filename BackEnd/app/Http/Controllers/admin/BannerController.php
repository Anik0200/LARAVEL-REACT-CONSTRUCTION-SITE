<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BannerController extends Controller
{
    public function banner()
    {
        $banner = Banner::first();

        return response()->json([
            'status' => true,
            'banner' => $banner,
        ]);
    }

    public function updateCreate(Request $request)
    {
        $banner = Banner::first();

        $validator = Validator::make($request->all(), [
            'preHeading' => 'required',
            'heading'    => 'required',
            'subHeading' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        if ($request->hasFile('image')) {
            if (File::exists(public_path('images/' . $banner->image)) && $banner->image != null) {
                File::delete(public_path('images/' . $banner->image));
            }

            $image     = $request->file('image');
            $imageName = time() . '-' . 'banner' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
        } else {
            $imageName = $banner->image ?? 'Hero.jpg';
        }

        Banner::updateOrCreate(
            [
                'id' => 1,
            ],
            [
                'preHeading' => $request->preHeading,
                'heading'    => $request->heading,
                'subHeading' => $request->subHeading,
                'buttonOne'  => $request->buttonOne,
                'buttonTwo'  => $request->buttonTwo,
                'image'      => $imageName,
            ]
        );

        return response()->json([
            'status'  => true,
            'message' => 'Banner Updated!',
        ]);
    }
}
