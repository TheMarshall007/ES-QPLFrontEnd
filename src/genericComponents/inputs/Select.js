import React from "react";
import { Col } from "react-bootstrap";
import { Form, Spinner } from "react-bootstrap";
import { useFormFull } from "form-full";
import "./Inputs.css";

function InputComponent(props) {
  const {
    value,
    error,
    valid,
    onChange,
    testFieldError,
    ref,
    formDisabled,
    validationLoading,
  } = useFormFull.field(props);

  const {
    label,
    required,
    disabled,
    loading,
    controlProps,
    placeholder,
    options,
    colProps = {},
  } = props;
  return (
    <Form.Group as={Col} {...colProps}>
      <Form.Label>
        {label}{" "}
        {Boolean(required) ? (
          <Form.Label
            className="is-required 
required-asterisk"
          >
            *
          </Form.Label>
        ) : null}
      </Form.Label>
      <Form.Control
        {...controlProps}
        as="select"
        value={value}
        disabled={formDisabled || disabled || loading || validationLoading}
        ref={ref}
        isInvalid={error}
        isValid={valid}
        autoComplete="off"
        onChange={(event) => {
          onChange(event, event.target.value);
          testFieldError();
        }}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((item, key) => (
          <option value={item.value} key={key}>
            {item.label}
          </option>
        ))}
      </Form.Control>
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
