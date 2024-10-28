import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeleteCabin } from "../../Services/apiCabins";

const useCabinDeleteHook = () => {
  const queryClient = useQueryClient(); //invalidate sirf isi s hota hai

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => DeleteCabin(id),
    onSuccess: () => {
      // toast.success("Cabin Deleted Successfully")
      toast.success("Cabin Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLoading, mutate };
};

export default useCabinDeleteHook;
