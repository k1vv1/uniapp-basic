import CryptoJS from "crypto-es";

const tool = {
  /**
   * 获取状态栏高度
   */
  getStatusBarHeight: () => {
    // #ifndef H5
    return uni.getSystemInfoSync().statusBarHeight ?? 0;
    // #endif
    return 30;
  },

  /**
   * 获取导航栏高度
   */
  getNavBarHeight: () => {
    // #ifndef H5||APP-PLUS||MP-LARK
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    return (
      menuButtonInfo.bottom + menuButtonInfo.top - tool.getStatusBarHeight()
    );
    // #endif
    // 默认值
    return 45;
  },

  /**
   * 获取导航栏宽度（挖去胶囊占用的空间）
   */
  getNavBarWidth: () => {
    // #ifndef H5||APP-PLUS||MP-LARK
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    return menuButtonInfo.left;
    // #endif
    return uni.upx2px(375);
  },

  /**
   * 获取窗口可用高度
   */
  getWindowHeight: () => {
    return uni.getSystemInfoSync().windowHeight;
  },

  showErrorDialog(err: any): Promise<void> {
    return new Promise((resolve, reject) => {
      uni.showModal({
        content: JSON.stringify(err),
        showCancel: false,
        success: () => resolve(),
        fail: (e) => reject(e),
      });
    });
  },

  md5Encrypt: (psd: string) => {
    return CryptoJS.MD5(psd).toString();
  },

  toLogin: () => {
    tool.clearLoginData();
    uni.reLaunch({
      url: "/pages/login/index",
    });
  },

  clearLoginData: () => {
    let { keys } = uni.getStorageInfoSync();
    keys.forEach((key) => {
      uni.removeStorageSync(String(key));
    });
  },
};

export default tool;
