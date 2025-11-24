import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <CosmicBackground>
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto p-8">
          <div className="space-y-4">
            <h1 className="text-8xl font-black text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
              404
            </h1>
            <h2 className="text-3xl font-bold text-foreground">
              Lost in the Cosmos
            </h2>
            <p className="text-lg text-muted-foreground">
              This star has drifted beyond the known universe. The page you're looking for doesn't exist in our galaxy.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground font-bold px-8 py-4 text-lg rounded-xl shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.8)] transition-all duration-300"
              onClick={() => window.location.href = '/'}
            >
              🚀 Return to Base
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Error Code: STAR_NOT_FOUND_{location.pathname.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </CosmicBackground>
  );
};

export default NotFound;
