import axios from "axios";
import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  try {
    const response = await axiosInstance.get("/users/friends");
    // Ensure we always return an array
    return Array.isArray(response.data?.friends) 
      ? response.data.friends 
      : [];
  } catch (error) {
    console.error("Failed to fetch friends:", error);
    return []; // Return empty array on error
  }
}

export async function getRecommendedUsers() {
  try {
    const response = await axiosInstance.get("/users");
    // The backend now returns the array directly
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Failed to fetch recommended users:", error);
    return []; // Return empty array on error
  }
}

export async function getOutgoingFriendReqs() {
  try {
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data?.outgoingReqs ? response.data : { outgoingReqs: [] };
  } catch (error) {
    console.error("Failed to fetch outgoing requests:", error);
    return { outgoingReqs: [] };
  }
}

export async function sendFriendRequest(userId){
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests(){
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export const declineFriendRequest = async (requestId) => {
  try {
    const response = await axiosInstance.delete(`/users/friend-request/${requestId}/reject`);
    return response.data;
  } catch (error) {
    console.error("Error declining friend request:", error);
    throw error;
  }
};

export const cancelFriendRequest = async (requestId) => {
  try {
    const response = await fetch(`/api/friends/requests/${requestId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to cancel request');
    return data;
  } catch (error) {
    throw error;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await axiosInstance.get(`/users/search?query=${encodeURIComponent(query)}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
};

export async function getStreamToken(){
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}