import { BookOpen, Heart, MapPin, Stethoscope, Users, AlertCircle } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              Healthcare for Everyone, Everywhere
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              Bridging the healthcare gap in rural areas through digital literacy and easy access to health resources
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/education">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Start Learning
                </Button>
              </Link>
              <Link to="/healthcare">
                <Button size="lg" variant="outline" className="w-full border-2 border-white bg-white/10 text-white hover:bg-white hover:text-primary sm:w-auto">
                  Find Healthcare
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How We Help You
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Empowering rural communities with essential health knowledge and resources
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={BookOpen}
              title="Health Education"
              description="Learn about hygiene, nutrition, vaccination, and common diseases in simple language"
              link="/education"
              gradient="bg-gradient-to-br from-primary to-accent"
            />
            <FeatureCard
              icon={Stethoscope}
              title="Find Healthcare"
              description="Locate nearby hospitals, clinics, and connect with doctors for teleconsultation"
              link="/healthcare"
              gradient="bg-gradient-to-br from-secondary to-secondary-light"
            />
            <FeatureCard
              icon={Heart}
              title="Digital Literacy"
              description="Step-by-step tutorials to use digital health tools and book appointments online"
              link="/literacy"
              gradient="bg-gradient-to-br from-accent to-primary-light"
            />
            <FeatureCard
              icon={AlertCircle}
              title="Emergency Resources"
              description="Quick access to emergency numbers and nearby medical facilities"
              link="/emergency"
              gradient="bg-gradient-to-br from-destructive to-destructive/70"
            />
            <FeatureCard
              icon={Users}
              title="Community Support"
              description="Ask health questions and get answers from verified medical sources"
              link="/community"
              gradient="bg-gradient-to-br from-primary-light to-secondary"
            />
            <FeatureCard
              icon={MapPin}
              title="Offline Access"
              description="Access important health information even with slow or no internet"
              link="/offline"
              gradient="bg-gradient-to-br from-secondary-light to-accent"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of people improving their health literacy and accessing better healthcare
            </p>
            <Link to="/education">
              <Button size="lg">
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
