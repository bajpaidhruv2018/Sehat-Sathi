import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Stethoscope, Loader2 } from "lucide-react";

const AskDoctor = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !question || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const { data, error } = await supabase.functions.invoke('ask-doctor', {
        body: { name, question, category },
      });

      if (error) throw error;

      setResponse(data.response);
      toast({
        title: "Response Received",
        description: "Your question has been answered by our health advisor",
      });

      // Clear form
      setName("");
      setQuestion("");
      setCategory("");
    } catch (error) {
      console.error('Error submitting question:', error);
      toast({
        title: "Error",
        description: "Failed to submit question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Stethoscope className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Ask a Health Advisor</h1>
          <p className="text-muted-foreground">Get verified health guidance for your questions</p>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Submit Your Question</CardTitle>
            <CardDescription>
              Our health advisors will provide general guidance. For serious concerns, please consult a healthcare professional.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={loading}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Health</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="mental">Mental Health</SelectItem>
                    <SelectItem value="chronic">Chronic Conditions</SelectItem>
                    <SelectItem value="preventive">Preventive Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question">Your Question</Label>
                <Textarea
                  id="question"
                  placeholder="Describe your health concern or question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={6}
                  disabled={loading}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Response...
                  </>
                ) : (
                  <>
                    <Stethoscope className="mr-2 h-4 w-4" />
                    Submit Question
                  </>
                )}
              </Button>
            </form>

            {response && (
              <Card className="mt-6 bg-primary/5 border-primary/20 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Health Advisor Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{response}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    ⚠️ This is general guidance. Please consult with a healthcare professional for personalized medical advice.
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AskDoctor;