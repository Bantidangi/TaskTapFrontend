import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/exports";
import { useDispatch } from "react-redux";
import { setAuthorization, setUserLoggedIn } from "../../../redux/slices/userslices";
import toast from "react-hot-toast";



async function signIn(input) {
  return axiosInstance.post(`${BASE_URL}/signin`, input);
}
const useSignInMutation = () => {

  const navigate = useNavigate();
const dispatchUser = useDispatch()

   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,

    onSuccess: async (res, input) => {

      const token = res.data?.user?.token;
       dispatchUser(setUserLoggedIn(res.data.user));

        if (token) {
                localStorage.setItem("authToken", token);
                dispatchUser(setAuthorization(true)); 
              }


      queryClient.invalidateQueries({
        queryKey: ["login"],
        refetchType: "all",
      });
   

      navigate("/home");
      toast.success(res.response.data.message)
    },
    onError: (res) => {
      console.log(res.response.data.message);
      toast.error(res.response.data.message)
      
    },
  });
};

export default useSignInMutation;
