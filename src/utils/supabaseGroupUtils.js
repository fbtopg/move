import { supabase } from '../integrations/supabase/supabase';

export const createGroupInSupabase = async (groupData) => {
  const { data, error } = await supabase
    .from('Group')
    .insert([
      {
        name: groupData.name,
        description: groupData.description,
        image: groupData.image,
        is_private: groupData.isPrivate,
        created_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) throw error;
  return data[0];
};