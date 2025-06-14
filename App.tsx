import { Button } from "./components/ui/button";
import { Github, ExternalLink, Mail, Twitter, Linkedin, Instagram, Terminal, Code, Zap, Database, Globe, Server, ChevronRight, Play, Download, Cloud, Cpu, Shield } from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    // Simulate terminal loading with cloud focus
    const lines = [
      "$ whoami",
      "micci184 - Full Stack Engineer & Cloud Architect",
      "$ cat skills.txt",
      "JavaScript, TypeScript, React, Node.js, AWS, GCP...",
      "$ aws sts get-caller-identity",
      "Account: ************ | Role: CloudArchitect",
      "$ kubectl get nodes",
      "Ready    3 nodes running in production",
      "$ terraform --version", 
      "Terraform v1.6.0 on linux_amd64",
      "$ ls projects/",
      "3d-game-engine/ ai-assistant/ cloud-infrastructure/",
      "$ echo 'Ready to build scalable cloud solutions!'",
      "Ready to build scalable cloud solutions!",
      "$"
    ];
    
    lines.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
      }, index * 700);
    });
  }, []);

  const navItems = [
    { id: "home", name: "Home", icon: Terminal },
    { id: "about", name: "About", icon: Code },
    { id: "experience", name: "Experience", icon: Zap },
    { id: "projects", name: "Projects", icon: Globe },
    { id: "contact", name: "Contact", icon: Mail },
  ];

  const socialItems = [
    { name: "GitHub", icon: Github, href: "https://github.com/micci184", color: "#333" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/micci184", color: "#1DA1F2" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/micci184", color: "#0077B5" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/micci184", color: "#E4405F" },
  ];

  const skills = [
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "TypeScript", level: 90, color: "#3178C6" },
    { name: "React", level: 95, color: "#61DAFB" },
    { name: "Node.js", level: 88, color: "#339933" },
    { name: "Python", level: 85, color: "#3776AB" },
    { name: "AWS", level: 92, color: "#FF9900" },
    { name: "Google Cloud", level: 88, color: "#4285F4" },
    { name: "Docker", level: 90, color: "#2496ED" },
    { name: "Kubernetes", level: 85, color: "#326CE5" },
    { name: "Terraform", level: 82, color: "#623CE4" },
    { name: "PostgreSQL", level: 88, color: "#336791" },
    { name: "Redis", level: 80, color: "#DC382D" }
  ];

  const cloudSkills = [
    { category: "AWS Services", skills: ["EC2", "ECS", "Lambda", "S3", "RDS", "CloudFormation", "CloudWatch", "API Gateway"] },
    { category: "Google Cloud", skills: ["Compute Engine", "Cloud Run", "BigQuery", "Cloud Storage", "Pub/Sub", "Cloud Functions"] },
    { category: "DevOps & Infrastructure", skills: ["Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitHub Actions"] },
    { category: "Monitoring & Security", skills: ["Prometheus", "Grafana", "ELK Stack", "AWS IAM", "Cloud Security", "Network Security"] }
  ];

  const projects = [
    {
      id: 1,
      title: "Cloud-Native E-commerce Platform",
      description: "Scalable microservices architecture deployed on AWS with auto-scaling, load balancing, and multi-region deployment. Handles 100K+ concurrent users with 99.9% uptime.",
      tech: ["AWS", "Kubernetes", "Docker", "React", "Node.js", "PostgreSQL", "Redis", "Terraform"],
      github: "https://github.com/micci184/ecommerce-platform",
      live: "https://ecommerce-platform.vercel.app",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "AI-Powered Analytics Dashboard",
      description: "Real-time analytics platform using Google Cloud ML APIs, BigQuery for data processing, and React for visualization. Processes 1M+ events daily with machine learning insights.",
      tech: ["Google Cloud", "BigQuery", "Cloud Functions", "React", "Python", "TensorFlow", "Docker"],
      github: "https://github.com/micci184/analytics-dashboard",
      live: "https://analytics-dashboard.com",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "Infrastructure as Code Template",
      description: "Complete Terraform modules for AWS infrastructure deployment. Includes VPC setup, EKS cluster, RDS, monitoring, and security configurations with best practices.",
      tech: ["Terraform", "AWS", "Kubernetes", "Helm", "Prometheus", "Grafana"],
      github: "https://github.com/micci184/aws-terraform-modules",
      live: "https://terraform-modules.micci184.dev",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      featured: false
    }
  ];

  const experiences = [
    {
      title: "Senior Cloud Engineer",
      company: "TechCorp",
      period: "2022 - Present",
      description: "Leading cloud infrastructure design and implementation for enterprise applications. Architecting scalable solutions on AWS and Google Cloud with focus on cost optimization and security.",
      achievements: ["AWS Solutions Architect", "50% cost reduction", "99.9% uptime SLA", "Multi-region deployment"]
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022", 
      description: "Built cloud-native applications with modern tech stack. Implemented CI/CD pipelines, containerized applications, and managed Kubernetes clusters in production.",
      achievements: ["Docker & K8s expert", "CI/CD automation", "Microservices architecture", "Real-time systems"]
    },
    {
      title: "Frontend Developer",
      company: "WebStudio",
      period: "2019 - 2020",
      description: "Developed responsive web applications and collaborated with DevOps teams to implement modern deployment strategies using cloud platforms.",
      achievements: ["React specialist", "Cloud deployment", "Performance optimization", "Modern tooling"]
    }
  ];

  const renderHome = () => (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-6">
          <div className="inline-block">
            <div className="glass px-6 py-3 rounded-full neon-glow">
              <span className="text-primary font-mono text-sm">
                ● Available for hire
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="font-heading text-primary">
              micci184
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Full Stack Engineer
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-slate">
              & Cloud Architect
            </h3>
            <p className="text-xl md:text-2xl text-slate max-w-2xl mx-auto">
              Building scalable cloud solutions with cutting-edge technologies
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg neon-glow"
            onClick={() => setActiveSection("projects")}
          >
            <Play className="w-5 h-5 mr-2" />
            View My Work
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
            onClick={() => setActiveSection("contact")}
          >
            <Mail className="w-5 h-5 mr-2" />
            Get In Touch
          </Button>
        </div>

        <div className="terminal glass max-w-3xl mx-auto mt-12">
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <span className="text-gray-400 text-sm ml-4">micci184@cloud-workstation</span>
          </div>
          <div className="space-y-2">
            {terminalLines.map((line, index) => (
              <div key={index} className="text-sm">
                {line.startsWith('$') ? (
                  <span className="text-primary">{line}</span>
                ) : line.includes('Account:') ? (
                  <span className="text-yellow-400">{line}</span>
                ) : line.includes('Ready') || line.includes('nodes') ? (
                  <span className="text-green-400">{line}</span>
                ) : (
                  <span className="text-cyan-400">{line}</span>
                )}
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-primary">$ </span>
              <div className="w-2 h-4 bg-primary ml-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="flex items-center justify-center h-full p-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
            <div className="space-y-4 text-light-slate text-lg leading-relaxed">
              <p>
                Hi! I'm <span className="text-primary font-semibold">micci184</span>, a passionate full-stack engineer and cloud architect 
                who specializes in building scalable, cloud-native applications. My journey started in 2019, 
                and I've since focused on mastering both development and cloud infrastructure.
              </p>
              <p>
                Today, I specialize in designing and implementing cloud solutions on AWS and Google Cloud Platform, 
                building microservices architectures, and creating high-performance web applications. 
                I have extensive experience with containerization, orchestration, and DevOps practices.
              </p>
              <p>
                When I'm not architecting cloud solutions, you'll find me contributing to open source projects, 
                exploring new cloud services, or sharing knowledge about cloud-native development patterns.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cloudSkills.map((skillGroup) => (
                <div key={skillGroup.category} className="glass p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-primary mb-3">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2 py-1 bg-muted rounded text-xs text-light-slate border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass p-8 rounded-2xl neon-glow float-animation">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <Cloud className="w-8 h-8 text-background" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">5+ Years</h4>
                  <p className="text-slate">Cloud & Development Experience</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-slate">Cloud Projects</div>
                </div>
                <div className="glass p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-slate">Uptime SLA</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5 text-primary" />
                  <span className="text-white">Cloud Architecture</span>
                </div>
                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-primary" />
                  <span className="text-white">Microservices Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-white">Security & Compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-primary" />
                  <span className="text-white">Performance Optimization</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h5 className="text-white font-semibold mb-2">Certifications</h5>
                <div className="space-y-1 text-sm text-light-slate">
                  <div>• AWS Solutions Architect</div>
                  <div>• Google Cloud Professional</div>
                  <div>• Kubernetes Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="flex items-center justify-center h-full p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Professional Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="glass p-8 rounded-2xl hover:neon-glow transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{exp.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-medium text-lg">{exp.company}</span>
                      <span className="text-slate">•</span>
                      <span className="text-slate">{exp.period}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                
                <p className="text-light-slate text-lg mb-6 leading-relaxed">{exp.description}</p>
                
                <div className="flex flex-wrap gap-3">
                  {exp.achievements.map((achievement, i) => (
                    <span 
                      key={i} 
                      className="glass px-4 py-2 rounded-full text-sm text-primary border border-primary/20"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="flex items-center justify-center h-full p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Projects</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.filter(p => p.featured).map((project) => (
            <div key={project.id} className="glass rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-4">{project.title}</h3>
                <p className="text-light-slate mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-muted rounded-full text-sm text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10 px-8 py-4"
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="flex items-center justify-center h-full p-8">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
          <p className="text-xl text-light-slate max-w-2xl mx-auto leading-relaxed">
            I'm always interested in new opportunities and exciting cloud projects. 
            Whether you need a cloud architect, full-stack developer, or just want to chat about tech, 
            feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="glass p-8 rounded-2xl hover:neon-glow transition-all duration-300 group">
            <Mail className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <p className="text-slate mb-4">Drop me a line anytime</p>
            <Button 
              asChild 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href="mailto:contact@micci184.dev">
                Send Email
              </a>
            </Button>
          </div>

          <div className="glass p-8 rounded-2xl hover:neon-glow transition-all duration-300 group">
            <Download className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold text-white mb-2">Resume</h3>
            <p className="text-slate mb-4">View my full experience</p>
            <Button 
              asChild 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-white mb-8">Connect With Me</h3>
          <div className="flex justify-center gap-6">
            {socialItems.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300 group"
              >
                <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "home": return renderHome();
      case "about": return renderAbout();
      case "experience": return renderExperience();
      case "projects": return renderProjects();
      case "contact": return renderContact();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground overflow-hidden">
      {/* Left Sidebar Navigation */}
      <div className="w-80 glass border-r border-border/20 flex flex-col">
        {/* Logo */}
        <div className="p-8 border-b border-border/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center neon-glow">
              <span className="text-background font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">micci184</h1>
              <p className="text-sm text-slate">Cloud Engineer</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {navItems.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 group ${
                  activeSection === id 
                    ? 'bg-primary/10 text-primary border border-primary/20 neon-glow' 
                    : 'text-slate hover:text-white hover:bg-muted/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{name}</span>
                {activeSection === id && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Social Links */}
        <div className="p-6 border-t border-border/20">
          <div className="flex justify-center gap-4">
            {socialItems.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:neon-glow transition-all duration-300 group"
              >
                <Icon className="w-5 h-5 text-slate group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="p-6 border-t border-border/20">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate">Available for work</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        <div className={`h-full transition-all duration-700 ease-in-out transform ${
          isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
        }`}>
          {renderContent()}
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}