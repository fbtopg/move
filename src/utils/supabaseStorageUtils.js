import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';

const BUCKET_NAME = 'images'; // Update this to match your existing bucket name

const checkBucketExists = async () => {
  const { data, error } = await supabase.storage.getBucket(BUCKET_NAME);
  if (error) {
    console.error('Error checking bucket:', error);
    return false;
  }
  return !!data;
};

const createBucket = async () => {
  const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
    public: false,
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif'],
    fileSizeLimit: 5 * 1024 * 1024, // 5MB
  });
  if (error) {
    console.error('Error creating bucket:', error);
    throw error;
  }
  console.log('Bucket created successfully:', data);
};

export const uploadGroupImage = async (file, groupId) => {
  try {
    let bucketExists = await checkBucketExists();
    if (!bucketExists) {
      console.log(`Bucket "${BUCKET_NAME}" does not exist. Creating...`);
      await createBucket();
      bucketExists = await checkBucketExists();
      if (!bucketExists) {
        throw new Error(`Failed to create bucket "${BUCKET_NAME}"`);
      }
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${groupId}.${fileExt}`;
    const filePath = `privategroups/${fileName}`;

    console.log('Attempting to upload file:', filePath);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    console.log('File uploaded successfully:', data);

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    console.log('Public URL retrieved:', publicUrlData.publicUrl);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadGroupImage:', error);
    toast.error('Failed to upload image. Please try again.');
    throw error;
  }
};

export const updateGroupImageUrl = async (groupId, imageUrl) => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .update({ image: imageUrl })
      .eq('id', groupId)
      .select();

    if (error) {
      console.error('Error updating group image URL:', error);
      throw error;
    }
    
    console.log('Group image URL updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in updateGroupImageUrl:', error);
    toast.error('Failed to update group image. Please try again.');
    throw error;
  }
};