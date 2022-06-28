function removeNumberMask(string) {
  return String(string).replace(/\D/g, "");
}

// Máscara de CPF
function CPF(value) {
  if (!value) {
    return value;
  }
  let mask = removeNumberMask(value);

  if (mask.length > 11) {
    mask = mask.substring(0, 11);
  }

  if (mask.length <= 11) {
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return mask;
}

function CNPJ(value) {
  let mask = removeNumberMask(value);

  if (mask.length > 14) {
    mask = mask.substring(0, 14);
  }
  if (mask.length <= 14) {
    mask = mask.replace(/(\d{2})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1/$2");
    mask = mask.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
  return mask;
}

function CPFCNPJ(value) {
  if (!value) {
    return value;
  }
  let mask = removeNumberMask(value);

  if (mask.length > 14) {
    mask = mask.substring(0, 14);
  } else if (mask.length <= 11) {
    mask = mask.substring(0, 11);
  }

  if (mask.length <= 11) {
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else if (mask.length <= 14) {
    mask = mask.replace(/(\d{2})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1/$2");
    mask = mask.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
  return mask;
}

// Máscara de telefone fixo e celular com DDD
function inputMaskTELWithDDD(value) {
  if (!value) {
    return value;
  }
  let mask = removeNumberMask(value);

  if (mask.length > 11) {
    mask = mask.substring(0, 11);
  }

  if (mask.length <= 10) {
    mask = mask.replace(/(\d{2})(\d)/, "($1) $2");
    mask = mask.replace(/(\d)(\d{4})$/, "$1-$2");
  } else {
    mask = mask.replace(/(\d{2})(\d)/, "($1) $2");
    mask = mask.replace(/(\d{1})(\d{4})/, "$1 $2");
    mask = mask.replace(/(\d{4})(\d{4})$/, "$1-$2");
  }

  return mask;
}

function inputMoney(value) {
  return numericMask(value, true, true);
}

function formatSmallNumberValues(value, isMoney, floatNumber, negative) {
  const mask = String(
    Number(String(value).replace(/\./g, "").replace("R$ ", "").replace(",", ""))
  );

  if (!mask) {
    return isMoney
      ? `R$ ${negative}0,00`
      : floatNumber
      ? `${negative}0,00`
      : `${negative}0`;
  }
  if (mask.length === 1) {
    return isMoney
      ? `R$ ${negative}0,0` + mask
      : floatNumber
      ? `${negative}0,0${mask}`
      : negative + mask;
  } else if (mask.length === 2) {
    return isMoney
      ? `R$ ${negative}0,` + mask
      : floatNumber
      ? `${negative}0,${mask}`
      : negative + mask;
  } else {
    return mask;
  }
}

function numericMask(value, isMoney, floatNumber = true) {
  const negative = value < 0 ? "-" : "";
  if (value) {
    let mask = `${value}`.replace(/\D/g, "");
    if (!mask) {
      return isMoney
        ? `${negative}0,00`
        : floatNumber
        ? negative + "0,00"
        : negative + "0";
    }
    mask = formatSmallNumberValues(mask, isMoney, floatNumber, negative);

    if (isMoney && mask.includes("R$ ")) {
      return mask.replace("R$ ", "");
    }
    const contador = floatNumber ? (value.length - 5) / 3 : value.length / 3;

    if (floatNumber) {
      mask = mask.replace(/^([.\d]+)(\d{2})$/, "$1,$2");
    }
    for (let i = 0; i < contador; i += 1) {
      mask = mask.replace(/(\d+)(\d{3})([.,\d]+)?$/, "$1.$2$3");
    }
    mask = isMoney ? `${negative}${mask}` : negative + mask;
    return mask;
  }

  return isMoney
    ? `${negative}0,00`
    : floatNumber
    ? negative + "0,00"
    : negative + "0";
}
// Fim máscaras valores monetários

// Remove máscara de valores numéricos com decimais.
function removeNumericMask(value) {
  const stringValue = `${value}`.replace(/\D/g, "");
  if (stringValue.length === 1) {
    return parseFloat((value < 0 ? "-" : "") + `0.0${stringValue}`);
  }
  if (stringValue.length === 2) {
    return parseFloat((value < 0 ? "-" : "") + `0.${stringValue}`);
  }

  return parseFloat(stringValue.replace(/(\d+)(\d{2})$/, "$1.$2"));
}

// Máscara de valores monetários
function money(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Máscara de valores em porcentagem
function tax(value) {
  // return `%${Number(value).toFixed(2)}`;
  return `${Number(value).toFixed(2).replace(".", ",")}%`;
}

// Inicio de funções para capitalização de textos inteligente.
function capitalizeAll(textValue) {
  return textValue
    .split(" ")
    .map((splitText) => {
      return (
        splitText.charAt(0).toUpperCase() + splitText.slice(1).toLowerCase()
      );
    })
    .join(" ");
}

function noCapitalize(word) {
  const prepos = [
    "da",
    "do",
    "das",
    "dos",
    "a",
    "e",
    "é",
    "à",
    "á",
    "o",
    "que",
    "se",
    "de",
    "para",
    "por",
  ];

  return prepos.includes(word.toLowerCase());
}

function getWordsBySeparator(text, separator) {
  return text.split(separator);
}

function capitalizeWord(word, restToLowerCase) {
  if (!noCapitalize(word)) {
    return `${word.charAt(0).toUpperCase()}${
      restToLowerCase ? word.slice(1).toLowerCase() : word.slice(1)
    }`;
  } else {
    return word.toLowerCase();
  }
}

function capitalizeText(splitedText, separators, restToLowerCase) {
  if (splitedText.length > 1) {
    return splitedText
      .map((word) => {
        return capitalizeWord(word, restToLowerCase);
      })
      .join(separators);
  } else {
    return capitalizeWord(splitedText.join(""), restToLowerCase);
  }
}

function capitalizeBySeparators(text, separators) {
  let resultText = text;
  for (let i = 0; i < separators.length; i++) {
    resultText = capitalizeText(
      getWordsBySeparator(resultText, separators[i]),
      separators[i],
      i === 0
    );
  }

  return resultText;
}
// Fim de funções para capitalização de textos inteligente.

const masks = {
  CPF,
  CNPJ,
  CPFCNPJ,
  inputMoney,
  money,
  removeNumericMask,
  tax,
  capitalizeBySeparators,
  capitalizeAll,
  removeNumberMask,
  inputMaskTELWithDDD,
};

export default masks;
