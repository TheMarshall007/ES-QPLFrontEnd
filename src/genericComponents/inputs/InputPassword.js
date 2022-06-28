import React from "react";
import { Button } from "react-bootstrap";
import Input from "./Input";

function InputPasswordComponent({ controlProps = {}, ...props }) {
  const [type, setType] = React.useState("password");

  const passwordHandleClick = React.useCallback(
    () =>
      setType((prevType) => (prevType === "password" ? "text" : "password")),
    [setType]
  );
  return (
    <Input {...props} controlProps={{ ...controlProps, type }}>
      <Button
        variant={`outline-secondary ${
          props.disabled || props.loading ? "input-password_disabled" : ""
        }`}
        onClick={props.disabled || props.loading ? null : passwordHandleClick}
      >
        {type === "password" ? (
          <i className="fas fa-eye" />
        ) : (
          <i className="fas fa-eye-slash" />
        )}
      </Button>
    </Input>
  );
}

export default React.memo(InputPasswordComponent);
