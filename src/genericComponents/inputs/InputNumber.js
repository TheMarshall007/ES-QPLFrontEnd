import React from "react";
import { masks, validations } from "../../utils";
import Input from "./Input";

function InputNumberComponent({
  inputMaskProps = {},
  floatNumber = false,
  ...props
}) {
  return (
    <Input
      {...props}
      mask={masks.removeNumberMask}
      validation={(value, ffHandler) => {
        const errorMessage = validations.validNumber(value);
        if (errorMessage) {
          return errorMessage;
        } else if (props.validation) {
          return props.validation(value, ffHandler);
        } else {
          return null;
        }
      }}
    />
  );
}

export default React.memo(InputNumberComponent);
