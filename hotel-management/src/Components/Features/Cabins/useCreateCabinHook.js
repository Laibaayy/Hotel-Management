import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateCabin } from "../../Services/apiCabins";

const useCreateCabinHook = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: CreateCabin,
    onSuccess: () => {
      toast.success("Cabin Created Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
};

export default useCreateCabinHook;
