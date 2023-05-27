"use client";
import React, { createContext, useContext, useState } from "react";

export type MyGlobalDataType = {
  group: string,
  facility: string,
  department: string,
  dataStartDate: Date,
  dataEndDate: Date,
};

type MyGlobalContextType = {
  myData: MyGlobalDataType | undefined;
  setMyData: (myData: MyGlobalDataType) => void;
};

export const MyDataContext = createContext<MyGlobalContextType>({
  myData: {
    group: "",
    facility: "",
    department: "",
    dataStartDate: new Date(),
    dataEndDate: new Date(),
  },
  setMyData: () => { },
});

export const useMyDataContext = () => useContext(MyDataContext);

/*
export const MyContextProvider: React.FC = ({ children }: { children: React.ReactNode}) => {
  const [myData, setMyData] = useState({
    dataStartDate: "2022-01-01",
    dataEndDate: "2023-01-01",
  });

  return <MyDataContext.Provider value={{ state, setState }}>{children}</MyDataContext.Provider>;
};

// Export the context
export default MyContext;
*/
