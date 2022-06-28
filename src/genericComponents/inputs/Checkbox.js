import { useFormFull } from "form-full";
import React from "react";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";

function CustomerSurvey10(props) {
  const { value, error, testFieldError, onChange, ref, formDisabled } =
    useFormFull.field(props);
  const {
    label,
    required,
    colProps = {},
    idComp = "",
    disabled,
    name,
    ...rest
  } = props;

  delete rest.actualValue;
  delete rest.allwaysCheck;
  delete rest.validation;

  return (
    <Form.Group as={Col} {...colProps}>
      <Form.Check
        {...rest}
        disabled={formDisabled || disabled}
        id={"id-" + name + idComp}
        ref={ref}
        className={required ? "required" : null}
        label={label}
        value={value}
        onChange={(event) => {
          onChange(event, !value);
          testFieldError();
        }}
        checked={value}
      />

      <Form.Control.Feedback
        className={error ? "input-control-feedback" : null}
        type="invalid"
      >
        {error ? error : " "}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default React.memo(CustomerSurvey10);
