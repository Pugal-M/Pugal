'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription as DialogDesc,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

const certificates = [
  {
    id: "vshuttle",
    title: "VShuttle | Live Location Tracking App | VIT Vellore",
    issuer: "Vellore Institute of Technology, Vellore",
    dateIssued: "December 2024",
    credentialUrl: "https://drive.google.com/file/d/1tJhOZRefQCvrTb5FpNYw0mjumZdjWuYx/view?usp=sharing",
    imageUrl: "/image/vshuttle-thumb.png",
    modalImageUrl: "/image/vshuttle-certificate.png",
    dataAiHint: "project certificate vshuttle",
  },
  {
    id: "flutter-ui-bootcamp",
    title: "Flutter UI Bootcamp | Build Beautiful Apps using Flutter",
    issuer: "Udemy - Hussain Mustafa",
    dateIssued: "March 10, 2025",
    credentialUrl: "https://ude.my/UC-282eefb5-681d-4b9b-9a4c-4c9dc8344cfd",
    imageUrl: "/image/flutter-ui.png",
    modalImageUrl: "/image/flutter-ui-certificate.png",
    dataAiHint: "flutter ui bootcamp",
  },
  {
    id: "google-cloud-core",
    title: "Google Cloud Fundamentals: Core Infrastructure",
    issuer: "Google Cloud | Coursera",
    dateIssued: "May 28, 2025",
    credentialUrl: "https://coursera.org/verify/DX7VHRHPOYU2",
    imageUrl: "/image/certificates/googleThunm.png",
    modalImageUrl: "/image/certificates/GoogleCloud.png",
    dataAiHint: "course certificate google cloud fundamentals",
  },  
  {
    id: "flutter-firebase-chat",
    title: "Flutter & Firebase Chat App: Master Flutter and Firebase",
    issuer: "Udemy - Hussain Mustafa",
    dateIssued: "March 5, 2025",
    credentialUrl: "https://ude.my/UC-8454a278-21b9-4bb1-965f-54e5f037c4bf",
    imageUrl: "/image/flutter-chat-thumb.png",
    modalImageUrl: "/image/flutter-chat-cert.png",
    dataAiHint: "flutter firebase chat app",
  },    
  
  
  

];

interface CertificateCardProps {
  title: string;
  issuer: string;
  dateIssued: string;
  imageUrl: string;
  credentialUrl?: string;
  dataAiHint?: string;
}

function CertificateCard({ title, issuer, dateIssued, imageUrl, credentialUrl, dataAiHint }: CertificateCardProps) {
  return (
    <Card className="overflow-hidden bg-card border border-border/50 hover:border-primary/80 transition-all duration-300 flex flex-col h-full group rounded-lg shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <CardHeader className="p-0 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} certificate preview`}
          data-ai-hint={dataAiHint || title.toLowerCase().split(" ").slice(0, 2).join(" ")}
          width={600}
          height={338}
          className="object-cover w-full aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
        />
      </CardHeader>
      <CardContent className="p-4 md:p-6 flex-grow">
        <CardTitle className="text-lg md:text-xl mb-1 group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-1">{issuer}</CardDescription>
        <CardDescription className="text-xs text-muted-foreground/80">Issued: {dateIssued}</CardDescription>
      </CardContent>
      {credentialUrl && credentialUrl !== "#" && (
        <CardFooter className="p-4 md:p-6 pt-0">
          <Button asChild variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary w-full">
            <a href={credentialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4" /> View Credential
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function CertificatesSection() {
  return (
    <section id="certificates" className="w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                My <span className="title-highlight">Certificates</span>
              </h2>
              <Award className="text-primary w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 animate-float-subtle" aria-hidden="true" />
            </div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Showcasing my qualifications and continuous learning. Click on a certificate to view it.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
        >
          {certificates.map((certificate) => (
            <motion.div key={certificate.id} variants={cardVariants} className="h-full">
              <Dialog>
                <DialogTrigger asChild>
                  <div role="button" tabIndex={0} className="cursor-pointer h-full">
                    <CertificateCard {...certificate} imageUrl={certificate.imageUrl} />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[90vw] md:max-w-[60vw] lg:max-w-[50vw] xl:max-w-[40vw] 2xl:max-w-[700px] p-0 bg-card border-border shadow-2xl rounded-lg">
                  <DialogHeader className="p-4 sm:p-6 border-b border-border/50 flex-shrink-0">
                    <DialogTitle className="text-xl sm:text-2xl text-foreground">{certificate.title}</DialogTitle>
                    <DialogDesc className="text-sm text-muted-foreground">
                      {certificate.issuer} - Issued: {certificate.dateIssued}
                    </DialogDesc>
                  </DialogHeader>
                  <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto flex justify-center items-center">
                    <Image
                      src={certificate.modalImageUrl || certificate.imageUrl}
                      alt={`${certificate.title} - Full Certificate`}
                      width={1200}
                      height={800}
                      className="object-contain w-auto h-auto max-w-full max-h-full rounded-md shadow-md"
                      data-ai-hint={certificate.dataAiHint || certificate.title.toLowerCase().split(" ").slice(0, 2).join(" ")}
                    />
                  </div>
                  <DialogFooter className="p-4 sm:p-6 border-t border-border/50">
                    <DialogClose asChild>
                      <Button type="button" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
