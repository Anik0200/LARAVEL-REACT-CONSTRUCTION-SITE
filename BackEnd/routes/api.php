<?php

use App\Http\Controllers\admin\BannerController;
use App\Http\Controllers\admin\BlogController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TestiController;
use App\Http\Controllers\admin\WhyController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\frontend\BannerController as FrontendBannerController;
use App\Http\Controllers\frontend\BlogController as FrontendBlogController;
use App\Http\Controllers\frontend\ProjectController as FrontendProjectController;
use App\Http\Controllers\frontend\ServiceController as FrontendServiceController;
use App\Http\Controllers\frontend\TestiController as FrontendTestiController;
use App\Http\Controllers\frontend\WhyController as FrontendWhyController;
use Illuminate\Support\Facades\Route;

Route::post('ahuthenticate', [AuthenticationController::class, 'authenticate']);
Route::post('contact-mail', [ContactController::class, 'contactMail']);

Route::prefix('frontend/')->group(function () {
    // FrontEnd Serivice Routes
    Route::get('fetch-all-service', [FrontendServiceController::class, 'fetchAllServices']);
    Route::get('fetch-four-service', [FrontendServiceController::class, 'fetchFourServices']);
    Route::get('fetch-single-service/{id}', [FrontendServiceController::class, 'fetchSingleService']);

    // FrontEnd Project Routes
    Route::get('fetch-all-project', [FrontendProjectController::class, 'fetchAllProjects']);
    Route::get('fetch-four-project', [FrontendProjectController::class, 'fetchFourProjects']);
    Route::get('fetch-single-project/{id}', [FrontendProjectController::class, 'fetchSingleProject']);

    // FrontEnd Blog Routes
    Route::get('fetch-all-blog', [FrontendBlogController::class, 'fetchAllBlogs']);
    Route::get('fetch-four-blog', [FrontendBlogController::class, 'fetchFourBlogs']);
    Route::get('fetch-single-blog/{id}', [FrontendBlogController::class, 'fetchSingleBlog']);

    // FrontEnd Banner Routes
    Route::get('fetch-all-banner', [FrontendBannerController::class, 'fetchAllBanners']);

    // FrontEnd Why Routes
    Route::get('fetch-all-why', [FrontendWhyController::class, 'fetchAllWhy']);

    // FrontEnd Testimonial Routes
    Route::get('fetch-all-testi', [FrontendTestiController::class, 'fetchAllTesti']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Basic Routes
    Route::get('dashboard', [DashboardController::class, 'dashboard']);
    Route::get('logout', [AuthenticationController::class, 'logout']);

    // Serivice Routes
    Route::resource('service', ServiceController::class);

    // Project Routes
    Route::resource('project', ProjectController::class);

    // Blog Routes
    Route::resource('blog', BlogController::class);

    // Banner Routes
    Route::get('banner', [BannerController::class, 'banner']);
    Route::post('banner/updateCreate', [BannerController::class, 'updateCreate']);

    // Why Routes
    Route::resource('why', WhyController::class);

    // Testimonial Routes
    Route::resource('testi', TestiController::class);
});
