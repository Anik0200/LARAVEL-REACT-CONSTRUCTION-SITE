<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Blog;

class BlogController extends Controller
{
    public function fetchAllBlogs()
    {
        $blog = Blog::latest()->paginate(6);

        return response()->json([
            'blog' => $blog,
        ]);
    }

    public function fetchFourBlogs()
    {
        $blog = Blog::take(3)->get();

        return response()->json([
            'blog' => $blog,
        ]);
    }

    public function fetchSingleBlog($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'status'  => false,
                'message' => 'Blog Not Found!',
            ]);
        }

        return response()->json([
            'status' => true,
            'blog'   => $blog,
        ]);
    }
}
