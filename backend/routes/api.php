<?php

declare(strict_types=1);

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ReminderController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::resource('/users', UserController::class)->only(['index', 'show', 'update', 'destroy']);
    Route::resource('/courses', CourseController::class);
    Route::resource('reminders', ReminderController::class);
    Route::resource('/assignments', AssignmentController::class);
    Route::resource('/notes', NoteController::class);
    Route::resource('/comments', CommentController::class);
    Route::resource('/submissions', SubmissionController::class);
    Route::resource('/announcements', AnnouncementController::class);
    Route::resource('/materials', MaterialController::class);
    Route::resource('/attachments', AttachmentController::class);
});
