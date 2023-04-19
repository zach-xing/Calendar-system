import { accessKeyId, accessKeySecret, appkey } from "../config";
import request from "./http";

// interface ICreateTokenResult {
//   Token: { Id: string; ExpireTime: string };
// }

// // 创建一个 token
// export async function createToken(): Promise<ICreateTokenResult> {
//   // => returns Promise
//   // => request(Action, params, options)
//   return await client.request("CreateToken");
// }

export async function getSpeech2Text(
  data: any,
  len: number
): Promise<{
  task_id: string;
  result: string;
  status: number;
  message: string;
}> {
  // const res = await createToken();

  return request({
    method: "POST",
    url: `https://nls-gateway-cn-shenzhen.aliyuncs.com/stream/v1/asr?appkey=${appkey}&enable_intermediate_result=false`,
    headers: {
      "X-NLS-Token": "196310d310e84d5daa04abcc10a95a1d",
      Host: "nls-gateway-cn-shenzhen.aliyuncs.com",
      "Content-type": "application/octet-stream",
      "Content-Length": len,
    },
    data: data,
  });
}

export async function toBack(buffer: any) {
  await request({
    method: "POST",
    url: `/user/video`,
    data: {
      buffer: buffer,
    },
  });
}
