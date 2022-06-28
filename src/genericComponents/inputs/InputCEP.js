import React from "react";
import { masks, validations } from "../../utils";
import Input from "./Input";

function InputCEPComponent({ inputMaskProps = {}, ...props }) {
  return (
    <Input
      {...props}
      inputMaskProps={{
        placeholder: "12312-312",
        mask: "99999-999",
        ...inputMaskProps,
      }}
      validation={validations.isValidCEP}
      maskToSubmit={masks.removeNumberMask}
    />
  );
}

export default React.memo(InputCEPComponent);
