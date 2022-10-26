import Api from "../utils/request";

export function fetchDepartmentAll() {
  return Api({
    url: "/department",
    method: "GET"
  })
}

export function UpdateDepartment(data) {
  return Api({
    url: "/department",
    method: "POST",
    data: data
  })
}