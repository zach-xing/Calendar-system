import Api from '../utils/request'

/**
 * 获取用户
 */
export function fetchUserList() {
  return Api({
    url: '/user',
    method: 'GET'
  })
}