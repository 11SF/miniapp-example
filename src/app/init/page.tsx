"use client";
import React, { useEffect } from "react";

export default function Init() {
  //initialize bridge object for communication between webview and next app
  useEffect(() => {
    window.bridge = {
      initAuthCallback: null,
      initAuthCallbackError: null,
    };
  }, []);

  return <div>page</div>;
}
