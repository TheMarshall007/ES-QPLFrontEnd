import React from "react";
import { masks, validations } from "../../utils";
import Input from "./Input";

function InputINSSComponent({ inputMaskProps = {}, ...props }) {
  return (
    <Input
      {...props}
      inputMaskProps={{
        placeholder: "Número do INSS",
        ...inputMaskProps,
      }}
      maxLength={12}
      mask={masks.removeNumberMask}
      validation={validations.validateInss}
      maskToSubmit={masks.removeNumberMask}
    />
  );
}

export default React.memo(InputINSSComponent);
