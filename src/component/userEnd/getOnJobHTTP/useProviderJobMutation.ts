import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";
import toast from "react-hot-toast";

async function acceptJob(id) {
  return axiosInstance.post(`${BASE_URL}/acceptJob/${id}`);
}
const useAcceptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptJob,

    onSuccess: async (res, input) => {
      queryClient.invalidateQueries({
        queryKey: ["jobget"],
      });

      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.data.message);
    },
  });
};

export default useAcceptMutation;
