import { useState } from 'react'
import useValidation from './useValidation';

const useInputPhone = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations)
  const onChange = (e) => {
    setValue(e)
  }
  const onBlur = (e) => {
    setDirty(true)
  }
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}

export default useInputPhone