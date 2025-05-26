import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";
import toast from "react-hot-toast";

async function applyJob(id) {
  return axiosInstance.post(`${BASE_URL}/applyjob/${id}`);
}

const useApplyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyJob,

    onSuccess: async (res) => {
      // Invalidate the job list query to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ["getAllJob"],
        refetchType: "active",
      });

      toast.success(res?.data?.message || "Job applied successfully");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to apply for job");
    },
  });
};

export default useApplyMutation;
