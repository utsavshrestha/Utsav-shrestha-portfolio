export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  imageUrl?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  icon: string;
}

export interface Photo {
  title: string;
  url: string;
  location: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string;
  isReading?: boolean;
  rating?: number;
}

export interface Game {
  id: string;
  title: string;
  platform: string;
  status: string;
  imageUrl: string;
  icon: string;
}

export const PERSONAL_INFO = {
  name: "UTSAV SHRESTHA",
  title: "Senior Data Engineer",
  email: "shresthau96@gmail.com",
  phone: "+9779849329276",
  location: "Kathmandu, Nepal",
  linkedin: "https://www.linkedin.com/in/utsav-shrestha-770430141/",
  github: "https://github.com/shresthau96",
  behance: "https://behance.net/utsavshrestha",
  image: "https://res.cloudinary.com/dgo0gravp/image/upload/v1776400084/EEA3280B-3030-4E85-82C7-F8130110B744_uitp9r.png",
  aboutImage: "https://res.cloudinary.com/dgo0gravp/image/upload/v1772891776/IMG_3606_elpbid.jpg",
  summary: "A Senior Data Engineer with over 5 years of experience in designing end-to-end solutions, from robust ETL/ELT pipelines to scalable cloud architectures. Proven track record in optimizing daily operations, lowering infrastructure costs, and identifying new business opportunities through data-driven insights.",
};

export const EXPERIENCES: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Abacus Insights",
    period: "May 2025 - Present",
    description: [
      "Working as a Senior Data Engineer focused on US healthcare data solutions.",
      "Designing and implementing end-to-end ETL/ELT pipelines using Airbyte, AWS, Databricks, Snowflake, Delta Lake, and PySpark.",
      "Building scalable backend architectures and high-performance data processing systems.",
      "Collaborating with cross-functional teams to optimize data delivery and platform reliability.",
    ],
  },
  {
    role: "Senior Data Engineer",
    company: "extensoData",
    period: "July 2024 - Present",
    description: [
      "Refactor data pipeline and reduced the run time using different optimization technique on big data enviroment.",
      "Developing Data Catalog",
      "Communicating with respective business stakeholders to define the reporting requirement and data needs to ensure project success.",
      "Working on making project scalable, faster and fault tolerant.",
      "Mentoring Data Engineers, Associate Data Engineers",
      "Researching on different open source technologies to improve existing architecture.",
    ],
  },
  {
    role: "Data Engineer II",
    company: "extensoData",
    period: "Feb 2024 - July 2024",
    description: [
      "Refactor data pipeline and reduced the run time using different optimization technique like cache, persist, broadcast join etc using Apache Spark.",
      "Communicating with respective business stakeholders to define the reporting requirement and data needs to ensure project success.",
      "Monitoring and scheduling spark jobs with Apache Airflow.",
      "Extract, Transformation Load (ETL) | Extract, Load, Transform(ELT) | Architecture Design | Dashboard Design | Reports",
      "Research on Apache Iceberg (ACID, Time Travel, Catalog)",
      "Mentor Associate Data Engineers, Data Trainee and Interns.",
    ],
  },
  {
    role: "Data Engineer",
    company: "extensoData",
    period: "Mar 2023 - Feb 2024",
    description: [
      "Migrated eSewa (a digital wallet based in Nepal providing instant online payment solution) payment load data warehouse to big data stack using Apache Spark, Apache Hadoop, Apache Hive.",
      "Researched on batch streaming for daily data load using Apache Spark.",
      "Researched and implented scheduling of big data pipeline using Apache Airflow.",
      "Decreased run time of fonepay from 13 hours to 2.3 hours.",
    ],
  },
  {
    role: "Associate Data Engineer",
    company: "extensoData",
    period: "May 2021 - Mar 2023",
    description: [
      "Prepared data warehouse for Fonepay (Nepal largest payment network).",
      "Performed ETL ( Extraction, Transformation and Load) using tools such as pentaho.",
      "Scheduled of ETL pipeline with Apache airflow, database backup and recovery.",
      "Worked on challenges of Fonepay App identifying eligible customers who have successfully completed the challenge.",
      "Prepared weekly and monthly analysis bank report like (total qr transaction count, total transaction amount, new merchant enrolled, unique users etc for different banks of Nepal.",
      "Provided special reports and visualization through inhouse build XBI.",
      "Mentored new hire intern and trainee.",
    ],
  },
  {
    role: "Intern",
    company: "LIS Nepal",
    period: "Sep 2020 - Mar 2021",
    description: [
      "Worked in Nepal Govement Project, Nepal Stock Exchange (NEPSE)",
      "Client side station at NEPSE. Provided full support in NEPSE during the time of highest transaction of all time.",
      "Identified issue in database with continuous server log monitoring.",
      "Real time problem identification and solving of clients of all 50 Trading Management System.",
      "Data transfer, Data Consumption and Data Verification , Job Scheduling.",
      "MS SQL, Rabbit-MQ, Jenkins, Xshell, Azure Database Studio, SQL Tools, SQL Server Management Studio (SSMS), Oracle",
      "Monitored and helped 5 colleagues with NEPSE Operational Task, learned client handling",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "Bsc Hons in Computing",
    institution: "Softwarica College of IT and E-commerce (Coventry University)",
    period: "2017 - 2019",
    details: "First Class Honors Degree with Distinction",
  },
  {
    degree: "+2 Management",
    institution: "National College of Computer Studies",
    period: "2014 - 2016",
    details: "",
  },
  {
    degree: "School Leaving Certificate (SLC)",
    institution: "Manasalu Public Higher Secondary School",
    period: "2014",
    details: "",
  },
];

export const EXPERTISE = {
  databases: ["MySQL", "Oracle", "MSSQL", "Snowflake"],
  programming: ["Python", "Scala", "PySpark"],
  skills: [
    "Apache Spark", "Apache Iceberg", "Data warehousing", "Performance Tuning",
    "Optimization", "Data Visualization", "Tableau", "Apache Airflow",
    "Airbyte", "Databricks", "Delta Lake", "Snowflake",
    "Agile Methodology (SCRUM)", "Git", "Github", "Pentaho", "ETL/ELT", "Docker"
  ],
  os: ["Windows", "Linux", "macOS"],
  design: ["Adobe Photoshop", "Adobe Illustrator", "Adobe XD"]
};

export const RESEARCH_INTERESTS = [
  "Big Data", "Cloud Computing", "Performance Tuning and Optimization", "Databases", "Machine Learning"
];

export const IMPACT_METRICS = [
  { label: "Years of Experience", value: "4+", icon: "Clock" },
  { label: "Pipeline Speedup", value: "80%", icon: "Zap" },
  { label: "Engineers Mentored", value: "10+", icon: "Users" },
  { label: "Data Managed", value: "10TB+", icon: "Database" },
];

export const PROJECTS = [
  {
    title: "Fonepay Pipeline Optimization",
    category: "Performance Tuning",
    description: "Redesigned the ETL architecture for Nepal's largest payment network, reducing daily processing time from 13 hours to 2.3 hours using Apache Spark optimization techniques.",
    tags: ["Spark", "Airflow", "Hadoop"],
    link: "#",
    githubUrl: "https://github.com/shresthau96/fonepay-pipeline",
    liveUrl: "https://fonepay.com",
    deepDive: {
      problem: "The daily data load for Fonepay was taking over 13 hours, which meant data wasn't ready for business analysts until mid-day. The existing Pentaho-based ETL was struggling with the increasing volume of transaction data.",
      solution: "Migrated the core ETL logic to Apache Spark. Implemented broadcast joins for lookup tables, optimized partitioning based on transaction dates, and used Airflow for robust scheduling and error handling.",
      outcome: "Processing time reduced by 82% (13h -> 2.3h). Cloud infrastructure costs were lowered by 40% due to shorter cluster runtimes.",
      architecture: `
graph TD
    A[SQL Server Source] -->|JDBC| B(Spark Cluster)
    B -->|Broadcast Join| C[Merchant Lookup]
    B -->|Partition by Date| D[Parquet Files]
    D -->|External Table| E[(Hive Data Warehouse)]
    E -->|Reporting| F[Tableau]
      `
    }
  },
  {
    title: "eSewa Data Migration",
    category: "Data Warehousing",
    description: "Led the migration of payment load data from legacy systems to a modern big data stack, ensuring zero data loss and improved query performance for business reporting.",
    tags: ["Hive", "Spark", "Scala"],
    link: "#",
    githubUrl: "https://github.com/shresthau96/esewa-migration",
    deepDive: {
      problem: "eSewa's legacy data warehouse was reaching its storage and compute limits. Querying historical payment data was becoming extremely slow, affecting business decision-making.",
      solution: "Designed a migration strategy using Spark for data validation and Hive for storage. Implemented a schema evolution strategy to handle legacy data inconsistencies.",
      outcome: "Migrated 5+ years of payment data with 100% accuracy. Query performance for year-over-year reports improved by 5x.",
      architecture: `
graph LR
    A[Legacy DB] -->|Spark Migration| B[(Hadoop/Hive)]
    B --> C[Validation Layer]
    C --> D[Production Warehouse]
      `
    }
  },
  {
    title: "Real-time NEPSE Monitoring",
    category: "Infrastructure",
    description: "Implemented a real-time server log monitoring system for the Nepal Stock Exchange (NEPSE) to identify and resolve database issues during peak trading hours.",
    tags: ["MS SQL", "Rabbit-MQ", "Azure"],
    link: "#",
    liveUrl: "https://nepalstock.com.np",
    deepDive: {
      problem: "During peak trading hours, NEPSE's database would occasionally lag, causing delays in trade execution. There was no real-time visibility into which specific trading systems were causing the load.",
      solution: "Built a log aggregator using Rabbit-MQ to stream server logs. Developed a real-time monitoring dashboard that alerted the infrastructure team to database locks and slow queries.",
      outcome: "Reduced downtime by 60% during peak hours. Identified and resolved 15+ critical database bottlenecks within the first month of deployment.",
      architecture: `
graph LR
    A[Trading Systems] -->|Log Stream| B[Rabbit-MQ]
    B --> C[Log Processor]
    C --> D[Real-time Dashboard]
    C --> E[Alerting System]
      `
    }
  }
];

export interface UseItem {
  category: string;
  items: { name: string; description: string }[];
}

export const USES: UseItem[] = [
  {
    category: "Hardware",
    items: [
      { name: "MacBook Pro 14\" (M4 Pro)", description: "My primary workhorse. Handles heavy Spark local clusters and multiple containers with ease." },
      { name: "Dell UltraSharp 27\" 4K", description: "Dual monitor setup for maximum productivity. One vertical for logs/code, one horizontal for architecture diagrams." },
      { name: "Keychron K2 (Brown Switches)", description: "Tactile feedback without waking up the entire neighborhood." },
      { name: "Logitech MX Master 3S", description: "The horizontal scroll wheel is a lifesaver for wide data tables." }
    ]
  },
  {
    category: "Software & Tools",
    items: [
      { name: "IntelliJ IDEA Ultimate", description: "My go-to IDE for Scala and Java development. The database tools are unmatched." },
      { name: "DataGrip", description: "My dedicated database IDE for complex querying and database management." },
      { name: "VS Code", description: "For Python scripts, frontend work, and quick markdown editing." },
      { name: "Warp Terminal", description: "A modern, Rust-based terminal that makes navigating command history a breeze." },
      { name: "OrbStack", description: "A fast, lightweight alternative to Docker Desktop for running containers and Linux machines." },
      { name: "DBeaver", description: "Universal database tool. Essential for querying Hive, Postgres, and SQL Server." },
      { name: "Obsidian", description: "My second brain. Where I draft all my architecture notes and blog posts." }
    ]
  }
];

export const CURRENTLY_LEARNING = [
  { name: "dbt (data build tool)", status: "Advanced", icon: "Database" },
  { name: "Cloud Native Architectures", status: "Advanced", icon: "Cloud" },
  { name: "Docker & Kubernetes", status: "Intermediate", icon: "Layers" },
  { name: "Apache Kafka", status: "Exploring", icon: "Activity" },
  { name: "Python Deep Dive", status: "Advanced", icon: "Code" },
  { name: "Apache Flink", status: "Exploring", icon: "Zap" }
];

export const VISUAL_PORTFOLIO = [
  {
    title: "Financial Dashboard",
    platform: "Tableau",
    thumbnail: "https://picsum.photos/seed/tableau1/600/400",
    link: "https://public.tableau.com/app/profile/utsav7200/vizzes#!/",
    description: "Interactive visualization of payment trends and transaction volumes."
  },
  {
    title: "Brand Identity Design",
    platform: "Behance",
    thumbnail: "https://picsum.photos/seed/behance1/600/400",
    link: "https://www.behance.net/shresthau9f669",
    description: "Creative direction and visual identity for a tech startup."
  },
  {
    title: "Data Storytelling",
    platform: "Tableau",
    thumbnail: "https://picsum.photos/seed/tableau2/600/400",
    link: "https://public.tableau.com/app/profile/utsav7200/vizzes#!/",
    description: "Visualizing the impact of digital payments in Nepal."
  }
];

export const CERTIFICATIONS: { name: string; issuer: string; date: string; icon: string }[] = [];

export const PHOTOGRAPHY: Photo[] = [];

export const BOOKS: Book[] = [
  { id: "1", title: "Deep Work", author: "Cal Newport", category: "Productivity", cover: "https://covers.openlibrary.org/b/id/7988607-L.jpg", rating: 5 },
  { id: "2", title: "The Psychology of Money", author: "Morgan Housel", category: "Finance", cover: "https://covers.openlibrary.org/b/id/15137999-L.jpg", rating: 5 },
  { id: "3", title: "Ikigai", author: "Héctor García", category: "Self-Help", cover: "https://covers.openlibrary.org/b/id/11300391-L.jpg", rating: 5 },
  { id: "4", title: "The Richest Man in Babylon", author: "George S. Clason", category: "Finance", cover: "https://covers.openlibrary.org/b/id/10491331-L.jpg", rating: 5 },
  { id: "5", title: "Atomic Habits", author: "James Clear", category: "Self-Help", cover: "https://covers.openlibrary.org/b/id/12539702-L.jpg", rating: 5 },
  { id: "6", title: "How to Win Friends and Influence People", author: "Dale Carnegie", category: "Self-Help", cover: "https://covers.openlibrary.org/b/id/13314878-L.jpg", rating: 5 },
  { id: "7", title: "Elon Musk", author: "Ashlee Vance", category: "Biography", cover: "https://covers.openlibrary.org/b/id/8463846-L.jpg", isReading: true, rating: 5 },
];

export const GAMES: Game[] = [
  { id: "1", title: "Astro's Playroom", platform: "PS5", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478289/3d17c33239dab88c7e2f24af50140b3f6fa555e6030d5704.png_ch1o6r.avif", icon: "Award" },
  { id: "2", title: "God of War (2018)", platform: "PS4/PC", status: "Completed", imageUrl: "https://images.igdb.com/igdb/image/upload/t_1080p/co1tmu.jpg", icon: "Award" },
  { id: "3", title: "Bloodborne", platform: "PS4", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478293/Sy5e8DmeKIJVjlAGraPAJYkT.png_d3yvcj.avif", icon: "Award" },
  { id: "4", title: "Stray", platform: "PS5/PC", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478291/MV5BYzJiNTQwNWMtNzhmNi00MjFiLWE1OTctNjZmMGYwODEwNWIwXkEyXkFqcGc._V1__eyhyne.jpg", icon: "Award" },
  { id: "5", title: "Ghost of Tsushima", platform: "PS5", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478292/niMUubpU9y1PxNvYmDfb8QFD.png_y9s9ko.webp", icon: "Award" },
  { id: "6", title: "Kena: Bridge of Spirits", platform: "PS5/PC", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478291/Kena_Bridge_of_Spirits_key_art_c2b8zw.jpg", icon: "Award" },
  { id: "7", title: "Horizon Zero Dawn", platform: "PS4/PC", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478291/Horizon_Zero_Dawn_cover_art_eg01um.jpg", icon: "Award" },
  { id: "8", title: "Sekiro: Shadows Die Twice", platform: "PC", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478293/Sekiro_art_xdbhpg.jpg", icon: "Award" },
  { id: "9", title: "Marvel's Spider-Man: Miles Morales", platform: "PS5", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478290/b0OfuUs4lHGWG4VNlHcXwL5a.jpg_jtry6h.avif", icon: "Award" },
  { id: "10", title: "Assassin's Creed II", platform: "PC", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478290/b0OfuUs4lHGWG4VNlHcXwL5a.jpg_jtry6h.avif", icon: "Award" },
  { id: "11", title: "The Last of Us Part I", platform: "PS5/PC", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478291/EGS_TheLastofUsPartI_NaughtyDogLLC_S2_1200x1600-41d1b88814bea2ee8cb7986ec24713e0_mwruju.jpg", icon: "Award" },
  { id: "12", title: "God of War Ragnarök", platform: "PS5", status: "Completed", imageUrl: "https://images.igdb.com/igdb/image/upload/t_1080p/co5s5v.jpg", icon: "Award" },
  { id: "13", title: "The Last of Us Part II Remastered", platform: "PS5", status: "Completed", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478290/315718bce7eed62e3cf3fb02d61b81ff1782d6b6cf850fa4.png_q4pshc.avif", icon: "Award" },
  { id: "14", title: "Hogwarts Legacy", platform: "PS5/PC", status: "Playing", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478291/f6b1e4512ee6061913f7d604da8f5f39566be56ca32a68ee.png_w17lsm.avif", icon: "Activity" },
  { id: "15", title: "Fortnite", platform: "PC/PS5", status: "Playing", imageUrl: "https://res.cloudinary.com/dgo0gravp/image/upload/v1773478290/76953f62b85db186229e1d74e4b597db90e2d3cbd1fc4841.png_fem3a2.avif", icon: "Activity" },
];

export const BLOG_POSTS: BlogPost[] = [];
