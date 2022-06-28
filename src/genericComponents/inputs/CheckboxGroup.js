import React from "react";
import { useFormFull } from "form-full";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Form, Spinner } from "react-bootstrap";

function CheckboxGroup(props) {
  const { value, error, onChange, testFieldError, ref, formDisabled } =
    useFormFull.field(props);

  const { label, required, disabled, loading, options, colProps = {} } = props;
  return (
    <Form.Group as={Col} {...colProps}>
      <Form.Label>
        {label}{" "}
        {Boolean(required) ? (
          <Form.Label className="is-required required-asterisk">*</Form.Label>
        ) : null}
      </Form.Label>
      <br />
      <Row>
        {options.map((item, key) => (
          <Col key={key} className="radio-options" xs={12}>
            <Form.Check
              id={`checkbox-${props.name}-${key}`}
              ref={key === 0 ? ref : null}
              label={item.label}
              value={item.value}
              onChange={(event) => {
                const newValue = value ? { ...value } : {};
                newValue[item.value] = !newValue[item.value];
                onChange(event, newValue);
                testFieldError();
              }}
              checked={value[item.value] ?? false}
              disabled={formDisabled || disabled || loading}
            />
          </Col>
        ))}
      </Row>
      <Form.Control.Feedback
        className={error ? "input-control-feedback" : null}
        type="invalid"
      >
        {error ? error : " "}
      </Form.Control.Feedback>
      {loading ? (
        <Spinner animation="border" role="status" className="input-spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : null}
    </Form.Group>
  );
}

export default React.memo(CheckboxGroup);
