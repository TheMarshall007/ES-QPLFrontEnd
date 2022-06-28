import React from "react";
import { masks, validations } from "../../utils";
import Input from "./Input";

function InputCNPJComponent({ inputMaskProps = {}, ...props }) {
  return (
    <Input
      {...props}
      inputMaskProps={{
        placeholder: "12.123.123/1231.12",
        mask: "99.999.999/9999-99",
        ...inputMaskProps,
      }}
      validation={validations.validateCNPJ}
      maskToSubmit={masks.removeNumberMask}
    />
  );
}

export default React.memo(InputCNPJComponent);
