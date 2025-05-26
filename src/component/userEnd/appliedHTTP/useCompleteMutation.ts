import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";
import toast from "react-hot-toast";

async function completeJob(id) {
  return axiosInstance.post(`${BASE_URL}/completejob/${id}`, );
}
const useCompleteMutation = () => {
   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeJob,
    onSuccess: async (res,input) => {
      queryClient.invalidateQueries({
        queryKey: ["applyJob"],
        refetchType: "all",
      });

      toast.success(res.data.message)
    },
    onError: (res) => {

      toast.error(res.data.message)
      
    },
  });
};

export default useCompleteMutation;
