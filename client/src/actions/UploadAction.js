import * as UploadApi from '../api/UploadRequest';

export const uploadImage = (data) => async (dispatch) => {
    try {
        const res = await UploadApi.uploadImage(data);
        return res.data;
    } catch (error) {
        console.error('Image upload failed:', error);
        dispatch({ type: 'UPLOAD_IMAGE_FAIL', error: error.message });
        throw error;
    }
};

export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: 'UPLOAD_START' });
    try {
        const newPost = await UploadApi.uploadPost(data);
        dispatch({ type: 'UPLOAD_SUCCESS', data: newPost.data });
        return newPost.data;
    } catch (error) {
        console.error('Post upload failed:', error);
        dispatch({ type: 'UPLOAD_FAIL', error: error.message });
        throw error;
    }
};
