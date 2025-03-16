
-- Check Results Table
CREATE TABLE IF NOT EXISTS check_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  document_name TEXT NOT NULL,
  text_content TEXT NOT NULL,
  overall_score NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Add indexes
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Check Matches Table (for storing detailed match information)
CREATE TABLE IF NOT EXISTS check_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  check_id UUID NOT NULL REFERENCES check_results(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  start_index INTEGER NOT NULL,
  end_index INTEGER NOT NULL,
  match_percentage NUMERIC NOT NULL,
  source TEXT NOT NULL,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- External Sources Table (for storing external sources found during checks)
CREATE TABLE IF NOT EXISTS external_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  check_id UUID NOT NULL REFERENCES check_results(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  similarity NUMERIC NOT NULL,
  matched_text TEXT NOT NULL,
  source_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add an RLS policy to protect check_results
ALTER TABLE check_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own check results" 
  ON check_results FOR ALL 
  USING (auth.uid() = user_id);

-- Add RLS policies to protect check_matches
ALTER TABLE check_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own check matches" 
  ON check_matches FOR ALL 
  USING (check_id IN (
    SELECT id FROM check_results WHERE user_id = auth.uid()
  ));

-- Add RLS policies to protect external_sources
ALTER TABLE external_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own external sources" 
  ON external_sources FOR ALL 
  USING (check_id IN (
    SELECT id FROM check_results WHERE user_id = auth.uid()
  ));
