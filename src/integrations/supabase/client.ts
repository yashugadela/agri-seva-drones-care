// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hdhnxlrygqemacajhzdq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkaG54bHJ5Z3FlbWFjYWpoemRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzAxODksImV4cCI6MjA2NzgwNjE4OX0._9P4yRt0qks5fSjHvS1qt5_jZ_2SRgeB7DKyxMMLgu4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});