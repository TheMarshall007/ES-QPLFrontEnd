/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { Col, Table, Row } from "react-bootstrap";
import PaginationSelectComp from "../../../components/pagination/paginationSelectComp";

import styles from "./TableComponent.module.css";

function TableComponentWithPagination({
  header,
  list,
  forEach,
  countLabel,
  countLabelSingular,
  onItemClick,
  setItemClassName,
  containerClassName,
  loading,
  emptyPlaceholder = "Nenhum valor encontrado.",
  page,
  onChangePage,
  totalItems,
  fixedTotalItems,
  totalPages,
}) {
  const [pages, setPages] = React.useState(page);

  function itemClassName(item, onItemClick) {
    let className = onItemClick ? styles.trClickable : styles.tr;
    if (setItemClassName) {
      className += ` ${setItemClassName(item)}`;
    }
    return className;
  }

  function getPageNumbers(size) {
    const newPages = [];
    for (let i = 0; i < size; i++) {
      newPages.push(i);
    }
    return newPages;
  }

  function getCountElement() {
    return fixedTotalItems * (page - 1) + list.length + "/" + totalItems;
  }

  React.useEffect(() => {
    if (list) {
      const newPages = getPageNumbers(totalPages);
      if (pages?.length !== newPages?.length) {
        setPages(newPages);
      }
    }
  }, [list?.length, loading]);

  return (
    <>
      <div
        className={`w-100 flex-grow-1 flex-shrink-1 overflow-auto ${containerClassName}`}
      >
        {loading ? null : !list?.length ? (
          <p className={styles.emptyTable}>{emptyPlaceholder}</p>
        ) : (
          <Table
            striped
            bordered
            className={`table-bordered bms-color-text my-0 ${styles.table}`}
          >
            <thead>
              <tr>
                {header.map((item, index) =>
                  !item ? null : (
                    <th
                      key={index}
                      className={
                        item.sortProperty ? styles.thClickable : styles.th
                      }
                    >
                      {item.label}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {list?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={itemClassName(item, onItemClick)}
                    onClick={
                      onItemClick ? () => onItemClick(item, index) : null
                    }
                  >
                    {forEach(item, index).map((value, jIndex) =>
                      !value ? null : (
                        <td
                          key={jIndex}
                          className={`${
                            value.className ? value.className : ""
                          } ${value.onClick ? styles.tdClickable : ""}`}
                          onClick={(e) => {
                            if (value.onClick) {
                              e.stopPropagation();
                              value.onClick(e, jIndex);
                            }
                          }}
                        >
                          {value.label}
                        </td>
                      )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
      {!list?.length ? null : (
        <Row className="p-2">
          {countLabel ? (
            <Col lg={6} xs={12}>
              {getCountElement()}{" "}
              {list?.length === 1
                ? countLabelSingular ?? countLabel
                : countLabel}
            </Col>
          ) : null}
          {pages?.length > 1 ? (
            <Col>
              <PaginationSelectComp
                totalPages={totalPages}
                page={page}
                changePage={(value) => onChangePage(value)}
              />
            </Col>
          ) : null}
        </Row>
      )}
    </>
  );
}

export default TableComponentWithPagination;
