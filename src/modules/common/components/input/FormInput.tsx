import React, { useMemo } from 'react';
import { Control, useController } from 'react-hook-form';
import InputComponent from './InputComponent';

interface Props {
  title?: string;
  control: Control;
  name: string;
  rules?: any;
  defaultValue: any;
}

const FormInput = (props: Props) => {
  const { title, control, name, rules, defaultValue } = props;
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ control, name, rules, defaultValue });
  const isRequired = useMemo(() => {
    return !!rules?.required;
  }, [rules]);
  return (
    <div className="flex w-full flex-wrap gap-x-5 gap-y-3 md:flex-nowrap">
      <div
        className={`w-full pt-[6px] after:ml-1 ${
          isRequired && "after:text-red-500 after:content-['*']"
        }  md:w-2/6 md:text-right`}
      >
        {title}
      </div>
      <div className="w-full md:w-2/6">
        <InputComponent value={value} onChange={onChange} />
        {error && <div className="mt-2 ml-2 w-full text-red-500">{error.message}</div>}
      </div>
    </div>
  );
};

export default React.memo(FormInput);
