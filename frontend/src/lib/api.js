import { axiosInstance } from '../lib/axios.js';

export const signup = async (signupData) => {
      const res = await axiosInstance.post("/auth/signup", signupData);
      return res.data;
}

export const getAuthUser = async () => {
      try {
            const res = await axiosInstance.get("/auth/me");
            return res.data;
      } catch (error) {
            return null; 
      }
}

export const login = async (loginData) => {
      const res = await axiosInstance.post("/auth/login", loginData);
      return res.data;
}

export const completeOnboarding = async (formState) => {
      const res = await axiosInstance.post("/auth/onboarding", formState);
      return res.data;
}

export const logout = async () => {
      const res = await axiosInstance.post("/auth/logout");
      return res.data;
}

export const getUserFriends = async () => {
      const res = await axiosInstance.get("/user/friends");
      return res.data;
}

export const getrecommendedUsers = async () => {
      const res = await axiosInstance.get("/user");
      return res.data;
}

export const getOutgoingFriendReqs = async () => {
      const res = await axiosInstance.get("/user/outgoing-friend-requests");
      return res.data;
}

export const sendFriendRequest = async (userId) => {
      const res = await axiosInstance.post(`/user/friend-request/${userId}`);
      return res.data;
}

export const getMyFriendReqs = async () => {
      const res = await axiosInstance.get("/user/friend-requests");
      return res.data;
}

export const acceptFriendRequest = async (requestId) => {
      const res = await axiosInstance.put(`/user/friend-request/${requestId}/accept`)
      return res.data;
}

export const getStreamToken = async () => {
      const res = await axiosInstance.get("/chat/token");
      return res.data;
} 