import Cookies from "js-cookie";

/**
 * 设置 Cookie
 */
export function setCookie(key: string, value: string) {
  Cookies.set(key, value);
}

/**
 * 获取 Cookie 信息
 */
export function getCookie(key: string) {
  return Cookies.get(key) ?? localStorage.getItem(key);
}

/**
 * 移除 Cookie
 */
export function removeCookie(key: string): void {
  Cookies.remove(`cookie-${key}`);
  localStorage.removeItem(`cookie-${key}`);
}

/**
 * 是否登录
 * true 则登录，否则未登录
 */
export function isLogined() {
  return !!getCookie("user");
}

/** 退出登录 */
export function logout() {
  removeCookie("user");
}
