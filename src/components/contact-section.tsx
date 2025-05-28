
'use client'; // Required for form handling

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Check, X as ErrorIcon } from 'lucide-react'; // Added Check and ErrorIcon

// Define Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const { toast } = useToast();
  const [submissionStatus, setSubmissionStatus] = React.useState<SubmissionStatus>('idle');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmissionStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: result.message || "Message sent successfully!",
        });
        form.reset();
        setSubmissionStatus('success');
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setSubmissionStatus('error');
    }
  }

  React.useEffect(() => {
    if (submissionStatus === 'success' || submissionStatus === 'error') {
      const timer = setTimeout(() => {
        setSubmissionStatus('idle');
      }, 3000); // Revert to idle after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  let buttonContent: React.ReactNode = "Send Message";
  let buttonClasses = "bg-primary text-primary-foreground hover:bg-primary/80";

  if (submissionStatus === 'submitting') {
    buttonContent = (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
      </>
    );
    buttonClasses = "bg-primary/90 text-primary-foreground cursor-not-allowed";
  } else if (submissionStatus === 'success') {
    buttonContent = (
      <>
        <Check className="mr-2 h-4 w-4" /> Sent!
      </>
    );
    buttonClasses = "bg-green-500 hover:bg-green-600 text-white cursor-not-allowed";
  } else if (submissionStatus === 'error') {
    buttonContent = (
      <>
        <ErrorIcon className="mr-2 h-4 w-4" /> Error
      </>
    );
    buttonClasses = "bg-destructive hover:bg-destructive/90 text-destructive-foreground cursor-not-allowed";
  }

  return (
    <section id="contact" className="w-full py-12 md:py-20 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
              Contact <span className="title-highlight">Me!</span>
            </h2>
            <User
                className="text-primary w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                aria-hidden="true"
            />
          </div>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Have a question or want to work together? Fill out the form below.
          </p>
        </div>

        <div className="max-w-xl mx-auto p-6 md:p-8 rounded-lg shadow-xl border border-border/50 bg-card">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} className="bg-input border-border/50 focus:border-primary focus:ring-primary/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="Email Address" {...field} className="bg-input border-border/50 focus:border-primary focus:ring-primary/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                 control={form.control}
                 name="subject"
                 render={({ field }) => (
                   <FormItem>
                     <FormControl>
                       <Input placeholder="Subject" {...field} className="bg-input border-border/50 focus:border-primary focus:ring-primary/50" />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Your Message" rows={5} {...field} className="bg-input border-border/50 focus:border-primary focus:ring-primary/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className={`px-8 py-3 w-full max-w-xs transition-all duration-300 ease-in-out ${buttonClasses}`}
                  disabled={submissionStatus !== 'idle'}
                >
                  {buttonContent}
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-center text-muted-foreground mt-8 text-sm">
              Or reach out directly at: <a href="mailto:pugalarasu04@gmail.com" className="text-primary hover:underline">pugalarasu04@gmail.com</a>
           </p>
        </div>
      </div>
    </section>
  );
}
