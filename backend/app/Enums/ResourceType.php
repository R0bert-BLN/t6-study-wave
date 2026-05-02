<?php

declare(strict_types=1);

namespace App\Enums;

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

enum ResourceType: string
{
    case Course = 'courses';
    case User = 'users';
    case Assignment = 'assignments';
    case Announcement = 'announcements';
    case Submission = 'submissions';
    case Material = 'materials';
    case Comment = 'comments';
    case Attachment = 'attachments';
    case Note = 'notes';
    case Reminder = 'reminders';

    public static function modelClass(string $resource): string
    {
        return match ($resource) {
            self::Course->value => Course::class,
            self::User->value => User::class,
            self::Assignment->value => Assignment::class,
            self::Announcement->value => Announcement::class,
            self::Submission->value => Submission::class,
            self::Material->value => Material::class,
            self::Comment->value => Comment::class,
            self::Attachment->value => Attachment::class,
            self::Note->value => Note::class,
            self::Reminder->value => Reminder::class,
        };
    }
}
