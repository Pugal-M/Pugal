'use client'; // Make this a Client Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Settings, Palette, Code2 } from "lucide-react"; // Added Code2
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const skillsData = [
  {
    category: "Frontend Development",
    icon: Code,
    skills: [
      { name: "HTML", proficiency: 95 },
      { name: "CSS", proficiency: 90 },
      { name: "JavaScript", proficiency: 88 },
      { name: "Flutter", proficiency: 70 },
    ],
  },
  {
    category: "Backend Development",
    icon: Server,
    skills: [
      { name: "Firebase", proficiency: 75 },
      { name: "SQL", proficiency: 80 },
    ],
  },
  {
    category: "Programming Languages", // New Category
    icon: Code2,
    skills: [
      { name: "Java", proficiency: 90 },
      { name: "Python", proficiency: 85 },
      { name: "Dart", proficiency: 80 },
      { name: "C", proficiency: 80 },
      { name: "C++", proficiency: 70 },
    ],
  },
  {
    category: "Database Management",
    icon: Database,
    skills: [
      { name: "Firebase Firestore", proficiency: 72 },
      { name: "SQL (Basic)", proficiency: 60 },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: Settings,
    skills: [
      { name: "GitHub", proficiency: 88 },
      { name: "VS Code", proficiency: 95 },
      { name: "Eclipce", proficiency: 88 },
      { name: "Firebase Studio", proficiency: 88 },
    ],
  },
  {
    category: "Design & UI/UX",
    icon: Palette,
    skills: [
      { name: "Figma (Basic)", proficiency: 70 },
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: 50 }
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function SkillsSection() {
  return (
    <section id="skills" className="w-full py-12 md:py-20 lg:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                My <span className="title-highlight">Skills</span>
              </h2>
              <Settings
                className="text-primary animate-spin-slow w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                aria-hidden="true"
              />
            </div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here's a snapshot of the technologies and tools I work with. Click on a category to see my proficiency levels.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ amount: 0.1 }}
          variants={gridVariants}
        >
          {skillsData.map((categoryData) => (
            <motion.div key={categoryData.category} variants={cardVariants}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card
                    className="bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col shadow-md hover:shadow-lg cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg group h-full"
                    tabIndex={0} 
                    role="button"
                  >
                    <CardHeader className="flex flex-row items-center gap-4 pb-4 group-hover:text-primary transition-colors">
                      <categoryData.icon
                        className={`w-8 h-8 text-primary transition-colors ${
                          categoryData.category === "Tools & Technologies" ? "glowing-icon animate-pulse-bg" : ""
                        } group-hover:text-primary`}
                        aria-hidden="true"
                      />
                      <CardTitle className="text-xl font-semibold">{categoryData.category}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {categoryData.skills.map((skill) => (
                          <Badge
                            key={skill.name}
                            variant="secondary"
                            className="text-sm font-medium hover:bg-primary/20 hover:text-primary-foreground transition-colors px-3 py-1"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-card border-border shadow-xl rounded-lg">
                  <DialogHeader className="pb-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <categoryData.icon className="w-7 h-7 text-primary" /> 
                      <DialogTitle className="text-2xl text-foreground">{categoryData.category}</DialogTitle>
                    </div>
                  </DialogHeader>
                  <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto">
                    <DialogDescription className="text-sm text-muted-foreground mb-2">
                      Proficiency levels in {categoryData.category.toLowerCase()}:
                    </DialogDescription>
                    {categoryData.skills.map(skill => (
                      <div key={skill.name} className="space-y-1">
                         <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          {/* Optional: Could add a small icon or visual cue here if desired, but no text percentage */}
                        </div>
                        <Progress value={skill.proficiency} className="w-full h-3 rounded-full [&>div]:bg-primary" />
                      </div>
                    ))}
                  </div>
                  <DialogFooter className="pt-4 mt-2 border-t border-border/50">
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
