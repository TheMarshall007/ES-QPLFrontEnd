import React from "react";
import { masks, validations } from "../../utils";
import Input from "./Input";

function InputPhoneComponent({ inputMaskProps = {}, ...props }) {
  return (
    <Input
      {...props}
      mask={masks.inputMaskTELWithDDD}
      inputMaskProps={{
        placeholder: "Contato",
        ...inputMaskProps,
      }}
      validation={validations.checkPhone}
    />
  );
}

export default React.memo(InputPhoneComponent);
