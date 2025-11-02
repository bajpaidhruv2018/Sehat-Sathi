import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { XCircle, CheckCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem("hasSeenHealthMythsPopup");
    
    if (!hasSeenPopup) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenHealthMythsPopup", "true");
  };

  const handleExplore = () => {
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md md:max-w-2xl border-2 border-primary/30 bg-gradient-to-br from-background via-primary/5 to-secondary/5 animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
        
        <DialogHeader className="space-y-4 pt-2">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg animate-pulse">
            <XCircle className="h-10 w-10 text-white" />
          </div>
          
          <DialogTitle className="text-center font-heading text-2xl md:text-3xl font-bold text-foreground">
            Discover Health Myths ✨
          </DialogTitle>
          
          <DialogTitle className="text-center font-heading text-xl md:text-2xl font-semibold text-muted-foreground">
            स्वास्थ्य से जुड़ी गलतफहमियाँ जानें
          </DialogTitle>
          
          <DialogDescription className="text-center text-base md:text-lg text-muted-foreground space-y-4 pt-2">
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-left">
                <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Learn the Truth</p>
                  <p className="text-sm">Discover facts about common health misconceptions</p>
                  <p className="text-sm text-muted-foreground">आम स्वास्थ्य गलतफहमियों की सच्चाई जानें</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Interactive Cards</p>
                  <p className="text-sm">Tap each card to flip and reveal verified health facts</p>
                  <p className="text-sm text-muted-foreground">प्रत्येक कार्ड को टैप करें और सत्यापित स्वास्थ्य तथ्य देखें</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <div className="h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xl">▶️</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Video Resources</p>
                  <p className="text-sm">Watch helpful videos to learn more about each topic</p>
                  <p className="text-sm text-muted-foreground">प्रत्येक विषय के बारे में अधिक जानने के लिए वीडियो देखें</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-primary">
                💡 Look for the sparkling ✨ "Health Myths" tab in the navigation menu!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                नेविगेशन मेनू में चमकदार ✨ "Health Myths" टैब देखें!
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 rounded-xl"
          >
            Maybe Later / बाद में
          </Button>
          <Link to="/misconceptions" className="flex-1" onClick={handleExplore}>
            <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300">
              Explore Now / अभी देखें ✨
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
