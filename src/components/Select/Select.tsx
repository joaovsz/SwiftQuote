import React from "react";
import { Dropdown } from "primereact/dropdown";
import styles from "./Select.module.css";
import { useController, UseControllerProps } from "react-hook-form";
interface SelectFieldProps extends React.HTMLProps<HTMLSelectElement> {
  label: string;
  id: string;
  name: string;
  style?: React.CSSProperties;
  placeHolder?: string;
  options: any[];
  placeholder?: string;
  type?: string;
}
interface SelectField extends SelectFieldProps {
  controllerProps: UseControllerProps<any>;
}
const Select = ({
  style,
  id,
  label,
  controllerProps,
  className,
  options,
  placeholder,
}: SelectField) => {
  const { field, fieldState } = useController(controllerProps);

  return (
    <div
      className={styles.column}
      style={{ ...style, minWidth: "250px", maxWidth: "500px" }}
    >
      <label htmlFor={id} id={`${id}-label`}>
        {label}
      </label>
      <Dropdown
        {...field}
        value={field.value || ""}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
        options={options}
        optionLabel="name"
        showClear
        placeholder={placeholder}
        className={className}
      />
      {fieldState.error && (
        <small className="p-error">{fieldState.error.message}</small>
      )}
    </div>
  );
};

export default Select;
