<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request)
    {
        // Validate the request...
        $validator = Validator::make($request->all(),
            [
                'email'    => 'required',
                'password' => 'required',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors(),
            ]);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user  = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status'  => true,
                'id'      => Auth::user()->id,
                'token'   => $token,
                'message' => 'Login successfully',
            ]);
        } else {
            return response()->json([
                'status'  => false,
                'message' => 'Invalid email or password',
            ]);
        }
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'status'  => true,
            'message' => 'Logged out successfully',
        ]);
    }
}
