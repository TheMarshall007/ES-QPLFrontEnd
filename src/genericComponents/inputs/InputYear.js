import React from "react";
import Input from "./Input";
import { parse } from "date-fns";
import { validations } from "../../utils";

function InputYearComponent({
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
        mask: "9999",
        placeholder: "1970",
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
          date.length === 4 ? parse(date, "yyyy", new Date()) : date,
          minDate,
          maxDate,
          "yyyy"
        );
      }}
    />
  );
}

export default React.memo(InputYearComponent);
