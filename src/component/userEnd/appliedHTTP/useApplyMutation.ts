import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";
import toast from "react-hot-toast";



async function applyJob(id) {
  return axiosInstance.post(`${BASE_URL}/applyjob/${id}`, );
}
const useApplyMutation = () => {



   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyJob,

    onSuccess: async (res, input) => {


      queryClient.invalidateQueries({
        queryKey: ["login"],
        refetchType: "all",
      });

      toast.success(res.response.data.message)
    },
    onError: (res) => {

      toast.error(res.response.data.message)
      
    },
  });
};

export default useApplyMutation;
