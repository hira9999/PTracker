import { useState } from 'react';
import { SumbitCallbacks } from '../types/interfaces';

export const useForm = <T,>(
  submitCallback: SumbitCallbacks<T>,
  initialValue: T
) => {
  const [values, setValues] = useState<T>(initialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitCallback(values);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [(e.target as HTMLTextAreaElement).name]: (
        e.target as HTMLTextAreaElement
      ).value,
    });
  };

  return { onChange, onSubmit, values };
};
