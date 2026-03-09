import { useEffect, useState } from "react";
import userApiClient from "../services/userApiClient";
import userAuthApiClient from "../services/userAuthApiClient";

const useAuth = () => {
  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [user, setUser] = useState(null);

  const handleApiError = (
    error,
    defaultMessage = "Something Went Wrong! Try Again.",
  ) => {
    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
    } else {
      setErrorMsg(defaultMessage);
    }
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await userAuthApiClient.get("auth/users/me");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Update User Profile
  const updateUserProfile = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await userAuthApiClient.put("/auth/users/me/", data);
      setSuccessMsg("Profile Updated Successfully!");
    } catch (error) {
      handleApiError(error);
    }
  };

  // Password Change
  const changePassword = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await userAuthApiClient.post("/auth/users/set_password/", data);
      setSuccessMsg("Password Changed Successfully!");
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [authTokens]);

  // Login user
  const loginUser = async (userData) => {
    try {
      setErrorMsg("");
      const response = await userApiClient.post("auth/jwt/create", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      await fetchUserProfile();
      return true;
    } catch (error) {
      setErrorMsg(error.response?.data?.detail || "Login failed");
      return false;
    }
  };

  // Register a user
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await userApiClient.post("auth/users/", userData);
      if (response) {
        return {
          success: true,
          message:
            "Registration Successful. Please check your Email for account activation.",
        };
      }
    } catch (error) {
      handleApiError(error, "Registration Failed. Please Try Again");
      return { success: false, message: errorMsg };
    }
  };

  // Logout User
  const logoutUser = () => {
    const token = getToken();
    if (token != null) {
      localStorage.removeItem("authTokens");
      setAuthTokens(null);
      setUser(null);
      return true;
    }
    return false;
  };

  // Resend Account verification link
  const resendActivationLink = async (email) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await userApiClient.post("/auth/users/resend_activation/", { email });
      setSuccessMsg(
        "Activation Link Resent to your email. Redirecting to Login..!",
      );
      return true;
    } catch (error) {
      handleApiError(error);
      return false;
    }
  };

  // Reset Password
  const resetPassword = async (email) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await userApiClient.post("/auth/users/reset_password/", { email });
      setSuccessMsg("Password reset link is sent to your email address..");
      return true;
    } catch (error) {
      handleApiError(error);
      return false;
    }
  };

  // Reset Password Confirm
  const resetPasswordConfirm = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await userApiClient.post("/auth/users/reset_password_confirm/", data);
      setSuccessMsg(
        "Password Changed Successfully! Please wait redirecting to Login..",
      );
      return true;
    } catch (error) {
      handleApiError(error);
      return false;
    }
  };
  return {
    user,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    resendActivationLink,
    resetPassword,
    resetPasswordConfirm,
    errorMsg,
    successMsg,
    setErrorMsg,
    setSuccessMsg,
  };
};

export default useAuth;
