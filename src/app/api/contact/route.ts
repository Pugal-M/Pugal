
import { type NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

// Define Zod schema for request body validation (should match frontend)
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid input.', errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email, subject, message } = validation.data;
    const recipientEmail = 'pugalarasu04@gmail.com'; // Your recipient email

    // ** START: Add your email sending logic here **
    // This is where you'd integrate an email service like Nodemailer, SendGrid, Resend, etc.
    // Example (conceptual - requires setup and credentials):
    //
    // import nodemailer from 'nodemailer';
    //
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail', // or your SMTP provider
    //   auth: {
    //     user: process.env.EMAIL_USER, // Store in .env.local
    //     pass: process.env.EMAIL_PASS, // Store in .env.local
    //   },
    // });
    //
    // const mailOptions = {
    //   from: `"${name}" <${email}>`, // Could be your own sending address too
    //   replyTo: email,
    //   to: recipientEmail,
    //   subject: `New Contact Form Submission: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //   `,
    // };
    //
    // await transporter.sendMail(mailOptions);
    //
    // console.log('Email sent successfully');
    // ** END: Add your email sending logic here **

    // For now, we'll simulate success as email sending is not implemented here.
    console.log('Received contact form submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('Intended recipient:', recipientEmail);


    return NextResponse.json({ message: 'Message submitted successfully! (Backend simulated)' }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form:', error);
    if (error instanceof z.ZodError) {
        return NextResponse.json({ message: 'Invalid input.', errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error. Please try again later.' }, { status: 500 });
  }
}
