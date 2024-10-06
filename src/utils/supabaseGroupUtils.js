import { supabase } from '../integrations/supabase/supabase';

export const createGroupInSupabase = async (groupData) => {
  const { data, error } = await supabase
    .from('Group')
    .insert([
      {
        name: groupData.name,
        image: groupData.image,
        description: groupData.description,
        is_private: groupData.isPrivate
      }
    ])
    .select();

  if (error) throw error;
  return data[0];
};