    const authReducer = (
    state = {
        authData: null,
        loading: false,
        error: false,
        updateLoading: false,
        awaitingOtp: false,
    },
    action
    ) => {
    switch (action.type) {
        // Start authentication (login/signup)
        case "AUTH_START":
        return {
            ...state,
            loading: true,
            error: false,
            awaitingOtp: false,
        };

        // Login/signup successful and fully authenticated
        case "AUTH_SUCCESS":
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        return {
            ...state,
            authData: action.data,
            loading: false,
            error: false,
            awaitingOtp: false,
        };

        // OTP required after login attempt
        case "AUTH_OTP_REQUIRED":
        return {
            ...state,
            loading: false,
            error: false,
            awaitingOtp: true,
        };

        // Login/signup failed
        case "AUTH_FAIL":
        return {
            ...state,
            loading: false,
            error: true,
            awaitingOtp: false,
        };

        // Start profile update
        case "UPDATING_START":
        return {
            ...state,
            updateLoading: true,
            error: false,
        };

        // Profile update success
        case "UPDATING_SUCCESS":
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        return {
            ...state,
            authData: action.data,
            updateLoading: false,
            error: false,
        };

        // Profile update failed
        case "UPDATING_FAIL":
        return {
            ...state,
            updateLoading: false,
            error: true,
        };

        // Follow user
        case "FOLLOW_USER":
        return {
            ...state,
            authData: {
            ...state.authData,
            user: {
                ...state.authData.user,
                following: [...state.authData.user.following, action.data],
            },
            },
        };

        // Unfollow user
        case "UNFOLLOW_USER":
        return {
            ...state,
            authData: {
            ...state.authData,
            user: {
                ...state.authData.user,
                following: state.authData.user.following.filter(
                (personId) => personId !== action.data
                ),
            },
            },
        };

        // Log out
        case "LOG_OUT":
        localStorage.clear();
        return {
            ...state,
            authData: null,
            loading: false,
            error: false,
            awaitingOtp: false,
        };

        // Default case
        default:
        return state;
    }
    };

    export default authReducer;
