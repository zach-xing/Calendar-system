import Api from "../utils/request";

export function fetchShiftAll() {
  return Api({
    url: "/shift",
    method: "GET"
  });
}

// 添加班次信息
export function addShift(data) {
  return Api({
    url: "/shift?method=add",
    method: "POST",
    data: data
  })
}

// 更改班次信息
export function updataShift(data) {
  return Api({
    url: '/shift?method=updata',
    method: "POST",
    data: data
  })
}

export function deleteShift(id) {
  return Api({
    url: `/shift?id=${id}`,
    method: "DELETE"
  })
}