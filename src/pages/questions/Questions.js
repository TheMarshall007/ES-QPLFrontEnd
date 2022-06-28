import React, { useEffect, useState } from "react";
import { Header, Loading, PageContainer, TableComponentWithPagination } from "../../genericComponents";
import { performGetQuestion } from "./controllers/QuestionControllers";
import ModalQuestions from "./ModalQuestions";

export default function Questions() {
  const [showModalQuestion, setShowQuestion] = useState();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [fixedTotalItems, setFixedTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    performGetQuestion(loading, handleQuestionsChange);
  }, []);

  function handleQuestionsChange(data) {
    setList(
      data.content
        .map((item) => ({
          id: item.id,
          question: item.question,
          subject: item.subject.name
        }))
        .sort((a, b) => (a.id > b.id ? 1 : -1))
    );
    setPage( data.currentPage)
    setTotalPages(data.totalPages)
    setFixedTotalItems(data.fixedTotalItems)
    setTotalItems(data.totalItems);
    setLoading(false);
  }

  return (
    <Loading loading={loading}>
      <Header
        active="Perguntas"
        logged
        buttons={[
          {
            onClick: () => setShowQuestion(!showModalQuestion),
            icon: "fas fa-plus-circle",
            label: "Adicionar",
          },
        ]}
      />
      <PageContainer fixedHeight className="p-3">
        <TableComponentWithPagination
          loading={loading}
          countLabel="estudantes"
          countLabelSingular="estudantes"
          startSorted="id"
          header={[
            { label: "#", sortProperty: "id" },
            { label: "Questão", sortProperty: "question" },
            { label: "Dificulade", sortProperty: "subject" },
          ]}
          totalItems={totalItems}
          fixedTotalItems={fixedTotalItems}
          totalPages={totalPages}
          page={page + 1}
          list={list}
          forEach={(item) => [
            { label: item.id },
            { label: item.question },
            { label: item.subject },
          ]}
        />
      </PageContainer>
      {showModalQuestion && (
        <ModalQuestions
          show={showModalQuestion}
          onHide={() => setShowQuestion(!showModalQuestion)}
        />
      )}
    </Loading>
  );
}
