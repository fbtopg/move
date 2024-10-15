import { supabase } from '../integrations/supabase/supabase';

export const insertUserInfo = async (id, email, username) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert([
        { id, email, username }
      ], { onConflict: 'id' })
      .select();

    if (error) throw error;
    console.log('User info inserted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error inserting user info:', error);
    throw error;
  }
};
