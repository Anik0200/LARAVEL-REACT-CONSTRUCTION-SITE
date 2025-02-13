<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Banner;

class BannerController extends Controller
{
    public function fetchAllBanners()
    {
        $banner = Banner::first();

        return response()->json([
            'status' => true,
            'banner' => $banner,
        ]);
    }
}
