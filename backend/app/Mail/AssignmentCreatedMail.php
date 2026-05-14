<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\Assignment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AssignmentCreatedMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public Assignment $assignment) {}

    public function build(): self
    {
        return $this->subject('New assignment posted')
            ->view('emails.assignment-created');
    }
}
