import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';

const BUCKET_NAME = 'images';

const checkBucketExists = async () => {
  try {
    const { data, error } = await supabase.storage.getBucket(BUCKET_NAME);
    if (error) {
      console.error('Error checking bucket:', error);
      return false;
    }
    return !!data;
  } catch (error) {
    console.error('Error checking bucket:', error);
    return false;
  }
};

const createBucket = async () => {
  try {
    const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif'],
      fileSizeLimit: 5 * 1024 * 1024, // 5MB
    });
    if (error) {
      console.error('Error creating bucket:', error);
      throw error;
    }
    console.log('Bucket created successfully:', data);
  } catch (error) {
    console.error('Error creating bucket:', error);
    throw error;
  }
};

export const uploadGroupImage = async (file, groupId) => {
  try {
    const bucketExists = await checkBucketExists();
    if (!bucketExists) {
      await createBucket();
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${groupId}.${fileExt}`;
    const filePath = `privategroups/${fileName}`;

    console.log('Attempting to upload file:', filePath);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, { upsert: true });

    if (error) {
      if (error.message.includes('row-level security')) {
        console.error('Error uploading file (security policy):', error);
        toast.error('Unable to upload image due to security settings. Please contact support.');
        throw new Error('Security policy prevents image upload');
      } else {
        console.error('Error uploading file:', error);
        throw error;
      }
    }

    console.log('File uploaded successfully:', data);

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    // Get signed URL (valid for 1 hour)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, 3600);

    if (signedUrlError) {
      console.error('Error creating signed URL:', signedUrlError);
      // Fall back to public URL if signed URL fails
      return publicUrlData.publicUrl;
    }

    console.log('Public URL:', publicUrlData.publicUrl);
    console.log('Signed URL:', signedUrlData.signedUrl);

    // Return an object with both URLs
    return {
      publicUrl: publicUrlData.publicUrl,
      signedUrl: signedUrlData.signedUrl
    };
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