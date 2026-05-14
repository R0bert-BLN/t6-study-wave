<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\Announcement;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AnnouncementCreatedMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public Announcement $announcement) {}

    public function build(): self
    {
        return $this->subject('New announcement posted')
            ->view('emails.announcement-created');
    }
}
