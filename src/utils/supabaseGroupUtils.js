import { supabase } from '../integrations/supabase/supabase';

export const createGroupInSupabase = async (groupData) => {
  const { data, error } = await supabase
    .from('groups')
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

export const uploadGroupImage = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `group-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('group-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('group-images').getPublicUrl(filePath);

  return data.publicUrl;
};