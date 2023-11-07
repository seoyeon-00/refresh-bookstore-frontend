import { getCookie } from "cookies-next";
import { API_BASE_URL } from "@/constants/path";
import axios, { AxiosError } from "axios";
import { requestToken } from "./auth";

export const apiClient = () => {
  //let accessToken = localStorage.getItem("token");
  let accessToken = getCookie("access-token");
  let refreshToken = getCookie("refresh-token");

  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      console.log(error.response);
      if (!accessToken && refreshToken) {
        console.log("access 토큰 만료!");
        try {
          // 토큰 재발급 요청
          await requestToken(refreshToken);

          // 이전 요청을 다시 시도 (헤더에 새로운 액세스 토큰 추가)
          if (error.config) {
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(error.config);
          } else {
            console.error("error.config is undefined");
          }
        } catch (error) {
          // 재발급 실패 시 로그인 화면으로 리디렉션 또는 다른 처리
          console.error("토큰 재발급 실패:", error);
          // 여기서 리디렉션 또는 다른 처리를 수행할 수 있습니다.
        }
      }

      // 다른 에러는 그대로 반환
      return Promise.reject(error);
    }
  );

  return api;
};
