import { useFormFull } from "form-full";
import React from "react";
import { Col } from "react-bootstrap";
import { Form, Spinner, InputGroup } from "react-bootstrap";
import InputMask from "react-input-mask";
import "./Inputs.css";

function InputComponent(props) {
  const {
    value,
    error,
    valid,
    onSubmit,
    onBlur,
    onChange,
    ref,
    formDisabled,
    validationLoading,
  } = useFormFull.field(props);

  const {
    label,
    required,
    disabled,
    loading,
    inputMaskProps = {},
    controlProps = {},
    colProps = {},
    children,
  } = props;

  return (
    <Form.Group as={Col} {...colProps}>
      {label ? (
        <Form.Label className="w-100 text-nowrap overflow-hidden">
          {label}
          {Boolean(required) ? (
            <Form.Label className="is-required required-asterisk">*</Form.Label>
          ) : null}
        </Form.Label>
      ) : null}
      <InputGroup>
        <InputMask
          {...inputMaskProps}
          value={value}
          disabled={formDisabled || disabled || loading || validationLoading}
          onChange={(event) => onChange(event, event.target.value)}
          onBlur={onBlur}
        >
          <Form.Control
            type="text"
            {...controlProps}
            ref={ref}
            isInvalid={error}
            isValid={valid}
            onKeyPress={onSubmit}
            autoComplete="new-password"
          />
        </InputMask>
        {children ? <InputGroup.Append>{children}</InputGroup.Append> : null}
      </InputGroup>
      <Form.Control.Feedback
        className={error ? "input-control-feedback" : null}
        type="invalid"
      >
        {error ? error : " "}
      </Form.Control.Feedback>
      {loading || validationLoading ? (
        <Spinner animation="border" role="status" className="input-spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : null}
    </Form.Group>
  );
}

export default React.memo(InputComponent);
