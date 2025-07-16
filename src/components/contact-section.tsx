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
import { User, Mail, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Define Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: 50 }
};

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

  // Handler for WhatsApp submission
  function onWhatsAppSubmit(values: ContactFormValues) {
    const { name, email, subject, message } = values;
    const whatsAppNumber = "9345255948"; // Your WhatsApp number

    const plainMessage = `*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
    const encodedMessage = encodeURIComponent(plainMessage);
    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    toast({
      title: "Opening WhatsApp",
      description: "Your message is ready to be sent!",
    });
    form.reset();
  }

  // Handler for Email submission
  async function onEmailSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        // Use server error message if available, otherwise a generic one
        throw new Error(result.message || 'An unexpected error occurred.');
      }

      toast({
        title: "Email Sent!",
        description: "Your message has been submitted successfully.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error instanceof Error ? error.message : "Could not send email. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="w-full py-12 md:py-20 lg:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ amount: 0.3 }}
          variants={sectionVariants}
        >
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
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto p-6 md:p-8 rounded-lg shadow-xl border border-border/50 bg-card"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ amount: 0.2 }}
          variants={sectionVariants}
          transition={{ delay: 0.2 } as any}
        >
          <Form {...form}>
            {/* Prevent default form submission on Enter key, as we have two actions */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                <Button
                  type="button"
                  onClick={form.handleSubmit(onWhatsAppSubmit)}
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full sm:w-auto flex-1 transition-colors duration-300 bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  <FaWhatsapp className="mr-2 h-5 w-5" />
                  Send via WhatsApp
                </Button>
                <Button
                  type="button"
                  onClick={form.handleSubmit(onEmailSubmit)}
                  disabled={isSubmitting}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto flex-1 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Mail className="mr-2 h-5 w-5" />
                  )}
                  {isSubmitting ? "Sending..." : "Send via Email"}
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-center text-muted-foreground mt-8 text-sm">
            Or reach out directly via{' '}
            <a href="mailto:pugalarasu04@gmail.com" className="text-primary hover:underline">
              Email
            </a>{' '}
            or on{' '}
            <a href="https://wa.me/9345255948" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              <FaWhatsapp className="w-4 h-4" /> WhatsApp
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
