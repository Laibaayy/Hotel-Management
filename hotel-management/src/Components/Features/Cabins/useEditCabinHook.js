import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCabin } from "../../Services/apiCabins";
import toast from "react-hot-toast";

const useEditCabinHook = () => {
  const queryClient = useQueryClient();

  const { mutate: Editcabin, isLoading: EditLoading } = useMutation({
    mutationFn: ({ newCabin, id }) => CreateCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin Edited Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { Editcabin, EditLoading };
};

export default useEditCabinHook;
