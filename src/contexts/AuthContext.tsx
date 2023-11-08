"use client";

import { getUser } from "@/api/auth";
import { userDataType } from "@/types/userDataType";
import React, { createContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

type AuthProviderProps = {
  children: React.ReactNode;
};

type authContextProps = {
  isLogin: boolean | null;
  user: userDataType | null;
};

type useStateProps = {
  isLogin: boolean | null;
  user: userDataType | null;
};

export const AuthContext = createContext<authContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<useStateProps>({
    isLogin: null,
    user: null,
  });

  const accessToken = localStorage.getItem("token");
  const refreshToken = getCookie("refresh-token") || "";

  useEffect(() => {
    const getUserState = async () => {
      if (accessToken) {
        console.log("재발급");
        const userInfo = await getUser();
        setUserData({
          isLogin: true,
          user: userInfo.data.data,
        });
      } else if (!accessToken && refreshToken) {
        const userInfo = await getUser();
        setUserData({
          isLogin: true,
          user: userInfo.data.data,
        });
      } else {
        setUserData({
          isLogin: false,
          user: null,
        });
      }
    };

    getUserState();
  }, [accessToken]);

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};