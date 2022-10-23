import request from "../utils/axios";

/**
 * 登录操作
 */
export function login(data: { account: string; password: string }) {
  return request({
    url: "/login",
    method: "POST",
    data: data,
  });
}
