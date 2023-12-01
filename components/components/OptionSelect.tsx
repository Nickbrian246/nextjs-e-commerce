import React, { ChangeEvent, FormEvent, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface OptionSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  selectedOption: string;
  handleOnChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  dataList: string[];
  optionLabel: string;
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  dataList,
  handleOnChange,
  selectedOption,
  optionLabel,
  className,
  ...selectProps
}) => {
  console.log(optionLabel);

  return (
    <div>
      <label htmlFor={optionLabel}>{optionLabel}</label>
      <select
        {...selectProps}
        className={twMerge("p-2", className)}
        id={optionLabel}
        value={selectedOption}
        onChange={handleOnChange}
      >
        {dataList.map((data, index) => (
          <option key={index} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionSelect;
