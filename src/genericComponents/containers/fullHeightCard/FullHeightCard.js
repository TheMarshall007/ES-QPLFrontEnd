import React from "react";
import { Col } from "react-bootstrap";
import styles from "./FullHeightCard.module.css";
import pageContainerStyles from "../pageContainer/PageContainer.module.css";

function FullHeightCard({
  children,
  xs = true,
  header,
  pageContainerChild,
  notColAsContainer,
  ...props
}) {
  const Container = React.useMemo(() => {
    return notColAsContainer
      ? ({ children, className }) => <div className={className}>{children}</div>
      : Col;
  }, [notColAsContainer]);
  return (
    <Container
      {...props}
      xs={xs}
      className={`${styles.container} ${
        pageContainerChild ? pageContainerStyles.pageContainerChild : ""
      } ${props.className}`}
    >
      <div className={styles.contentContainer}>
        {header ? (
          <>
            {header} <hr className="m-1" />
          </>
        ) : null}
        <div className={styles.body}>{children}</div>
      </div>
    </Container>
  );
}
export default FullHeightCard;
