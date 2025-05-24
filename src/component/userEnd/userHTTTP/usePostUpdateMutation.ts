import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateUserProfileData {
  name?: string;
  email?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  hourlyRate?: number;
}

const usePostUpdateMutation = () => {
  const queryClient = useQueryClient();

  const updateUserProfile = async (userData: UpdateUserProfileData) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/update-user`, userData);
      return response.data;
    } catch (error) {
      toast.error("Failed to update profile");
      throw error;
    }
  };

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  });
};

export default usePostUpdateMutation;
