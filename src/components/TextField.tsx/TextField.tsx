/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputText } from "primereact/inputtext";
import styles from "./TextField.module.css";
import React from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { classNames } from "primereact/utils";

interface TextFieldProps {
  label: string;
  id: string;
  name: string;
  style?: React.CSSProperties;
  placeHolder?: string;
  type?: string;
}
interface TextField extends TextFieldProps {
  controllerProps: UseControllerProps<any>;
}
const TextField = ({
  label,
  id,
  name,
  controllerProps,
  style,
  placeHolder,
  type,
}: TextField) => {
  const { field, fieldState } = useController(controllerProps);

  return (
    <span
      className={styles.column}
      style={{ ...style, minWidth: "300px", maxWidth: "500px" }}
    >
      <label htmlFor={id} id={`${id}-label`}>
        {label}
      </label>
      <InputText
        value={field.value || ""}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
        className={`${classNames({ "p-invalid": fieldState.error })} `}
        style={{ background: "#333130", color: "#9E9E9E" }}
        name={name}
        id={id}
        type={type || "text"}
        placeholder={placeHolder}
      />
      {fieldState.error && (
        <small className="p-error">{fieldState.error.message}</small>
      )}
    </span>
  );
};

export default TextField;
