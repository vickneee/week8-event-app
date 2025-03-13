import {useState} from 'react';

const useField = (type, initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  
  const onChange = (event) => {
    setValue(event.target.value);
    setError(null);
  };
  
  const clear = () => {
    setValue('');
    setError(null);
  };
  
  const validate = (validationFunc) => {
    const validationResult = validationFunc(value);
    setError(validationResult);
    return !validationResult;
  };
  
  return {
    type,
    value,
    onChange,
    clear,
    error,
    validate,
  };
};

export default useField;
