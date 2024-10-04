export const handleImageUpload = async (file) => {
  try {
    // Check if we have permission to access media
    if ('permissions' in navigator) {
      const permissionStatus = await navigator.permissions.query({ name: 'camera' });
      if (permissionStatus.state === 'denied') {
        throw new Error('Permission to access media is denied');
      }
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error accessing media:', error);
    throw error;
  }
};