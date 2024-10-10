import { supabase } from '../integrations/supabase/supabase';

export const uploadGroupImage = async (file, groupId) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${groupId}.${fileExt}`;
    const filePath = `groupimages/${fileName}`;

    const { data, error } = await supabase.storage
      .from('groupimages')
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('groupimages')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const updateGroupImageUrl = async (groupId, imageUrl) => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .update({ image: imageUrl })
      .eq('id', groupId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating group image URL:', error);
    throw error;
  }
};