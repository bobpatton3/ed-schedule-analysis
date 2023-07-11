"use client";
import React, { createContext, useContext, useState } from "react";
import { UUID } from "crypto";

export type DepartmentConfigurationType = {
  department_id: UUID,
  department_name: string,
  data_start_date: Date,
  data_end_date: Date,
  phys_hourly_cost: number,
  phys_peak_capacity: number,
  app_hourly_cost: number,
  app_peak_capacity: number,
};

type PostLoginDataGlobalContextType = {
  postLoginData: Map<string, Map<string, Map<string, DepartmentConfigurationType>>>;
  setPostLoginData: (postLoginDataContext: Map<string, Map<string, Map<string, DepartmentConfigurationType>>>) => void;
};

const postLoginDataInstance: PostLoginDataGlobalContextType = {
  postLoginData: new Map<string, Map<string, Map<string, DepartmentConfigurationType>>>(),
  setPostLoginData: (newPostLoginData: Map<string, Map<string, Map<string, DepartmentConfigurationType>>>) => { postLoginDataInstance.postLoginData = newPostLoginData },
};

export const PostLoginDataContext = createContext<PostLoginDataGlobalContextType>(postLoginDataInstance);

//export const usePostLoginDataContext = () => useContext(PostLoginDataContext);
export const PostLoginDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (
    <PostLoginDataContext.Provider value={postLoginDataInstance}>
      {children}
    </PostLoginDataContext.Provider>
  );
};

