import { useFormFull } from "form-full";
import React from "react";
import { Col, Form, InputGroup, Spinner } from "react-bootstrap";
import InputMask from "react-input-mask";

function CheckInputComponent(props) {
  const inputs = props.inputs.map((input) => {
    return { ...input, ...useFormFull.field(input) };
  });

  const {
    label,
    disabled,
    loading,
    colProps = {},
    checked: propsChecked,
  } = props;

  const [checked, setChecked] = React.useState(false);
  const [checkedCompare, setCheckedCompare] = React.useState(null);
  React.useEffect(() => {
    if (propsChecked !== checkedCompare) {
      setCheckedCompare(propsChecked);
      setChecked(propsChecked);
    }
  }, [propsChecked, checkedCompare, setCheckedCompare, setChecked]);

  const mount = React.useCallback(() => {
    inputs.map((input) => {
      const { ffHandler, name, required } = input;
      ffHandler.setFieldRequired(name, checked ? required : null);
      return null;
    });
  }, [inputs, checked]);

  React.useEffect(mount, [mount]);

  return (
    <Form.Group as={Col} {...colProps}>
      <Form.Label>
        {label}{" "}
        {checked ? (
          <Form.Label className="is-required required-asterisk">*</Form.Label>
        ) : null}
      </Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Checkbox
            checked={checked}
            onChange={() => {
              if (checked) {
                inputs.map((input) => {
                  input.ffHandler.clearValue(input.name);
                  input.ffHandler.setFieldRequired(input.name, null);
                  input.ffHandler.testFieldError(input.name);
                  return null;
                });
              } else {
                inputs.map((input) => {
                  input.ffHandler.setFieldRequired(input.name, input.required);
                  return null;
                });
              }
              setChecked((prevChecked) => !prevChecked);
            }}
            disabled={disabled || loading}
          />
        </InputGroup.Prepend>
        {inputs.map((input, key) => {
          const {
            value,
            error,
            valid,
            onSubmit,
            onBlur,
            validationLoading,
            onChange,
            ref,
            inputMaskProps,
            controlProps,
            formDisabled,
          } = input;
          return (
            <InputMask
              key={key}
              {...inputMaskProps}
              value={value}
              disabled={
                formDisabled ||
                !checked ||
                disabled ||
                loading ||
                validationLoading
              }
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
                autoComplete="off"
              />
            </InputMask>
          );
        })}
      </InputGroup>

      {inputs.map((input, key) => {
        const { error } = input;
        return (
          <Form.Control.Feedback
            key={key}
            className={error ? "input-control-feedback" : null}
            type="invalid"
          >
            {error ? error : " "}
          </Form.Control.Feedback>
        );
      })}

      {loading ? (
        <Spinner animation="border" role="status" className="input-spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : null}
    </Form.Group>
  );
}

export default React.memo(CheckInputComponent);
