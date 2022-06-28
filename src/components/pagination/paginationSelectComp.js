import React from "react";
import { Form } from "react-bootstrap";

export default function PaginationSelectComp({ page, changePage, totalPages }) {
  const [totalPagesArray, setTotalPages] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState();
  React.useEffect(() => {
    if (totalPages) {
      if (totalPages !== totalPagesArray?.length) {
        let totalPagesArray = [];
        for (let i = 0; i < totalPages; i++) {
          totalPagesArray.push(i + 1);
        }
        setTotalPages(totalPagesArray);
        setCurrentPage(page);
      }
    }
  }, [totalPagesArray, page, totalPages]);

  function onChangePage(e) {
    e.persist();
    let p = e.target.value;
    setCurrentPage(p);
    changePage(p);
  }

  return (
    <div className="d-flex justify-content-end align-items-center">
      <span>Página</span>
      {totalPagesArray ? (
        <div className={"w-25 pl-2"}>
          <Form.Control
            as="select"
            value={currentPage}
            onChange={(e) => onChangePage(e)}
          >
            {totalPagesArray.map((item, key) => (
              <option value={item} key={key}>
                {item}
              </option>
            ))}
          </Form.Control>
        </div>
      ) : null}
    </div>
  );
}
