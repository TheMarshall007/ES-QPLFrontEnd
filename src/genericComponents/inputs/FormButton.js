import { useFormFull } from "form-full";
import React from "react";
import { Button, Spinner } from "react-bootstrap";

function FormButtonComponent({
  children,
  disabled,
  loading,
  name,
  actionType,
  onClick: propsOnClick,
  ...props
}) {
  const { onClick, formLoading, formDisabled } = useFormFull.button({
    name,
    actionType,
    onClick: propsOnClick,
  });

  return (
    <Button
      {...props}
      disabled={disabled || formDisabled}
      type={null}
      onClick={loading || formLoading ? null : onClick}
    >
      {loading || formLoading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        children
      )}
    </Button>
  );
}

export default FormButtonComponent;
