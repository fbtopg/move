import { supabase } from '../integrations/supabase/supabase';

export const uploadGroupImage = async (file, groupId) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${groupId}.${fileExt}`;
    const filePath = `privategroups/${fileName}`;

    console.log('Attempting to upload file:', filePath);

    // Check if the bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      throw bucketsError;
    }

    const groupImagesBucket = buckets.find(b => b.name === 'groupimages');
    if (!groupImagesBucket) {
      console.error('groupimages bucket not found');
      throw new Error('groupimages bucket not found');
    }

    const { data, error } = await supabase.storage
      .from('groupimages')
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    console.log('File uploaded successfully:', data);

    const { data: urlData, error: urlError } = supabase.storage
      .from('groupimages')
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('Error getting public URL:', urlError);
      throw urlError;
    }

    console.log('Public URL retrieved:', urlData.publicUrl);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadGroupImage:', error);
    throw error;
  }
};

export const updateGroupImageUrl = async (groupId, imageUrl) => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .update({ image: imageUrl })
      .eq('id', groupId);

    if (error) {
      console.error('Error updating group image URL:', error);
      throw error;
    }
    
    console.log('Group image URL updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in updateGroupImageUrl:', error);
    throw error;
  }
};