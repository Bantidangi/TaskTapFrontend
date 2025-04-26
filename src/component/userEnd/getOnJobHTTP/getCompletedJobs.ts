
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";
import { useQuery } from "@tanstack/react-query";

const getJobCompleted = () => {
  const getCompletedjobList = async () => {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/completedjobget`);
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch job data");
      throw error;
    }
  };

  return useQuery({
    queryKey: ["completedJob"],
    queryFn: getCompletedjobList,
  });
};

export default  getJobCompleted

