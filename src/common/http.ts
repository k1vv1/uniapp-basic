import { devBasePath } from "@/config/env";
import tool from "./tool";

const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith("http")) {
      options.url = devBasePath + options.url;
    }
    options.timeout = 10 * 1000;
    options.header = {
      ...options.header,
      "source-client": "miniapp",
    };
    const token = uni.getStorageSync("token");
    if (token) {
      options.header.Authorization = token;
    }
  },
};
uni.addInterceptor("request", httpInterceptor);
uni.addInterceptor("uploadFile", httpInterceptor);

interface Data<T> {
  code: string;
  msg: string;
  data: T;
}

const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>);
        } else if (res.statusCode === 401) {
          tool.toLogin();
          reject(res);
        } else {
          uni.showToast({
            title: (res.data as Data<T>).msg || "请求错误",
            icon: "none",
          });
          reject("request err, statusCode is " + res.statusCode);
        }
      },
      fail: (err) => {
        uni.showToast({
          title: "网络错误，换个网络试试",
          icon: "none",
        });
        reject(err);
      },
    });
  });
};

const get = <T>(url: string, params: object, header = {}): Promise<Data<T>> => {
  return http({
    url,
    data: params,
    method: "GET",
    header,
  });
};

const post = <T>(
  url: string,
  params: object,
  header = {}
): Promise<Data<T>> => {
  header = Object.assign(
    {
      "content-type": "application/form-data",
    },
    header
  );
  return http({
    url,
    data: params,
    method: "POST",
    header,
  });
};

export { get, post };
