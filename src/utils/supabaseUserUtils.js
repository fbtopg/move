import { supabase } from '../integrations/supabase/supabase';

export const insertUserInfo = async (uuid, username, email) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { id: uuid, username, email }
      ])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error inserting user info:', error);
    throw error;
  }
};