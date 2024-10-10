import { supabase } from '../integrations/supabase/supabase';

const BUCKET_NAME = 'groupimages';

const ensureBucketExists = async () => {
  try {
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    if (bucketsError) {
      console.warn('Unable to list buckets:', bucketsError);
      return;
    }

    const bucketExists = buckets.some(b => b.name === BUCKET_NAME);
    if (!bucketExists) {
      try {
        const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, { public: false });
        if (error) throw error;
        console.log(`Bucket ${BUCKET_NAME} created successfully`);
      } catch (createError) {
        console.warn(`Unable to create bucket ${BUCKET_NAME}:`, createError);
      }
    }
  } catch (error) {
    console.warn('Error ensuring bucket exists:', error);
  }
};

export const uploadGroupImage = async (file, groupId) => {
  try {
    await ensureBucketExists();

    const fileExt = file.name.split('.').pop();
    const fileName = `${groupId}.${fileExt}`;
    const filePath = `privategroups/${fileName}`;

    console.log('Attempting to upload file:', filePath);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error('Error uploading file:', error);
      if (error.message.includes('row-level security policy')) {
        console.error('This appears to be a permissions issue. Please check your Supabase RLS policies.');
      }
      throw error;
    }

    console.log('File uploaded successfully:', data);

    const { data: urlData, error: urlError } = supabase.storage
      .from(BUCKET_NAME)
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
      if (error.message.includes('row-level security policy')) {
        console.error('This appears to be a permissions issue. Please check your Supabase RLS policies.');
      }
      throw error;
    }
    
    console.log('Group image URL updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in updateGroupImageUrl:', error);
    throw error;
  }
};