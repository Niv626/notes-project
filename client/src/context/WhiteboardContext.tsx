import React, { createContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { editNote } from "../api/noteApi";

export const WhiteboardContext = createContext({});

const WhiteboardProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const EditNotemutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  return (
    <WhiteboardContext.Provider value={EditNotemutation}>
      {children}
    </WhiteboardContext.Provider>
  );
};

export default WhiteboardProvider;
