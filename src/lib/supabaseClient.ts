// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yoyumpfcdzjxovbtwdww.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlveXVtcGZjZHpqeG92YnR3ZHd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDY5NTksImV4cCI6MjA4MDU4Mjk1OX0.eLoF-aB0wAksC6dY5Kt8x_h93jNnjtfvMuOeuMqzBuQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
