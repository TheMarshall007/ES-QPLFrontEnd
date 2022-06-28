import React from "react";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import "./Loading.css";

function Loading({
  children,
  loadingText,
  loading,
  autoHeight,
  hideChildrenWhileLoading,
}) {
  return (
    <LoadingMask
      loading={loading}
      loadingText={loadingText ? loadingText : "Buscando dados..."}
      className={autoHeight ? "loading-auto-height" : ""}
    >
      <div
        className={`loading-children-container${
          loading && hideChildrenWhileLoading ? " loading" : ""
        }`}
      >
        {children}
      </div>
    </LoadingMask>
  );
}

export default Loading;
