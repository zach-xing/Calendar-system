// storage.js
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 封装的 storage 对象
 */
const storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 10000,
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: null,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
});

export default storage;
