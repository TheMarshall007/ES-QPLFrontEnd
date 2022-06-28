import React, { useEffect, useState } from "react";
import { Header, Loading, PageContainer, TableComponentWithPagination } from "../../genericComponents";
import ModalStudent from "./ModalStudent";
import { performGetStudent } from "./controllers/StudentControllers";
export default function Student() {
  const [showModalStudent, setShowStudent] = useState();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [fixedTotalItems, /*setFixedTotalItems*/] = useState(0);
  const [totalPages, /*setTotalPages*/] = useState(0);
  const [page, /*setPage*/] = useState(0);
 
  useEffect(() => {
    setLoading(true)
    performGetStudent(loading, handleCustomerChange)
  }, []);

  function handleCustomerChange(data){
      setList(
       data.map((item) => ({
          id: item.id,
          userId: item.userId,
          name: item.username,
          cpf: item.registration,
          email: item.email,
        }))
        .sort((a, b) => (a.id > b.id ? 1 : -1)),)
      setTotalItems(data.length)
      setLoading(false)
    
  };

  return (
    <Loading loading={loading}>
      <Header
        active="Estudantes"
        logged
        buttons={[
          {
            onClick: () => setShowStudent(!showModalStudent),
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
              { label: "Nome", sortProperty: "name" },
              { label: "CPF", sortProperty: "cpf" },
              { label: "Email", sortProperty: "email" },              
            ]}
            totalItems={totalItems}
            fixedTotalItems={fixedTotalItems}
            totalPages={totalPages}
            page={page + 1}
            list={list}
            forEach={(item) => [
              { label: item.id },
              { label: item.name },
              { label: item.cpf },
              { label: item.email },              
            ]}
          />
        </PageContainer>
      {showModalStudent && (
        <ModalStudent
          show={showModalStudent}
          onHide={() => setShowStudent(!showModalStudent)}
        />
      )}
    </Loading>
  );
}
