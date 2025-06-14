import { Badge } from "./ui/badge";
import { useState } from "react";

interface ModernSkillCardProps {
  title: string;
  skills: string[];
  icon: string;
  description: string;
}

export function ModernSkillCard({ title, skills, icon, description }: ModernSkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative bg-card border border-border rounded-xl p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="border border-primary/20"></div>
          ))}
        </div>
      </div>
      
      {/* Animated corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/30 transition-all duration-300 group-hover:border-primary/80"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary/30 transition-all duration-300 group-hover:border-primary/80"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary/30 transition-all duration-300 group-hover:border-primary/80"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary/30 transition-all duration-300 group-hover:border-primary/80"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            <span className="text-xl relative z-10">{icon}</span>
            <div className={`absolute inset-0 bg-primary/10 transition-transform duration-300 ${isHovered ? 'scale-100' : 'scale-0'}`}></div>
          </div>
          <div>
            <h3 className="font-mono">{title}</h3>
            <p className="text-xs text-muted-foreground font-mono">{description}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-mono"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}