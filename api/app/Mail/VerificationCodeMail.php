<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;


class VerificationCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $checkOrderId;

    /**
     * Create a new message instance.
     */
    public function __construct($checkOrderId)
    {
        $this->checkOrderId = $checkOrderId;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Payment Confirmation Mail',
        );
    }


    public function build()
    {
        return $this->subject('Payment Confirmation Mail')
                    ->view('emails.order_confirmation')
                    ->with('checkOrderId', $this->checkOrderId);
    }
   
    public function attachments(): array
    {
        return [];
    }
}
