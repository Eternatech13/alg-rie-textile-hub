-- Create table for partnered companies (sociétés conventionnées)
CREATE TABLE public.partner_companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for client information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  ccp_number TEXT NOT NULL,
  ccp_validated BOOLEAN NOT NULL DEFAULT false,
  is_independent BOOLEAN NOT NULL DEFAULT true,
  partner_company_id UUID REFERENCES public.partner_companies(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.partner_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for partner_companies (public read for listing)
CREATE POLICY "Partner companies are viewable by everyone" 
ON public.partner_companies 
FOR SELECT 
USING (is_active = true);

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partner_companies_updated_at
BEFORE UPDATE ON public.partner_companies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample partner companies
INSERT INTO public.partner_companies (name, code) VALUES
  ('Sonatrach', 'SONATRACH'),
  ('Sonelgaz', 'SONELGAZ'),
  ('Air Algérie', 'AIRALGERIE'),
  ('Algérie Télécom', 'ALGERIETELECOM'),
  ('Mobilis', 'MOBILIS'),
  ('Djezzy', 'DJEZZY'),
  ('Ooredoo Algérie', 'OOREDOO'),
  ('Naftal', 'NAFTAL'),
  ('BNA - Banque Nationale d''Algérie', 'BNA'),
  ('CPA - Crédit Populaire d''Algérie', 'CPA');