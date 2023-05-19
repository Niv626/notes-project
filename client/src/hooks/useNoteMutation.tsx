import { useMutation, useQueryClient } from "react-query";
import { editNote } from "../api/noteApi";

export const useNoteMutation = () => {
  const queryClient = useQueryClient();

  const EditNotemutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => queryClient.fetchQuery("notes"),
  });
  return EditNotemutation;
};
