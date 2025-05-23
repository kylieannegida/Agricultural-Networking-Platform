import * as UploadApi from '../api/UploadRequest';

export const uploadImage = (data) => async (dispatch) => {
  dispatch({ type: 'IMAGE_UPLOAD_START' });
  try {
    const res = await UploadApi.uploadImage(data);

    dispatch({ type: 'IMAGE_UPLOAD_SUCCESS' });

    return res.data.filename;
  } catch (error) {
    console.error('Image upload failed:', error);
    dispatch({ type: 'IMAGE_UPLOAD_FAIL', error: error.message });
    throw error;
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: 'POST_UPLOAD_START' });
  try {
    const newPost = await UploadApi.uploadPost(data);

    dispatch({ type: 'POST_UPLOAD_SUCCESS', data: newPost.data });

    return newPost.data;
  } catch (error) {
    console.error('Post upload failed:', error);
    dispatch({ type: 'POST_UPLOAD_FAIL', error: error.message });
    throw error;
  }
};
