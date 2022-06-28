import React from "react";
import { Button } from "react-bootstrap";
import styles from "./Page404.module.css";
import PageContainer from "../../genericComponents/containers/pageContainer/PageContainer.js"

function Page404() {
  return (
    <PageContainer withoutCard>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className={`card ${styles.card}`}>
          <div className={styles.contentContainer}>
            <h1 className={`font-weight-bolder ${styles.ultraLargeFont}`}>
              Erro 404
            </h1>
            <h2 className={`font-weight-bold ${styles.largeFont}`}>
              Página não encontrada
            </h2>
            <h6>
              A página que você tentou acessar está temporariamente indisponível
            </h6>
            <Button className={styles.button} href="/">
              Voltar para Home
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Page404;