import { useMutation, useQueryClient } from "react-query";
import { editNote } from "../api/noteApi";

export const useNoteMutation = () => {
  const queryClient = useQueryClient();
  console.log("firstsdasdas");

  const EditNotemutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => queryClient.fetchQuery("notes"),
  });
  return EditNotemutation;
};
