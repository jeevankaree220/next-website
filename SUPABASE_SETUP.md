# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: template-marketplace
   - **Database Password**: (generate strong password)
   - **Region**: Choose closest to your users
5. Click "Create new project"

## 2. Get Project Credentials

Once project is created, go to **Settings** → **API**:

- **Project URL**: `https://your-project-id.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 3. Environment Variables

Add to your `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_test_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

## 4. Database Schema

Run the SQL commands in Supabase SQL Editor to create tables:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create users table
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create templates table
CREATE TABLE public.templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL, -- Price in paise
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0.0,
  downloads INTEGER DEFAULT 0,
  preview_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchases table
CREATE TABLE public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  template_id UUID REFERENCES public.templates(id) NOT NULL,
  amount INTEGER NOT NULL, -- Amount in paise
  payment_id TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_templates_category ON public.templates(category);
CREATE INDEX idx_templates_is_active ON public.templates(is_active);
CREATE INDEX idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX idx_purchases_template_id ON public.purchases(template_id);
CREATE INDEX idx_purchases_status ON public.purchases(status);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Templates are publicly readable
CREATE POLICY "Templates are publicly readable" ON public.templates
  FOR SELECT USING (is_active = true);

-- Users can view their own purchases
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create purchases
CREATE POLICY "Users can create purchases" ON public.purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 5. Insert Sample Data

```sql
-- Insert sample templates
INSERT INTO public.templates (name, description, price, image_url, category, features, rating, downloads, preview_url) VALUES
('Modern Business Landing', 'Clean and professional landing page perfect for startups and businesses', 299900, '/hero.png', 'Business', ARRAY['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Modern UI'], 4.8, 1250, '/cooking'),
('E-commerce Store', 'Complete e-commerce solution with shopping cart and payment integration', 499900, '/hero.png', 'E-commerce', ARRAY['Shopping Cart', 'Payment Gateway', 'Admin Panel', 'Mobile Ready'], 4.9, 890, '/business'),
('Portfolio Showcase', 'Elegant portfolio template for designers and developers', 199900, '/hero.png', 'Portfolio', ARRAY['Gallery', 'Contact Form', 'Blog Section', 'Dark Mode'], 4.7, 2100, '/travel'),
('Restaurant Website', 'Beautiful restaurant template with menu and reservation system', 399900, '/hero.png', 'Food & Restaurant', ARRAY['Menu Display', 'Online Booking', 'Reviews', 'Location Map'], 4.6, 750, '/cooking'),
('SaaS Dashboard', 'Modern dashboard template for SaaS applications', 599900, '/hero.png', 'SaaS', ARRAY['Analytics', 'User Management', 'Charts', 'Notifications'], 4.9, 650, '/b2bsaas'),
('Travel Agency', 'Stunning travel website with booking functionality', 349900, '/hero.png', 'Travel', ARRAY['Trip Booking', 'Gallery', 'Reviews', 'Multi-language'], 4.8, 980, '/travel');
```
