
import { ProjectCard } from '@/components/project-card';
import { Hammer } from 'lucide-react'; 

// Sample project data (replace with your actual projects)
export const projects = [
  {
    id: "v-shuttle-tracker",
    title: "V-Shuttle – Real-Time Shuttle Tracking App",
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
    githubUrl: "https://github.com/Pugal-M/VShuttle", 
    longDescription: "The V-Shuttle project is a mobile application developed to enable students and faculty to track the live location of campus shuttle buses. Public transportation users often struggle with uncertain arrival times, leading to delays and inefficiencies. Traditional systems may lack real-time updates and user-friendly interfaces, making trip planning difficult. The V-Shuttle app solves this by offering real-time shuttle tracking, estimated arrival times, and clear route visualization. Designed with a simple and accessible interface, it enhances user experience by reducing wait times, improving commute planning, and boosting satisfaction with on-campus transportation services.",
    technologies: ["Flutter","Dart", "Firebase", "Google Maps API"],
    dataAiHint: "shuttle tracking",
    downloadUrl: "https://drive.google.com/file/d/1oePIC9iQvUBVG7fjtH3mvSzwb55jwls2/view?usp=drive_link",
    videoUrl: "https://www.youtube.com/embed/sVZXLAH5H1Q?si=T8J2r8Pkyvz6x3h8", // Example YouTube embed
    videoTitle: "V-Shuttle App Demo",
    videoDescription: "A quick demonstration of the V-Shuttle real-time tracking application.",
    paperUrl: "/image/vshuttle/V-Shuttle.pdf" 
  },
  {
    id: "flood-route-app",
    title: "Smart Flood Route Navigator | Real-time Flood Level Alert System",
    description: "An innovative app built to guide users through safer routes during heavy rainfall by monitoring and reporting road water levels in real-time.",
    imageUrl: "/image/floodManagement/floodManage.png",
    sliderImages: [
      "/image/floodManagement/home.png",
      "/image/floodManagement/flood_1.png",
      "/image/floodManagement/flood_2.png",
      "/image/floodManagement/flood_3.png",
      "/image/floodManagement/1.jpg",
      "/image/floodManagement/2.jpg",
      "/image/floodManagement/7.jpg",
      "/image/floodManagement/9.jpg",
      "/image/floodManagement/10.jpg",
    ],
    githubUrl: "https://github.com/Pugal-M/Flood_Management", // Add GitHub repo if available
    longDescription: "This project aims to provide a real-time solution to people who face road safety issues during rainy seasons. Built using ESP32 and Firebase, water levels on roads are continuously monitored using ultrasonic sensors. These levels are uploaded to the cloud, and the mobile app visualizes them on a map. The app then recommends safer, flood-free routes—making it an essential tool for daily commuters and emergency services like ambulances. With live updates, push alerts, and route optimization, this system ensures people can travel more safely and reach their destination without delay, even during extreme weather conditions.",
    technologies: ["ESP32", "Firebase", "Flutter", "Dart", "Ultrasonic Sensor", "Google Maps API"],
    dataAiHint: "flood monitoring smart traffic safety emergency routing",
    downloadUrl: "https://drive.google.com/file/d/1mjQb8EBHaVpuPLHXXPnE2lyO_9q5Ekuy/view", // Replace if available
    videoUrl: "https://youtu.be/n6E7y1Zq9js", // Replace if available
    videoTitle: "Flood Route Navigator Demo",
    videoDescription: "Demonstration of how the app helps users find the safest routes during floods using real-time water-level data from sensors.",
    paperUrl: "/image/floodManagement/Flood Management.pdf" // Added sample paper URL
  },  
  {
    id: "smart-car-parking-system",
    title: "Smart Car Parking System",
    description: "An automated parking system using 8051 microcontroller, IR sensors, and servo motors to monitor and manage vehicle parking in real time.",
    imageUrl: "/image/SmartCar/smartCarThum.jpg", // No image needed, video only
    sliderImages: [], // No images needed
    githubUrl: "#", 
    longDescription: "This Smart Car Parking System project, developed using the 8051 microcontroller, IR sensors, servo motors, and LCD display, automates the detection and control of parking slots. Vehicles are detected at entry and exit gates using IR sensors, which trigger servo motors to operate gates accordingly. Real-time slot availability is displayed on an LCD. If all slots are full, the system prevents further entry, enhancing both safety and efficiency. The solution is user-friendly, scalable, cost-effective, and environmentally conscious by reducing idle time and emissions.",
    technologies: ["8051 Microcontroller", "Embedded C", "IR Sensors", "Servo Motors", "LCD Display", "KEIL", "Proteus"],
    dataAiHint: "parking system microcontroller",
    videoUrl: "https://youtu.be/rF0hP40QoVo", // Google Drive video link changed to uc?id format
    videoTitle: "Smart Car Parking System Demo",
    videoDescription: "Demonstration of the automated smart car parking system.",
    paperUrl: "/image/SmartCar/Microprocessors and Microcontrollers Lab Submission 5 (1).pdf",
    displayVideoOnly: true, // Flag to display only video
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
      "/image/shopApp/7.png",
      "/image/shopApp/8.png",
      "/image/shopApp/9.png",
    ],
    githubUrl: "https://github.com/Pugal-M/E-Commerce-Shopping-App", // Placeholder
    longDescription: "VVShop is a modern mobile application tailored to redefine the shopping experience. It addresses common challenges faced by users in online shopping such as poor navigation, delayed updates, and limited product tracking. The app enables users to browse products by category, add items to a cart, check real-time stock availability, and place secure orders. With a visually appealing interface and intuitive design, VVShop ensures a streamlined shopping journey. The app supports order tracking, push notifications for deals, and detailed product information – making shopping faster, smarter, and more enjoyable.",
    technologies: ["Flutter", "Dart", "Firebase", "Provider"],
    dataAiHint: "shopping ecommerce retail app",
    downloadUrl: "https://drive.google.com/file/d/1H-PfwoxkU0tOeHuRjKdVFdWhfD9WeQus/view?usp=sharing",
    videoUrl: "https://www.youtube.com/embed/sVZXLAH5H1Q?si=T8J2r8Pkyvz6x3h8", // Example YouTube embed
    videoTitle: "V-Shuttle App Demo",
    videoDescription: "A quick demonstration of the V-Shuttle real-time tracking application."
  },
  {
    id: "myclasstime-app",
    title: "MyClassTime – Smart Offline Class Schedule Manager",
    description: "An offline mobile app built using Flutter and Hive to help students organize and manage their weekly class periods efficiently.",
    imageUrl: "/image/myClassTime/thumbnail.png",
    sliderImages: [
      "/image/myClassTime/port_app.png",
      "/image/myClassTime/port_home.png",
      "/image/myClassTime/port_menu.png",
      "/image/myClassTime/port_addclass.png",
      "/image/myClassTime/port_settime.png",
      "/image/myClassTime/port_delete.png",
    ],
    githubUrl: "#", // Placeholder
    longDescription: "MyClassTime is a fully offline mobile application developed using Flutter, tailored to help students manage their class schedules with ease. It uses Hive for secure and fast local data storage, allowing users to create weekly timetables, add subjects with time slots, assign faculty names, and set period reminders — all without internet access. With a smooth UI and color-coded subjects, it provides a clear visual overview of your day. Ideal for students who want to stay organized, even without a network connection.",
    technologies: ["Flutter", "Dart", "Hive (Local DB)"],
    dataAiHint: "offline timetable app period tracker",
    downloadUrl: "https://drive.google.com/file/d/1vxCuXIH_8WdJjapWVEkgJdkvXOK8usze/view?usp=sharing",
    videoUrl: "https://youtu.be/kyOdoPffLJM", // Optional
    videoTitle: "MyClassTime App Demo",
    videoDescription: "This video showcases how MyClassTime helps students manage class schedules entirely offline using Hive in Flutter."
  }
  
  
];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-20 lg:py-24">
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
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

