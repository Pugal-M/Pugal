
'use client'; // Required for form handling

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User } from 'lucide-react'; // Added User icon

// Define Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }), // Added subject
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Placeholder for server action
async function submitContactForm(data: ContactFormValues): Promise<{ success: boolean; message: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  console.log("Form data submitted:", data);
  // In a real app, you would send this data to your backend (e.g., API route, email service)
  // Example:
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (response.ok) {
  //   return { success: true, message: "Message sent successfully!" };
  // } else {
  //   return { success: false, message: "Failed to send message. Please try again." };
  // }

  // Simulate success for now
  return { success: true, message: "Message sent successfully!" };
}


export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(values);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        form.reset(); // Clear form on success
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="w-full py-12 md:py-20 lg:py-24 bg-background">
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

        <div className="max-w-xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      {/* Removed label for cleaner look like template */}
                      {/* <FormLabel>Full Name</FormLabel> */}
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
                      {/* <FormLabel>Email Address</FormLabel> */}
                      <FormControl>
                        <Input type="email" placeholder="Email Address" {...field} className="bg-input border-border/50 focus:border-primary focus:ring-primary/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Added Subject Field */}
               <FormField
                 control={form.control}
                 name="subject"
                 render={({ field }) => (
                   <FormItem>
                     {/* <FormLabel>Subject</FormLabel> */}
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
                    {/* <FormLabel>Your Message</FormLabel> */}
                    <FormControl>
                      <Textarea placeholder="Your Message" rows={5} {...field} className="bg-input border-border/50 focus:border-primary focus:ring-primary/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center"> {/* Center button */}
                <Button
                  type="submit"
                  size="lg"
                  className="px-8 py-3 w-full max-w-xs" // Make button wider
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          {/* Keep direct email link as alternative */}
          <p className="text-center text-muted-foreground mt-8 text-sm">
              Or reach out directly at: <a href="mailto:pugalarasu04@gmail.com" className="text-primary hover:underline">pugalarasu04@gmail.com</a>
           </p>
        </div>
      </div>
    </section>
  );
}

