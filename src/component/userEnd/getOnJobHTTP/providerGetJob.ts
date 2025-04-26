
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";
import { useQuery } from "@tanstack/react-query";

const providerGetJobList = () => {
  const getcreateJobList = async () => {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/jobget`);
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch job data");
      throw error;
    }
  };

  return useQuery({
    queryKey: ["createJob"],
    queryFn: getcreateJobList,
  });
};

export default providerGetJobList;
