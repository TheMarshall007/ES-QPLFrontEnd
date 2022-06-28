import React from "react";
import { validations } from "../../utils";
import Input from "./Input";

function InputNameComponent({ inputMaskProps = {}, ...props }) {
  return (
    <Input
      {...props}
      inputMaskProps={{
        className: "form-input-capitalize",
        placeholder: "NOME COMPLETO",
        ...inputMaskProps,
      }}
      validation={validations.isValidFullname}
    />
  );
}

export default React.memo(InputNameComponent);
