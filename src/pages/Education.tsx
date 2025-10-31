import { Droplets, Syringe, Apple, Pill, Shield, Baby } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const educationTopics = [
  {
    icon: Droplets,
    title: "Hygiene & Sanitation",
    description: "Learn proper handwashing, water purification, and keeping your environment clean",
    color: "bg-blue-500",
    topics: ["Handwashing techniques", "Safe water practices", "Food hygiene", "Waste disposal"],
  },
  {
    icon: Syringe,
    title: "Vaccination",
    description: "Understanding vaccines, schedules, and importance for children and adults",
    color: "bg-green-500",
    topics: ["Childhood vaccines", "Adult immunization", "Vaccine safety", "Schedule tracking"],
  },
  {
    icon: Apple,
    title: "Nutrition & Diet",
    description: "Balanced diet, nutritional needs, and healthy eating habits for all ages",
    color: "bg-orange-500",
    topics: ["Balanced meals", "Child nutrition", "Maternal health", "Food groups"],
  },
  {
    icon: Pill,
    title: "Common Diseases",
    description: "Prevention, symptoms, and treatment of common illnesses in rural areas",
    color: "bg-red-500",
    topics: ["Fever management", "Diarrhea treatment", "Cold & flu", "Skin infections"],
  },
  {
    icon: Shield,
    title: "Disease Prevention",
    description: "Simple steps to prevent common diseases and maintain good health",
    color: "bg-purple-500",
    topics: ["Mosquito protection", "Clean drinking water", "Personal hygiene", "Immunity boost"],
  },
  {
    icon: Baby,
    title: "Mother & Child Care",
    description: "Essential care during pregnancy, childbirth, and early childhood",
    color: "bg-pink-500",
    topics: ["Prenatal care", "Safe delivery", "Breastfeeding", "Baby care"],
  },
];

const Education = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Health Education</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Learn essential health topics in simple language with visual guides. Tap any card to explore detailed information.
          </p>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {educationTopics.map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <Card
                  key={index}
                  className="group cursor-pointer overflow-hidden border-2 border-border transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-soft"
                >
                  <CardHeader>
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`rounded-xl ${topic.color} p-3 shadow-md`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{topic.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">{topic.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Topics covered:</p>
                      <ul className="space-y-1">
                        {topic.topics.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="border-t border-border bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              All Content Available Offline
            </h2>
            <p className="text-muted-foreground">
              Once you've opened a topic, the information is saved on your device and can be accessed even without internet connection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
