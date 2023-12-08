const HOME_PAGE = "/pages/home/index";

export function jumpHome() {
  uni.reLaunch({
    url: HOME_PAGE,
  });
}
