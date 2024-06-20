const triggerNativeGetCameraImage = (
  callback: (base64Image: string) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  if (window.JSBridge) {
    // android
    window.bridge.getCameraImageCallbackError = callbackError;
    window.bridge.getCameraImageCallback = callback;
    window.JSBridge.getCameraImage?.();
  } else if (window.webkit) {
    // ios
    window.bridge.getCameraImageCallbackError = callbackError;
    window.bridge.getCameraImageCallback = callback;

    const message = { name: "getCameraImage" };
    window.webkit.messageHandlers.observer.postMessage(message);
  }
};

export default triggerNativeGetCameraImage;
