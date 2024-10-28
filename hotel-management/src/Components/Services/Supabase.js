import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://humtggfyxxrfxtitfcvz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bXRnZ2Z5eHhyZnh0aXRmY3Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5NzAzMDUsImV4cCI6MjAzNjU0NjMwNX0.97HxGWgDD2HJRQAmOvj-pUMXPpNdxTZPbK18RJYR8mE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
