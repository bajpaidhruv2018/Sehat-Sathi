-- Create enum for badge types
CREATE TYPE badge_type AS ENUM ('myth_buster', 'health_hero', 'literacy_champion', 'explorer', 'guardian');

-- Create user_progress table for tracking module completion
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module_name TEXT NOT NULL,
  module_category TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  progress_percentage INTEGER DEFAULT 0,
  UNIQUE(user_id, module_name)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid()::text = user_id::text);

-- Create badges table
CREATE TABLE public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_type badge_type NOT NULL,
  badge_name TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  milestone_value INTEGER NOT NULL,
  UNIQUE(user_id, badge_type, milestone_value)
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges"
  ON public.badges FOR SELECT
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own badges"
  ON public.badges FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

-- Create health_tips table
CREATE TABLE public.health_tips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tip_english TEXT NOT NULL,
  tip_hindi TEXT NOT NULL,
  category TEXT NOT NULL,
  priority INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.health_tips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view health tips"
  ON public.health_tips FOR SELECT
  USING (true);

-- Create doctor_questions table
CREATE TABLE public.doctor_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  name TEXT NOT NULL,
  question TEXT NOT NULL,
  category TEXT NOT NULL,
  response TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.doctor_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own questions"
  ON public.doctor_questions FOR SELECT
  USING (auth.uid()::text = user_id::text OR user_id IS NULL);

CREATE POLICY "Anyone can insert questions"
  ON public.doctor_questions FOR INSERT
  WITH CHECK (true);

-- Insert sample health tips
INSERT INTO public.health_tips (tip_english, tip_hindi, category, priority) VALUES
('Drink 8 glasses of water daily for better health', 'बेहतर स्वास्थ्य के लिए प्रतिदिन 8 गिलास पानी पिएं', 'general', 1),
('Wash hands regularly to prevent infections', 'संक्रमण को रोकने के लिए नियमित रूप से हाथ धोएं', 'hygiene', 1),
('Exercise for 30 minutes daily to stay fit', 'फिट रहने के लिए रोजाना 30 मिनट व्यायाम करें', 'fitness', 1),
('Eat fresh fruits and vegetables every day', 'प्रतिदिन ताजे फल और सब्जियां खाएं', 'nutrition', 1),
('Get 7-8 hours of sleep for good health', 'अच्छे स्वास्थ्य के लिए 7-8 घंटे की नींद लें', 'sleep', 1);