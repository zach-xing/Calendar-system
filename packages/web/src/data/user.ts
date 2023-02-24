import request from "../utils/request";

/**
 * 登录操作
 */
export function login(data: { account: string; password: string }) {
  return request({
    url: "/user/login",
    method: "POST",
    data,
  });
}

/**
 * 注册操作
 */
export function register(data: {
  name: string;
  account: string;
  password: string;
}) {
  return request({
    url: "/user/register",
    method: "POST",
    data,
  });
}
