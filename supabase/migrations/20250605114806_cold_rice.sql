/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - full_name (text)
      - subscription_status (text)
      - subscription_end_date (timestamptz)
      - created_at (timestamptz)
    
    - course_progress
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - course_id (integer)
      - completed_modules (jsonb)
      - last_accessed (timestamptz)
      - created_at (timestamptz)
    
    - achievements
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - achievement_type (text)
      - achievement_data (jsonb)
      - unlocked_at (timestamptz)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  full_name text,
  subscription_status text DEFAULT 'free',
  subscription_end_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create course_progress table
CREATE TABLE IF NOT EXISTS course_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id integer NOT NULL,
  completed_modules jsonb DEFAULT '[]',
  last_accessed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  achievement_type text NOT NULL,
  achievement_data jsonb DEFAULT '{}',
  unlocked_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own course progress" ON course_progress
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own course progress" ON course_progress
  FOR ALL TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own achievements" ON achievements
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own achievements" ON achievements
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);