import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { bodyPart, userDescription } = await req.json();

        if (!bodyPart) {
            throw new Error('Body part is required');
        }

        const apiKey = Deno.env.get('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not set');
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Act as a kind, simple-speaking medical assistant for rural India.
      The user is reporting pain or an issue with their "${bodyPart}".
      Additional description: "${userDescription || 'None provided'}".

      Analyze the input for potential emergencies (e.g., snake bites, heavy bleeding, chest pain).
      
      Return strictly a JSON object with the following structure:
      {
        "questions": [
          { "textEn": "Question 1 in English?", "textHi": "Question 1 in Hindi?", "icon": "LucideIconName" },
          { "textEn": "Question 2 in English?", "textHi": "Question 2 in Hindi?", "icon": "LucideIconName" },
          { "textEn": "Question 3 in English?", "textHi": "Question 3 in Hindi?", "icon": "LucideIconName" }
        ],
        "severity": "Low" | "Medium" | "High",
        "medicalTerm": "Specific search term for Google Maps (e.g. 'Trauma Center', 'General Hospital', 'Cardiologist', 'Snake Bite Anti-venom')",
        "action": {
          "textEn": "One simple first-aid step in English.",
          "textHi": "One simple first-aid step in Hindi."
        }
      }

      Use simple language suitable for a rural farmer.
      For the icon, use standard Lucide React icon names like 'AlertCircle', 'Thermometer', 'Activity', 'Bandage', 'Baby', 'Brain', 'Heart', 'Stethoscope'.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response (handling potential markdown blocks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Failed to parse Gemini response');
        }

        const data = JSON.parse(jsonMatch[0]);

        return new Response(
            JSON.stringify(data),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error in triage-assist:', error);
        return new Response(
            JSON.stringify({ error: (error as Error).message || 'Unknown error' }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );
    }
});
