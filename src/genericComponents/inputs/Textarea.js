import React from "react";
import { Col } from "react-bootstrap";
import { Form, Spinner } from "react-bootstrap";
import { useFormFull } from "form-full";
import "./Inputs.css";

function TextareaComponent(props) {
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
    controlProps = {},
    colProps = {},
  } = props;
  return (
    <Form.Group as={Col} {...colProps}>
      <Form.Label>
        {label}{" "}
        {Boolean(required) ? (
          <Form.Label className="is-required required-asterisk">*</Form.Label>
        ) : null}
      </Form.Label>
      <Form.Control
        type="text"
        {...controlProps}
        value={value}
        onChange={(event) => onChange(event, event.target.value)}
        onBlur={onBlur}
        as="textarea"
        ref={ref}
        disabled={formDisabled || disabled || loading || validationLoading}
        isInvalid={error}
        isValid={valid}
        onKeyPress={onSubmit}
        autoComplete="new-password"
        maxLength={1000}
      />

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

export default React.memo(TextareaComponent);
