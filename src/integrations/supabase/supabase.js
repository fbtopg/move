import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hviyoqsvhpvddaafusuc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aXlvcXN2aHB2ZGRhYWZ1c3VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2MjgwNzIsImV4cCI6MjA0MTIwNDA3Mn0.9GPoC16qZ28iz1evKfx1JhLSo2mjeJM4ng1GSFZijOY';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection
supabase.from('groups').select('*').limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('Error connecting to Supabase:', error);
    } else {
      console.log('Successfully connected to Supabase');
    }
  });