<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Announcement;
use App\Models\Assignment;
use App\Models\Attachment;
use App\Models\Comment;
use App\Models\Course;
use App\Models\Material;
use App\Models\Note;
use App\Models\Reminder;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $student = User::factory()->create([
            'email' => 'student@studywave.com',
            'role' => UserRole::STUDENT->value,
        ]);

        $professor = User::factory()->create([
            'email' => 'professor@studywave.com',
            'role' => UserRole::PROFESSOR->value,
        ]);

        $students = User::factory()->count(4)->create([
            'role' => UserRole::STUDENT->value,
        ]);
        $students = $students->push($student);

        $courses = Course::factory()->count(3)->create([
            'created_by' => $professor->id,
        ]);

        foreach ($courses as $course) {
            $course->participants()->attach($professor->id);
            $randomStudents = $students->random(rand(2, 4))->pluck('id');
            $course->participants()->attach($randomStudents);
        }

        $assignments = Assignment::factory()->count(6)->make([
            'created_by' => $professor->id,
        ])->each(function (Assignment $assignment) use ($courses) {
            $assignment->course_id = $courses->random()->id;
            $assignment->save();
        });

        $materials = Material::factory()->count(6)->make([
            'created_by' => $professor->id,
        ])->each(function (Material $material) use ($courses) {
            $material->course_id = $courses->random()->id;
            $material->save();
        });

        $announcements = Announcement::factory()->count(6)->make([
            'created_by' => $professor->id,
        ])->each(function (Announcement $announcement) use ($courses) {
            $announcement->course_id = $courses->random()->id;
            $announcement->save();
        });

        $submissions = Submission::factory()->count(8)->make()->each(function (Submission $submission) use ($assignments, $students) {
            $submission->assignment_id = $assignments->random()->id;
            $submission->submitted_by = $students->random()->id;
            $submission->save();
        });

        foreach ($assignments as $assignment) {
            Attachment::factory()->count(2)->create([
                'attachable_id' => $assignment->id,
                'attachable_type' => Assignment::class,
                'owned_by' => $professor->id,
            ]);

            Comment::factory()->count(2)->create([
                'commentable_id' => $assignment->id,
                'commentable_type' => Assignment::class,
                'created_by' => $students->random()->id,
            ]);
        }

        foreach ($materials as $material) {
            Attachment::factory()->count(2)->create([
                'attachable_id' => $material->id,
                'attachable_type' => Material::class,
                'owned_by' => $professor->id,
            ]);
        }

        foreach ($submissions as $submission) {
            Attachment::factory()->count(1)->create([
                'attachable_id' => $submission->id,
                'attachable_type' => Submission::class,
                'owned_by' => $submission->submitted_by,
            ]);

            Comment::factory()->count(1)->create([
                'commentable_id' => $submission->id,
                'commentable_type' => Submission::class,
                'created_by' => $professor->id,
            ]);
        }

        foreach ($announcements as $announcement) {
            Comment::factory()->count(2)->create([
                'commentable_id' => $announcement->id,
                'commentable_type' => Announcement::class,
                'created_by' => $students->random()->id,
            ]);
        }

        Note::factory()->count(4)->create([
            'created_by' => $student->id,
        ]);

        Reminder::factory()->count(2)->create([
            'created_by' => $student->id,
        ]);
    }
}
