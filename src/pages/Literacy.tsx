import { useState } from "react";
import { Smartphone, Calendar, FileText, CreditCard, Wifi, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

const Literacy = () => {
  const { t } = useTranslation();
  
  // State to track which tutorial is currently active (open in popup)
  const [activeTutorialIndex, setActiveTutorialIndex] = useState<number | null>(null);
  
  // State to track completed steps: { [tutorialIndex]: [stepIndex1, stepIndex2] }
  const [completedSteps, setCompletedSteps] = useState<Record<number, number[]>>({});

  const tutorials = [
    {
      icon: Smartphone,
      title: t('literacy.tutorials.apps.title'),
      level: t('literacy.levels.beginner'),
      duration: "10 min",
      description: t('literacy.tutorials.apps.desc'),
      steps: t('literacy.tutorials.apps.steps', { returnObjects: true }) as string[],
    },
    {
      icon: Calendar,
      title: t('literacy.tutorials.booking.title'),
      level: t('literacy.levels.beginner'),
      duration: "8 min",
      description: t('literacy.tutorials.booking.desc'),
      steps: t('literacy.tutorials.booking.steps', { returnObjects: true }) as string[],
    },
    {
      icon: FileText,
      title: t('literacy.tutorials.prescriptions.title'),
      level: t('literacy.levels.beginner'),
      duration: "6 min",
      description: t('literacy.tutorials.prescriptions.desc'),
      steps: t('literacy.tutorials.prescriptions.steps', { returnObjects: true }) as string[],
    },
    {
      icon: CreditCard,
      title: t('literacy.tutorials.payment.title'),
      level: t('literacy.levels.intermediate'),
      duration: "12 min",
      description: t('literacy.tutorials.payment.desc'),
      steps: t('literacy.tutorials.payment.steps', { returnObjects: true }) as string[],
    },
    {
      icon: Wifi,
      title: t('literacy.tutorials.telemedicine.title'),
      level: t('literacy.levels.intermediate'),
      duration: "15 min",
      description: t('literacy.tutorials.telemedicine.desc'),
      steps: t('literacy.tutorials.telemedicine.steps', { returnObjects: true }) as string[],
    },
    {
      icon: Shield,
      title: t('literacy.tutorials.privacy.title'),
      level: t('literacy.levels.intermediate'),
      duration: "10 min",
      description: t('literacy.tutorials.privacy.desc'),
      steps: t('literacy.tutorials.privacy.steps', { returnObjects: true }) as string[],
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case t('literacy.levels.beginner'):
      case "Beginner":
      case "शुरुआती":
        return "bg-green-500";
      case t('literacy.levels.intermediate'):
      case "Intermediate":
      case "मध्यम":
        return "bg-orange-500";
      case t('literacy.levels.advanced'):
      case "Advanced":
      case "उन्नत":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Helper to get a semi-transparent color for the "water fill" effect
  const getProgressColor = (level: string) => {
    switch (level) {
      case t('literacy.levels.beginner'):
      case "Beginner":
      case "शुरुआती":
        return "rgba(34, 197, 94, 0.2)"; // Green with opacity
      case t('literacy.levels.intermediate'):
      case "Intermediate":
      case "मध्यम":
        return "rgba(249, 115, 22, 0.2)"; // Orange with opacity
      case t('literacy.levels.advanced'):
      case "Advanced":
      case "उन्नत":
        return "rgba(239, 68, 68, 0.2)"; // Red with opacity
      default:
        return "rgba(107, 114, 128, 0.2)";
    }
  };

  const toggleStep = (tutorialIndex: number, stepIndex: number) => {
    setCompletedSteps(prev => {
      const currentCompleted = prev[tutorialIndex] || [];
      const isCompleted = currentCompleted.includes(stepIndex);
      
      let newCompleted;
      if (isCompleted) {
        newCompleted = currentCompleted.filter(i => i !== stepIndex);
      } else {
        newCompleted = [...currentCompleted, stepIndex];
      }
      
      return {
        ...prev,
        [tutorialIndex]: newCompleted
      };
    });
  };

  // Get the currently active tutorial object based on state
  const activeTutorial = activeTutorialIndex !== null ? tutorials[activeTutorialIndex] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-br from-accent/10 to-primary/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold text-foreground">{t('literacy.title')}</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {t('literacy.subtitle')}
          </p>
        </div>
      </section>

      {/* Progress Banner */}
      <section className="border-b border-border bg-muted py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('literacy.progress.title')}</p>
              <p className="text-2xl font-bold text-foreground">{t('literacy.progress.status')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-green-500 text-green-700">
                {t('literacy.progress.beginner')}
              </Badge>
              <Badge variant="outline" className="border-orange-500 text-orange-700">
                {t('literacy.progress.intermediate')}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tutorial, index) => {
              const IconComponent = tutorial.icon;
              
              // Calculate progress
              const completedCount = (completedSteps[index] || []).length;
              const totalSteps = tutorial.steps.length;
              const progressPercentage = Math.round((completedCount / totalSteps) * 100);
              
              // Create the linear gradient for the "water fill" effect
              const fillStyle = {
                backgroundImage: `linear-gradient(to top, ${getProgressColor(tutorial.level)} ${progressPercentage}%, transparent ${progressPercentage}%)`,
                transition: 'background-image 0.5s ease-in-out'
              };

              return (
                <Card
                  key={index}
                  className="group cursor-pointer overflow-hidden border-2 border-border transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:shadow-soft relative"
                  style={fillStyle}
                  onClick={() => setActiveTutorialIndex(index)}
                >
                  <CardHeader>
                    <div className="mb-3 flex items-center justify-between">
                      <Badge className={`${getLevelColor(tutorial.level)} text-white`}>
                        {tutorial.level}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {completedCount}/{totalSteps} {t('literacy.steps_completed', { defaultValue: 'Steps' })}
                      </span>
                    </div>
                    <div className="mb-4 flex items-center gap-3">
                      {/* --- MODIFIED SECTION --- */}
                      {/* Removed 'bg-white' to keep the gradient background */}
                      {/* Changed 'text-primary' to 'text-white' for the icon */}
                      <div className="rounded-xl bg-gradient-hero p-3 shadow-md z-10">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      {/* ------------------------ */}
                      <div className="flex flex-col">
                        <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                        <span className="text-xs text-muted-foreground">{tutorial.duration}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">{tutorial.description}</p>
                    <div className="flex justify-center pt-2">
                      <p className="text-xs font-medium text-primary uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                        {t('literacy.tap_to_start', { defaultValue: 'Tap to View Steps' })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Task Dialog / Popup */}
      <Dialog 
        open={activeTutorialIndex !== null} 
        onOpenChange={(open) => !open && setActiveTutorialIndex(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              {activeTutorial && (
                <div className={`p-2 rounded-lg ${getLevelColor(activeTutorial.level)} text-white`}>
                  <activeTutorial.icon className="h-5 w-5" />
                </div>
              )}
              <DialogTitle>{activeTutorial?.title}</DialogTitle>
            </div>
            <DialogDescription>
              {t('literacy.dialog_desc', { defaultValue: 'Follow these steps to complete the lesson.' })}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {activeTutorial && (() => {
               // Calculate progress for the active item
               const activeIdx = activeTutorialIndex as number;
               const completedCount = (completedSteps[activeIdx] || []).length;
               const totalSteps = activeTutorial.steps.length;
               const percentage = Math.round((completedCount / totalSteps) * 100);

               return (
                <>
                  <div className="flex items-center justify-between text-sm">
                     <span className="font-medium">Progress</span>
                     <span className="text-muted-foreground">{percentage}%</span>
                  </div>
                  {/* Progress Bar inside Dialog */}
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${getLevelColor(activeTutorial.level)}`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <ul className="space-y-3 mt-4">
                    {activeTutorial.steps.map((step, stepIdx) => {
                      const isChecked = (completedSteps[activeIdx] || []).includes(stepIdx);
                      return (
                        <li 
                          key={stepIdx} 
                          className="flex items-start gap-3 rounded-md border p-3 hover:bg-accent/50 transition-colors"
                        >
                          <Checkbox 
                            id={`step-${stepIdx}`}
                            checked={isChecked}
                            onCheckedChange={() => toggleStep(activeIdx, stepIdx)}
                          />
                          <label 
                            htmlFor={`step-${stepIdx}`}
                            className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${isChecked ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                          >
                            {step}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </>
               );
            })()}
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Section */}
      <section className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">{t('literacy.help.title')}</h2>
            <p className="mb-6 text-muted-foreground">
              {t('literacy.help.desc')}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Badge variant="outline" className="py-2 text-sm">
                {t('literacy.help.audio')}
              </Badge>
              <Badge variant="outline" className="py-2 text-sm">
                {t('literacy.help.offline')}
              </Badge>
              <Badge variant="outline" className="py-2 text-sm">
                {t('literacy.help.lang')}
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Literacy;