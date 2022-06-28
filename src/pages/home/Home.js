import React from "react";
import PageContainer from "../../genericComponents/containers/pageContainer/PageContainer.js";

function Home() {
  return (
    <PageContainer withoutCard>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <h1>Bem Vindo ao Vamos Treinar</h1>
      </div>
    </PageContainer>
  );
}

export default Home;
