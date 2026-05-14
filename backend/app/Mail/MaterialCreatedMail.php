<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\Material;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MaterialCreatedMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public Material $material) {}

    public function build(): self
    {
        return $this->subject('New course material added')
            ->view('emails.material-created');
    }
}
