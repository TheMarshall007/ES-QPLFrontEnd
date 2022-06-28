import React from "react";
import Input from "./Input";
import { parse } from "date-fns";
import { validations } from "../../utils";

function InputDateComponent({
  inputMaskProps = {},
  minDate,
  maxDate,
  validation,
  ...props
}) {
  return (
    <Input
      {...props}
      inputMaskProps={{
        mask: "99/99/9999",
        placeholder: "12/10/1970",
        ...inputMaskProps,
      }}
      validation={(date, ffHandler) => {
        if (validation) {
          const errorMessage = validation(date, ffHandler);
          if (errorMessage) {
            return errorMessage;
          }
        }
        return validations.isDATE(
          date.length === 10 ? parse(date, "dd/MM/yyyy", new Date()) : date,
          minDate,
          maxDate
        );
      }}
    />
  );
}

export default React.memo(InputDateComponent);
