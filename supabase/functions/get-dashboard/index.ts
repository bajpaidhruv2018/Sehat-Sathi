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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    // Get progress
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    if (progressError) throw progressError;

    // Get badges
    const { data: badges, error: badgesError } = await supabase
      .from('badges')
      .select('*')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false });

    if (badgesError) throw badgesError;

    return new Response(JSON.stringify({ 
      progress: progress || [], 
      badges: badges || [],
      totalModules: progress?.length || 0,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});