import { supabase } from '../integrations/supabase/supabase';

export const insertNewGroup = async (groupName) => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .insert([
        {
          name: groupName,
          description: null,
          image: null,
          is_private: true,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error inserting new group:', error);
    throw error;
  }
};