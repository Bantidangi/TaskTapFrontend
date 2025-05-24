import { useQuery } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";

const useGerDashboard = () => {
  const getDashBoardData = async () => {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/dashboard`);
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch job data");
      throw error;
    }
  };

  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashBoardData,
  });
};

export default useGerDashboard;
