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
import { User } from 'lucide-react';
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
};

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    const { name, email, subject, message } = values;
    const whatsAppNumber = "9345255948"; // Your WhatsApp number

    // Format the message with newlines for readability in code.
    // This will be properly encoded by encodeURIComponent.
    const plainMessage = `*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;

    // Encode the entire message for the URL. `\n` will become `%0A`.
    const encodedMessage = encodeURIComponent(plainMessage);

    // Create the full WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Give feedback to the user and reset the form
    toast({
      title: "Opening WhatsApp",
      description: "Your message is ready to be sent!",
    });
    form.reset();
  }

  return (
    <section id="contact" className="w-full py-12 md:py-20 lg:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
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
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          transition={{ delay: 0.2 } as any}
        >
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
                  className="px-8 py-3 w-full max-w-xs transition-colors duration-300 bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  <FaWhatsapp className="mr-2 h-5 w-5" />
                  Send via WhatsApp
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
