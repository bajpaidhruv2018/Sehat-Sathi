import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { name, question, category } = await req.json();

    if (!name || !question || !category) {
      throw new Error('Missing required fields');
    }

    // Get user if authenticated
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    
    if (authHeader) {
      const userClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
      );
      const { data: { user } } = await userClient.auth.getUser();
      userId = user?.id;
    }

    // Save question
    const { data: savedQuestion, error: saveError } = await supabase
      .from('doctor_questions')
      .insert({
        user_id: userId,
        name,
        question,
        category,
        status: 'pending',
      })
      .select()
      .single();

    if (saveError) throw saveError;

    // Generate mock verified response using Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a certified health advisor providing general health guidance. Always remind users to consult with a healthcare professional for serious concerns. Keep responses under 150 words, friendly and professional.',
          },
          {
            role: 'user',
            content: `Category: ${category}\nQuestion: ${question}`,
          }
        ],
      }),
    });

    const aiData = await aiResponse.json();
    const response = aiData.choices?.[0]?.message?.content || 'Thank you for your question. Please consult with a healthcare professional for personalized advice.';

    // Update with response
    await supabase
      .from('doctor_questions')
      .update({
        response,
        status: 'answered',
        responded_at: new Date().toISOString(),
      })
      .eq('id', savedQuestion.id);

    return new Response(JSON.stringify({ 
      question: savedQuestion,
      response,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing doctor question:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});