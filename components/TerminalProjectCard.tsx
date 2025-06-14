import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github, Terminal, Play } from "lucide-react";
import { useState } from "react";

interface TerminalProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  command: string;
}

export function TerminalProjectCard({ title, description, technologies, githubUrl, liveUrl, command }: TerminalProjectCardProps) {
  const [isTyping, setIsTyping] = useState(false);

  const handleCommandRun = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <Card className="h-full border-2 border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden group">
      {/* Terminal header */}
      <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <Terminal className="w-4 h-4 text-muted-foreground ml-2" />
        <span className="font-mono text-sm text-muted-foreground">project-terminal</span>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="font-mono">{title}</span>
          <div className="flex gap-2">
            {githubUrl && (
              <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10">
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Command line */}
        <div className="bg-black/90 text-green-400 p-3 rounded-md font-mono text-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-400">$</span>
            <span>{command}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCommandRun}
              className="ml-auto text-green-400 hover:bg-green-400/10 p-1"
            >
              <Play className="w-3 h-3" />
            </Button>
          </div>
          {isTyping && (
            <div className="text-green-300 text-xs">
              <div className="animate-pulse">Running...</div>
              <div className="animate-pulse delay-500">Build successful ✓</div>
              <div className="animate-pulse delay-1000">Ready on http://localhost:3000</div>
            </div>
          )}
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs font-mono hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}