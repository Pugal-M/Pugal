
import { ProjectCard } from '@/components/project-card';
import { Hammer } from 'lucide-react'; // Added Hammer icon import

// Sample project data (replace with your actual projects)
// Consider featuring 4-6 key projects
export const projects = [
  {
    id: "v-shuttle-tracker",
    title: "VShuttle : Real-Time Shuttle Tracking App",
    description: "A mobile app that helps students and faculty track the live location of campus shuttles in real time.",
    imageUrl: "/image/vshuttle/vshuttle-thumb.png",
    sliderImages: [
      "/image/vshuttle/1.png",
      "/image/vshuttle/2.png",
      "/image/vshuttle/3.png",
      "/image/vshuttle/4.png",
      "/image/vshuttle/5.png",
      "/image/vshuttle/6.png",
      "/image/vshuttle/7.png",
    ],
    liveUrl: "#", // Placeholder
    githubUrl: "#", // Placeholder
    longDescription: "The V-Shuttle project is a mobile application developed to enable students and faculty to track the live location of campus shuttle buses. Public transportation users often struggle with uncertain arrival times, leading to delays and inefficiencies. Traditional systems may lack real-time updates and user-friendly interfaces, making trip planning difficult. The V-Shuttle app solves this by offering real-time shuttle tracking, estimated arrival times, and clear route visualization. Designed with a simple and accessible interface, it enhances user experience by reducing wait times, improving commute planning, and boosting satisfaction with on-campus transportation services.",
    technologies: ["Flutter","Dart", "Firebase", "Google Maps API"],
    dataAiHint: "shuttle tracking",
  },
  {
    id: "vvshop-app",
    title: "VVShop – Seamless Shopping Experience App",
    description: "A mobile app designed to provide users with a smooth and efficient online shopping experience with real-time inventory tracking and order management.",
    imageUrl: "/image/shopApp/shopapp2.png",
    sliderImages: [
      "/image/shopApp/1.png",
      "/image/shopApp/2.png",
      "/image/shopApp/2a.png",
      "/image/shopApp/4.png",
      "/image/shopApp/3.png",
      "/image/shopApp/5.png",
      "/image/shopApp/6.png",
      "/image/shopApp/7.png"
    ],
    githubUrl: "#", // Placeholder
    longDescription: "VVShop is a modern mobile application tailored to redefine the shopping experience. It addresses common challenges faced by users in online shopping such as poor navigation, delayed updates, and limited product tracking. The app enables users to browse products by category, add items to a cart, check real-time stock availability, and place secure orders. With a visually appealing interface and intuitive design, VVShop ensures a streamlined shopping journey. The app supports order tracking, push notifications for deals, and detailed product information – making shopping faster, smarter, and more enjoyable.",
    technologies: ["Flutter", "Dart", "Firebase", "Provider"],
    dataAiHint: "shopping ecommerce retail app"
  },  
  {
    id: "e-commerce-platform",
    title: "E-commerce Platform",
    description: "A full-featured online store with product catalog, shopping cart, and checkout process.",
    imageUrl: "https://picsum.photos/seed/ecommerce/600/400",
    sliderImages: [
      "https://picsum.photos/seed/ecommerce1/800/600",
      "https://picsum.photos/seed/ecommerce2/800/600",
      "https://picsum.photos/seed/ecommerce3/800/600",
    ],
    githubUrl: "#",
    longDescription: "This e-commerce platform is a comprehensive solution for online retail. It features a dynamic product catalog with advanced filtering and search capabilities, a seamless shopping cart experience, and secure checkout integration with Stripe. User accounts, order history, and wishlists are also part of the core functionality. The backend is powered by Node.js and Express, with MongoDB for data storage, ensuring scalability and performance.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Stripe API", "Node.js", "Express.js", "MongoDB"],
    dataAiHint: "online store shopping",
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    description: "A Kanban-style task manager to organize projects and collaborate with teams. Features drag-and-drop interface.",
    imageUrl: "https://picsum.photos/seed/taskapp/600/400",
    sliderImages: [
      "https://picsum.photos/seed/taskapp1/800/600",
      "https://picsum.photos/seed/taskapp2/800/600",
      "https://picsum.photos/seed/taskapp3/800/600",
    ],
    githubUrl: "#",
    longDescription: "The Task Management App provides an intuitive Kanban-style interface for managing projects and tasks. Users can create boards, lists, and cards, assign tasks, set due dates, and track progress. Real-time collaboration features allow teams to work together effectively. Built with React and Firebase for real-time database and authentication.",
    technologies: ["React", "Firebase", "Material UI", "Drag & Drop API"],
    dataAiHint: "kanban board productivity",
  },
  {
    id: "personal-blog-cms",
    title: "Personal Blog & CMS",
    description: "A content management system for publishing articles and thoughts. Includes markdown support and SEO optimization.",
    imageUrl: "https://picsum.photos/seed/blog/600/400",
    sliderImages: [
      "https://picsum.photos/seed/blogcms1/800/600",
      "https://picsum.photos/seed/blogcms2/800/600",
      "https://picsum.photos/seed/blogcms3/800/600",
    ],
    longDescription: "This personal blog platform comes with a custom-built Content Management System (CMS). It allows for easy creation and management of articles using a rich text editor with Markdown support. Features include category management, tagging, SEO optimization tools, and a responsive design for optimal viewing on all devices.",
    technologies: ["Next.js", "Markdown", "GraphQL", "Prisma", "PostgreSQL"],
    dataAiHint: "writing publishing articles",
  },
  {
    id: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard displaying complex data sets using charts and graphs. Built with React and D3.js.",
    imageUrl: "https://picsum.photos/seed/dataviz/600/400",
    sliderImages: [
      "https://picsum.photos/seed/dataviz1/800/600",
      "https://picsum.photos/seed/dataviz2/800/600",
      "https://picsum.photos/seed/dataviz3/800/600",
    ],
    githubUrl: "#",
    longDescription: "This interactive dashboard is designed to present complex datasets in an accessible and engaging manner. It utilizes various chart types (bar, line, pie, scatter plots) powered by D3.js and Recharts. Users can filter data, drill down into details, and export visualizations. The application is built with React for a dynamic user interface.",
    technologies: ["React", "D3.js", "Recharts", "Redux", "Node.js"],
    dataAiHint: "charts graphs analytics",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                Latest <span className="title-highlight">Project</span>
              </h2>
              <Hammer
                className="text-primary animate-hammer-hit w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                aria-hidden="true"
              />
            </div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out some of the recent work I'm proud of.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

