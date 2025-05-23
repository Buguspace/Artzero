// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://uquskqxauwdumxtxqsek.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxdXNrcXhhdXdkdW14dHhxc2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNzA5MjMsImV4cCI6MjA2MTk0NjkyM30.XDohA7Hs5_2hSqONSIAABJcPEfwY2zVyss0BroO5vU0';

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);