import React from "react";
import { masks, validations } from "../../utils";
import Input from "./Input";

function InputCPFComponent({ inputMaskProps = {}, validation, ...props }) {
  return (
    <Input
      {...props}
      inputMaskProps={{
        placeholder: "123.123.123-12",
        mask: "999.999.999-99",
        ...inputMaskProps,
      }}
      maskToSubmit={masks.removeNumberMask}
      validation={validations.validateCPF}
    />
  );
}

export default React.memo(InputCPFComponent);
