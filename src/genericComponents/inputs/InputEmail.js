import React from "react";
import { validations } from "../../utils";
import Input from "./Input";

function InputEmailComponent({ inputMaskProps = {}, validation, ...props }) {
  return (
    <Input
      {...props}
      inputMaskProps={{
        placeholder: "email@gmail.com",
        ...inputMaskProps,
      }}
      mask={(email) => email.toLowerCase()}
      maskToSubmit={(email) => email.toLowerCase()}
      validation={validations.isEmailValid}
    />
  );
}

export default React.memo(InputEmailComponent);
