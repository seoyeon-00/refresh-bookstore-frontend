"use client";

import { getUser } from "@/api/auth";
import { userDataType } from "@/types/userDataType";
import React, { createContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRecoilValue } from "recoil";
import { loginState } from "@/stores/login";

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
  isLoading: boolean;
};

export const AuthContext = createContext<authContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<useStateProps>({
    isLogin: null,
    user: null,
    isLoading: true,
  });
  const [token, setToken] = useState<{
    access: string | null;
    refresh: string | null;
  }>({
    access: null,
    refresh: null,
  });
  const isLogin = useRecoilValue(loginState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 클라이언트 측에서만 동작하는 코드
      const accessToken = localStorage.getItem("token");
      const refreshToken = getCookie("refresh-token") || "";

      setToken({
        access: accessToken,
        refresh: refreshToken,
      });
    }
  }, [isLogin.isLogin]);

  useEffect(() => {
    const getUserState = async () => {
      if (token.access && token.refresh) {
        console.log("재발급");
        const userInfo = await getUser();
        setUserData({
          isLogin: true,
          user: userInfo.data.data,
          isLoading: false,
        });
      } else {
        setUserData({
          isLogin: false,
          user: null,
          isLoading: false,
        });
      }
    };

    getUserState();
  }, [token.access]);

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};
