import * as AuthApi from '../api/AuthRequest.js';

// LOGIN ACTION
export const logIn = (formData) => async (dispatch) => {
    const { email, password } = formData;

    if (!email || !password) {
        console.error("Email and password are required for login");
        dispatch({ type: 'AUTH_FAIL' });
        return;
    }

    dispatch({ type: 'AUTH_START' });

    try {
        const { data } = await AuthApi.logIn(formData);
        dispatch({ type: 'AUTH_SUCCESS', data });
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        dispatch({ type: 'AUTH_FAIL' });
    }
};

// SIGNUP ACTION
export const signUp = (formData) => async (dispatch) => {
    const { firstname, lastname, email, password } = formData;

    if (!firstname || !lastname || !email || !password) {
        console.error("All fields are required for sign up:", { firstname, lastname, email, password });
        dispatch({ type: 'AUTH_FAIL' });
        return;
    }

    dispatch({ type: 'AUTH_START' });

    try {
        const { data } = await AuthApi.signUp(formData);
        dispatch({ type: 'AUTH_SUCCESS', data });
    } catch (error) {
        console.error("Signup error:", error.response?.data || error.message);
        dispatch({ type: 'AUTH_FAIL' });
    }
};

// LOGOUT ACTION
export const logOut = () => async (dispatch) => {
    dispatch({ type: "LOG_OUT" });
};
