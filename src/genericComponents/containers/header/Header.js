import React from "react";
import {
  Breadcrumb,
  Button,
  Popover,
  OverlayTrigger,
  InputGroup,
} from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import styles from "./Header.module.css";

function Header({ navigation, buttons, logged = false, filter, active }) {
  return (
    <div className={`${styles.header} ${logged ? "" : styles.notLogged}`}>
      <div className={styles.content}>
        <Row className="p-0 m-0">
          <Breadcrumb className={styles.breadcrumb}>
            {logged ? (
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            ) : null}
            {navigation
              ? navigation.map((item, index) => {
                  if (!item) return null;
                  return (
                    <Breadcrumb.Item key={index} href={item.href}>
                      {item.label}
                    </Breadcrumb.Item>
                  );
                })
              : null}
            <Breadcrumb.Item active>{active}</Breadcrumb.Item>
          </Breadcrumb>
          <Col xs className="d-flex justify-content-end pr-0">
            {filter ? (
              <Col xs>
                <InputGroup
                  className={`justify-content-end pr-0 d-flex  ${styles.headerItems}`}
                >
                  <Form.Control
                    {...filter}
                    className={`ml-6 d-inline-block ${styles.searchBar}`}
                  />
                  {filter.onClick ? (
                    <InputGroup.Text>
                      <div
                        {...filter}
                        className="fas fa-search clickable"
                      ></div>
                    </InputGroup.Text>
                  ) : null}
                </InputGroup>
              </Col>
            ) : null}
            <Col xs="auto" className={`text-right pr-0 ${styles.headerItems}`}>
              {buttons
                ? buttons.map((item, index) => {
                    if (!item) return null;
                    const {
                      title,
                      icon,
                      label,
                      variant = "primary",
                      className,
                      ...itemProps
                    } = item;

                    if (title) return null;

                    return (
                      <Button
                        key={index}
                        variant={variant}
                        className={`${className} ml-2`}
                        {...itemProps}
                      >
                        {icon ? <i className={`${icon} mr-2`} /> : null}
                        <span>{label}</span>
                      </Button>
                    );
                  })
                : null}
            </Col>
            {buttons || filter ? (
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                rootClose
                overlay={
                  <Popover id="popover-basic">
                    <Popover.Title as="h3">Ações</Popover.Title>
                    <Popover.Content>
                      {filter ? (
                        <Col
                          xs
                          className={`justify-content-end px-0 ${
                            buttons ? "pb-2" : ""
                          } d-flex`}
                        >
                          <Form.Control
                            {...filter}
                            className={`d-inline-block ${styles.searchBar}`}
                          />
                        </Col>
                      ) : null}
                      {buttons
                        ? buttons.map((item, index) => {
                            if (!item) return null;
                            const {
                              title,
                              icon,
                              label,
                              variant = "primary",
                              className,
                              ...itemProps
                            } = item;
                            if (title) {
                              return (
                                <p key={index} className={styles.buttonsTitle}>
                                  {title}
                                </p>
                              );
                            }
                            return (
                              <Button
                                key={index}
                                variant={variant}
                                className={`${className} w-100 ${
                                  !filter && index === 0 ? "" : "mt-2"
                                }`}
                                {...itemProps}
                              >
                                {icon ? <i className={`${icon} mr-2`} /> : null}
                                <span>{label}</span>
                              </Button>
                            );
                          })
                        : null}
                    </Popover.Content>
                  </Popover>
                }
              >
                <Button variant="primary" className={styles.overlayMenu}>
                  <i className={`fas fa-ellipsis-h`} />
                </Button>
              </OverlayTrigger>
            ) : null}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Header;
