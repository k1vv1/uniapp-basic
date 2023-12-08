import url from "./urls";
import * as http from "@/common/http";

export default class Home {
  static getUserInfo(params: any) {
    return http.get(url.getUserInfo, params);
  }
}
