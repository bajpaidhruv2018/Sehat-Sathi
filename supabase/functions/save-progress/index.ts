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

    const { module_name, module_category, progress_percentage } = await req.json();

    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        module_name,
        module_category,
        progress_percentage,
        completed_at: new Date().toISOString(),
      }, { onConflict: 'user_id,module_name' })
      .select()
      .single();

    if (error) throw error;

    // Check for badge milestones
    const { data: progressCount } = await supabase
      .from('user_progress')
      .select('id', { count: 'exact' })
      .eq('user_id', user.id);

    const count = progressCount?.length || 0;
    const badges = [];

    if (count === 3 || count === 5 || count === 10) {
      const badgeData = {
        3: { name: 'Myth Buster 🏅', type: 'myth_buster', icon: '🏅' },
        5: { name: 'Health Hero ❤️', type: 'health_hero', icon: '❤️' },
        10: { name: 'Guardian 🛡️', type: 'guardian', icon: '🛡️' },
      }[count];

      if (badgeData) {
        const { data: badge, error: badgeError } = await supabase
          .from('badges')
          .insert({
            user_id: user.id,
            badge_type: badgeData.type,
            badge_name: badgeData.name,
            badge_icon: badgeData.icon,
            milestone_value: count,
          })
          .select()
          .single();

        if (!badgeError && badge) {
          badges.push(badge);
        }
      }
    }

    return new Response(JSON.stringify({ progress: data, newBadges: badges }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving progress:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});