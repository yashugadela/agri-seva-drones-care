-- Create bookings table for tracking user bookings
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  farmer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  area_size DECIMAL NOT NULL,
  crop_type TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  special_instructions TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

-- Create crops table with paddy and other crops
CREATE TABLE public.crops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  suitable_season TEXT,
  spraying_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial crop data including paddy
INSERT INTO public.crops (name, description, suitable_season, spraying_requirements) VALUES
('Paddy/Rice', 'Rice is a staple crop requiring precise water management and pest control', 'Monsoon season (June-October)', 'Regular spraying for brown planthopper, stem borer, and blast disease'),
('Wheat', 'Major cereal crop grown in winter season', 'Winter season (November-April)', 'Spraying for rust, aphids, and termites'),
('Cotton', 'Cash crop requiring intensive pest management', 'Summer season (April-October)', 'Regular spraying for bollworm, whitefly, and thrips'),
('Sugarcane', 'Long duration crop with high water requirements', 'Year-round', 'Spraying for red rot, smut, and scale insects'),
('Maize/Corn', 'Versatile crop grown in multiple seasons', 'Summer and monsoon', 'Spraying for fall armyworm, stem borer, and leaf blight'),
('Soybean', 'Important legume crop with nitrogen fixing properties', 'Monsoon season', 'Spraying for pod borer, defoliators, and rust');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on bookings
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();