import React, { useState } from 'react'

const useForm = (options) => {
  const [data, setData] = useState(options?.initialValuse || {});
  const handleChange = (
    key,
    sanitizeFn,
  ) => (e) => {
    const value = sanitizeFn ? sanitizeFn(e.target.valuse) : e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (options?.onSubmit) {
      options.onSubmit();
    }
  }
  return {
    data,
    handleChange,
    handleSubmit,
  }
}

export default useForm
