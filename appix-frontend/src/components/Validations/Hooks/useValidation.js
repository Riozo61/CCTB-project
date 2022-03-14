import { useEffect, useState } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emaiError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [minValueError, setMinValueError] = useState(false);
  const [maxValueError, setMaxValueError] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break; 
        case "maxLenght":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "isEmail":
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        case "minValue":
          value <= validations[validation]
            ? setMinValueError(true)
            : setMinValueError(false);
          break;
        case "maxValue":
          value >= validations[validation]
            ? setMaxValueError(true)
            : setMaxValueError(false);
          break;

          default: 
          return null;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || maxLengthError || emaiError || minLengthError || minValueError || maxValueError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, maxLengthError, minLengthError, emaiError]);
  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emaiError,
    inputValid,
    minValueError,
    maxValueError,
  };
};

export default useValidation;
