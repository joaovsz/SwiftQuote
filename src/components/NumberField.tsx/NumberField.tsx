/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputNumber } from "primereact/inputnumber";
import styles from "../CustomInputText/CustomInputText.module.css";
import React from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { classNames } from "primereact/utils";

interface CustomInputNumberProps {
    label: string;
    id: string;
    name: string;
    currency?: boolean;
    style?: React.CSSProperties;
    placeHolder?: string;
}
interface CustomTextField extends CustomInputNumberProps {
    controllerProps: UseControllerProps<any>;
}
const CustomInputNumber = ({
    label,
    id,
    name,
    controllerProps,
    style,
    placeHolder,
    currency,
}: CustomTextField) => {
    const { field, fieldState } = useController(controllerProps);

    return (
        <span
            className={styles.column}
            style={{ ...style, minWidth: "300px", width: "408px" }}
        >
            <label htmlFor={name} >{label}</label>
            <InputNumber
                mode={currency ? "currency" : undefined}
                currency={currency ? "BRL" : undefined}
                locale="pt-BR"
                currencyDisplay="symbol"
                value={field.value}
                onValueChange={(e) => {
                    field.onChange(e.value);
                }}
                className={`${classNames({ "p-invalid": fieldState.error })} `}
                style={{ ...style }}
                id={id}
                inputId={id}
                name={name}
                placeholder={placeHolder}
            />
            {fieldState.error && (
                <small className="p-error">{fieldState.error.message}</small>
            )}
        </span>
    );
};

export default CustomInputNumber;