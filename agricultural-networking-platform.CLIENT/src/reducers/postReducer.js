const initialState = {
  posts: [],
  imageUploading: false,
  postUploading: false,
  error: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // IMAGE UPLOAD
    case "IMAGE_UPLOAD_START":
      return { ...state, imageUploading: true, error: false };
    case "IMAGE_UPLOAD_SUCCESS":
      return { ...state, imageUploading: false, error: false };
    case "IMAGE_UPLOAD_FAIL":
      return { ...state, imageUploading: false, error: true };

    // POST UPLOAD
    case "POST_UPLOAD_START":
      return { ...state, postUploading: true, error: false };
    case "POST_UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        postUploading: false,
        error: false,
      };
    case "POST_UPLOAD_FAIL":
      return { ...state, postUploading: false, error: true };

    // Other existing cases...
    default:
      return state;
  }
};

export default postReducer;
