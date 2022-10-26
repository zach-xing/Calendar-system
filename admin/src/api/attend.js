import Api from "../utils/request";

// 根据 人员id 查询此人的考勤情况（还有年和月）
export function fetchAttend(year,month,pid) {
  return Api({
    url: `/attend?year=${year}&month=${month}&pid=${pid}`,
    method: "GET",
  });
}