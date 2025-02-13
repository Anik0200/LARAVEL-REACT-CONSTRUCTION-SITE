<?php

namespace App\Http\Controllers\frontend;

use App\Models\Testi;
use App\Http\Controllers\Controller;

class TestiController extends Controller
{
    public function fetchAllTesti()
    {
        $testis = Testi::latest()->get();
        return response()->json([
            'status' => true,
            'testis' => $testis,
        ]);
    }
}
