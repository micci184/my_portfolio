import { Badge } from "./ui/badge";

interface SkillCardProps {
  title: string;
  skills: string[];
  icon: string;
  color: string;
}

export function SkillCard({ title, skills, icon }: SkillCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-all duration-300 hover:translate-y-[-2px] shadow-sm hover:shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
          <span className="text-lg">{icon}</span>
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="text-xs hover:bg-accent/80 transition-colors"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}