import React from "react";
import { validations } from "../../utils";
import Input from "./Input";

function InputRGComponent({ inputMaskProps = {}, ...props }) {
  return (
    <Input
      {...props}
      inputMaskProps={{
        placeholder: "1.123.123",
        ...inputMaskProps,
      }}
      validation={validations.isRGValid}
    />
  );
}

export default React.memo(InputRGComponent);
