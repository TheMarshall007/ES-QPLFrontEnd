import React from "react";
import styles from "./PageContainer.module.css";

function PageContainer({
  children,
  withoutCard = false,
  row,
  fixedHeight,
  className = "",
}) {
  const ContentContainer = React.useMemo(() => {
    return ({ children }) =>
      withoutCard ? (
        <>{children}</>
      ) : (
        <div className={styles.contentContainer}>
          <div
            className={`${row ? styles.rowContainer : styles.columnContainer} ${
              fixedHeight ? styles.fixedHeight : ""
            } ${className}`}
          >
            {children}
          </div>
        </div>
      );
  }, [withoutCard, className, fixedHeight, row]);
  return (
    <div className={styles.container}>
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
}

export default PageContainer;
