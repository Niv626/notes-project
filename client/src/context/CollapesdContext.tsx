import React, { useState, createContext } from "react";

export const CollapsedContext = createContext({});

type Collapsed = {
  collapsed: boolean;
};

export interface CollapsedData {
  collapsed?: Collapsed;
  setCollapsed?: React.Dispatch<React.SetStateAction<Collapsed>>;
}

const CollapsedProvider = ({ children }: { children: React.ReactNode }) => {
  const localCollapsed = localStorage.getItem("collapsed");
  const [collapsed, setCollapsed] =
    useState(JSON.parse(localCollapsed || "false")) || false;

  return (
    <CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </CollapsedContext.Provider>
  );
};

export default CollapsedProvider;
