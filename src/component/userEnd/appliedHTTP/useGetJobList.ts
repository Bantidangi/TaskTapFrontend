import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";

const useGetJobList = () => {
  const getJobList = async () => {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/applied-job`);
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch job data");
      throw error;
    }
  };

  return useQuery({
    queryKey: ["applyJob"],
    queryFn: getJobList,
  });
};

export default useGetJobList;
