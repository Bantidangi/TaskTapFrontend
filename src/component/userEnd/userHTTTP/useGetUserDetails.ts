import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";
import { useQuery } from "@tanstack/react-query";

const useGetUserDetails = () => {
  const getUserDetails = async () => {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/get-user`);
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch user profile data");
      throw error;
    }
  };

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserDetails,
  });
};

export default useGetUserDetails;
