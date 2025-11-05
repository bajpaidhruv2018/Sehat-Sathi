import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface HealthCenter {
  id: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
  phone: string;
  address: string;
}

const mockCenters: HealthCenter[] = [
  { id: 1, name: "Primary Health Center - Mandvi", type: "PHC", lat: 22.8296, lng: 70.0594, phone: "+91-2834-220123", address: "Near Bus Stand, Mandvi" },
  { id: 2, name: "Community Health Center - Bhuj", type: "CHC", lat: 23.2420, lng: 69.6669, phone: "+91-2832-250234", address: "Hospital Road, Bhuj" },
  { id: 3, name: "District Hospital - Kutch", type: "Hospital", lat: 23.2600, lng: 69.6700, phone: "+91-2832-250345", address: "Civil Hospital Campus, Bhuj" },
  { id: 4, name: "Rural Health Center - Nakhatrana", type: "PHC", lat: 23.3050, lng: 69.1650, phone: "+91-2837-220456", address: "Main Road, Nakhatrana" },
];

const HealthLocator = () => {
  const [selectedCenter, setSelectedCenter] = useState<HealthCenter | null>(null);
  const { toast } = useToast();

  const handleCall = (phone: string, name: string) => {
    window.location.href = `tel:${phone}`;
    toast({
      title: "Calling...",
      description: `Connecting you to ${name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Healthcare Centers</h1>
          <p className="text-muted-foreground">Locate nearby health facilities in rural areas</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Healthcare Centers Map</CardTitle>
              <CardDescription>Click on a marker to see details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[500px] bg-muted rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="font-semibold text-foreground mb-2">Interactive Map Coming Soon</p>
                      <p className="text-sm text-muted-foreground">
                        View health centers on the list below
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Static markers visualization */}
                <div className="absolute inset-0 pointer-events-none">
                  {mockCenters.map((center, idx) => (
                    <div
                      key={center.id}
                      className="absolute animate-pulse"
                      style={{
                        left: `${20 + idx * 20}%`,
                        top: `${30 + (idx % 2) * 30}%`,
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Available Health Centers</CardTitle>
                <CardDescription>Primary Health Centers and Hospitals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCenters.map((center) => (
                  <Card 
                    key={center.id} 
                    className="border-2 hover:border-primary/50 transition-all cursor-pointer hover:scale-[1.02]"
                    onClick={() => setSelectedCenter(center)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold text-foreground">{center.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{center.address}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                              {center.type}
                            </span>
                            <span className="text-xs text-muted-foreground">{center.phone}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(center.phone, center.name);
                          }}
                          className="shrink-0"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {selectedCenter && (
              <Card className="bg-primary/5 border-primary/20 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Selected Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-foreground">{selectedCenter.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCenter.address}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleCall(selectedCenter.phone, selectedCenter.name)}
                        className="flex-1"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthLocator;