<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Service;

class ServiceController extends Controller
{
    public function fetchAllServices()
    {
        $service = Service::latest()->paginate(6);

        return response()->json([
            'service' => $service,
        ]);
    }

    public function fetchFourServices()
    {
        $service = Service::take(4)->get();

        return response()->json([
            'service' => $service,
        ]);
    }

    public function fetchSingleService($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status'  => false,
                'message' => 'Service Not Found!',
            ]);
        }

        return response()->json([
            'status'  => true,
            'service' => $service,
        ]);
    }
}
