-- MinuteMade Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  meeting_type TEXT CHECK (meeting_type IN ('video', 'phone', 'in-person', 'hybrid')),
  priority TEXT CHECK (priority IN ('urgent', 'important', 'regular', 'low')) DEFAULT 'regular',
  status TEXT CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')) DEFAULT 'scheduled',
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now') NOT NULL
);

-- Create meeting_participants table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS meeting_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('organizer', 'participant', 'optional')) DEFAULT 'participant',
  response TEXT CHECK (response IN ('pending', 'accepted', 'declined', 'tentative')) DEFAULT 'pending',
  joined_at TIMESTAMP WITH TIME ZONE,
  left_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(meeting_id, user_id)
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK (priority IN ('urgent', 'important', 'regular', 'low')) DEFAULT 'regular',
  status TEXT CHECK (status IN ('todo', 'in_progress', 'completed', 'cancelled')) DEFAULT 'todo',
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  meeting_id UUID REFERENCES meetings(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create meeting_notes table
CREATE TABLE IF NOT EXISTS meeting_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create calendar_integrations table
CREATE TABLE IF NOT EXISTS calendar_integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  provider TEXT CHECK (provider IN ('google', 'outlook', 'apple')) NOT NULL,
  external_calendar_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, provider, external_calendar_id)
);

-- Row Level Security Policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Meetings policies
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view meetings they participate in" ON meetings
  FOR SELECT USING (
    auth.uid() = created_by OR
    auth.uid() IN (
      SELECT user_id FROM meeting_participants 
      WHERE meeting_id = meetings.id
    )
  );

CREATE POLICY "Users can create meetings" ON meetings
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Meeting creators can update their meetings" ON meetings
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Meeting creators can delete their meetings" ON meetings
  FOR DELETE USING (auth.uid() = created_by);

-- Meeting participants policies
ALTER TABLE meeting_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view participants for their meetings" ON meeting_participants
  FOR SELECT USING (
    auth.uid() = user_id OR
    auth.uid() IN (
      SELECT created_by FROM meetings WHERE id = meeting_id
    )
  );

CREATE POLICY "Meeting creators can manage participants" ON meeting_participants
  FOR ALL USING (
    auth.uid() IN (
      SELECT created_by FROM meetings WHERE id = meeting_id
    )
  );

-- Tasks policies
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view tasks assigned to them or created by them" ON tasks
  FOR SELECT USING (
    auth.uid() = created_by OR 
    auth.uid() = assigned_to
  );

CREATE POLICY "Users can create tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Task creators and assignees can update tasks" ON tasks
  FOR UPDATE USING (
    auth.uid() = created_by OR 
    auth.uid() = assigned_to
  );

CREATE POLICY "Task creators can delete tasks" ON tasks
  FOR DELETE USING (auth.uid() = created_by);

-- Meeting notes policies
ALTER TABLE meeting_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view notes for meetings they participate in" ON meeting_notes
  FOR SELECT USING (
    auth.uid() = created_by OR
    auth.uid() IN (
      SELECT user_id FROM meeting_participants 
      WHERE meeting_id = meeting_notes.meeting_id
    ) OR
    auth.uid() IN (
      SELECT created_by FROM meetings 
      WHERE id = meeting_notes.meeting_id
    )
  );

CREATE POLICY "Users can create notes for meetings they participate in" ON meeting_notes
  FOR INSERT WITH CHECK (
    auth.uid() = created_by AND
    (auth.uid() IN (
      SELECT user_id FROM meeting_participants 
      WHERE meeting_id = meeting_notes.meeting_id
    ) OR
    auth.uid() IN (
      SELECT created_by FROM meetings 
      WHERE id = meeting_notes.meeting_id
    ))
  );

CREATE POLICY "Note creators can update their notes" ON meeting_notes
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Note creators can delete their notes" ON meeting_notes
  FOR DELETE USING (auth.uid() = created_by);

-- Calendar integrations policies
ALTER TABLE calendar_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own calendar integrations" ON calendar_integrations
  FOR ALL USING (auth.uid() = user_id);

-- Functions

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all relevant tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_meetings_updated_at
  BEFORE UPDATE ON meetings
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_meeting_notes_updated_at
  BEFORE UPDATE ON meeting_notes
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_calendar_integrations_updated_at
  BEFORE UPDATE ON calendar_integrations
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Sample data (optional)
-- You can run this to populate some test data

-- INSERT INTO profiles (id, username, full_name)
-- VALUES 
--   ('00000000-0000-0000-0000-000000000001', 'testuser1', 'Test User 1'),
--   ('00000000-0000-0000-0000-000000000002', 'testuser2', 'Test User 2');
