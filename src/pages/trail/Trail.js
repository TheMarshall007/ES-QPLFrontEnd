import React, { useEffect, useState } from "react";
import {
  Header,
  Loading,
  PageContainer,
  TableComponentWithPagination,
} from "../../genericComponents";
import { isStudentView } from "../../utils/storage";
import { performGetTrail } from "./controllers/TrailControllers";
import ModalTrail from "./ModalTrail";
import ModalTrailStudent from "./ModalTrailStudent";

export default function Trail() {
  const [showModalTrail, setShowTrail] = useState(false);
  const [showModalTrailStudent, setShowTrailStudent] = useState(false);
  const [trailSelect, setTrialSelect] = useState();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [fixedTotalItems, setFixedTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [is_student] = useState(isStudentView());
  useEffect(() => {
    setLoading(true);
    performGetTrail(loading, handleCustomerChange);
  }, []);

  function handleCustomerChange(data) {
    setList(
      data.content
        .map((item) => ({
          id: item.id,
          name: item.name,
          phaseQuantity: item.phaseQuantity,
        }))
        .sort((a, b) => (a.id > b.id ? 1 : -1))
    );
    setPage(data.currentPage);
    setTotalPages(data.totalPages);
    setFixedTotalItems(data.fixedTotalItems);
    setTotalItems(data.length);
    setLoading(false);
  }

  function selectTrail(item) {
    setTrialSelect(item);
    setShowTrailStudent(true);
  }

  return (
    <Loading loading={loading}>
      <Header
        active="Trilha"
        logged
        buttons={[
          !is_student && {
            onClick: () => setShowTrail(!showModalTrail),
            icon: "fas fa-plus-circle",
            label: "Adicionar",
          },
        ]}
      />
      <PageContainer fixedHeight className="p-3">
        <TableComponentWithPagination
          loading={loading}
          countLabel="trilha"
          countLabelSingular="trilha"
          startSorted="id"
          header={[
            { label: "#", sortProperty: "id" },
            { label: "Nome", sortProperty: "name" },
            { label: "Quantidade de fases", sortProperty: "phaseQuantity" },
          ]}
          onItemClick={is_student && selectTrail}
          totalItems={totalItems}
          fixedTotalItems={fixedTotalItems}
          totalPages={totalPages}
          page={page + 1}
          list={list}
          forEach={(item) => [
            { label: item.id },
            { label: item.name },
            { label: item.phaseQuantity },
          ]}
        />
      </PageContainer>
      {showModalTrail && (
        <ModalTrail
          show={showModalTrail}
          onHide={() => setShowTrail(!showModalTrail)}
        />
      )}
      {showModalTrailStudent &&  (
        <ModalTrailStudent
          show={showModalTrailStudent}
          onHide={() => setShowTrailStudent(!showModalTrailStudent)}
          trailSelect={trailSelect}
        />
      )}
    </Loading>
  );
}
