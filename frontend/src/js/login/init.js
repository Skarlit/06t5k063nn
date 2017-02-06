export default function init(logIn) {
  window.fbAsyncInit = function () {
    FB.init({
      status: true,
      appId: logIn.fb_sdk.appId,
      xfbml: true,
      version: logIn.fb_sdk.version,
    });
    FB.AppEvents.logPageView();
  };
}
