<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Why;

class WhyController extends Controller
{
    public function fetchAllWhy()
    {
        $whys = Why::latest()->take(3)->get();
        return response()->json([
            'status' => true,
            'whys'   => $whys,
        ]);
    }
}
