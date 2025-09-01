-- MinuteMade Schema
-- Voice Assistant with Gmail + Discord

-- PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR UNIQUE,
  avatar_url VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CONNECTED_SERVICES - (Gmail + Discord)
CREATE TABLE IF NOT EXISTS connected_services (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  title VARCHAR NOT NULL,
  description TEXT NOT NULL
);

-- EVENT_CREDENTIALS
CREATE TABLE IF NOT EXISTS event_credentials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  service_id INTEGER REFERENCES connected_services(id) ON DELETE CASCADE NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_token TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, service_id)
);

-- TRANSCRIPTION
CREATE TABLE IF NOT EXISTS transcriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  chat_id VARCHAR NOT NULL,
  transcribed_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EVENTS - from Gmail/Discord
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  service_event_id VARCHAR,
  service_id INTEGER REFERENCES connected_services(id) ON DELETE SET NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  priority VARCHAR CHECK (priority IN ('urgent', 'important', 'regular', 'tomorrow')) DEFAULT 'important',
  status VARCHAR CHECK (status IN ('incomplete', 'in_progress', 'done')) DEFAULT 'incomplete',
  event_begin TIMESTAMP WITH TIME ZONE,
  event_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies
-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Connected services are public (read-only for users)
ALTER TABLE connected_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view services" ON connected_services FOR SELECT USING (true);

-- Event credentials are private to each user
ALTER TABLE event_credentials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own credentials" ON event_credentials FOR ALL USING (auth.uid() = user_id);

-- Transcriptions are private to each user
ALTER TABLE transcriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own transcriptions" ON transcriptions FOR ALL USING (auth.uid() = user_id);

-- Events are private to each user
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own events" ON events FOR ALL USING (auth.uid() = user_id);

-- Auto-update timestamps function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_event_credentials_updated_at BEFORE UPDATE ON event_credentials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Pre-populate connected services
INSERT INTO connected_services (name, title, description) VALUES
('Gmail', 'Gmail', 'Access Gmail emails for event extraction'),
('Discord', 'Discord', 'Access Discord messages for event extraction')
ON CONFLICT (name) DO NOTHING;
