import { Button } from "primereact/button";
interface CustomButtonProps {
  label: string;
  className?: string;
  type?: "submit" | "button";
  style?: React.CSSProperties;
  onClick?: () => void;
  isLoading?: boolean;
}
const CustomButton = ({
  label,
  onClick,
  style,
  type = "button",
  className,
  isLoading,
}: CustomButtonProps) => {
  return (
    <Button
      disabled={isLoading}
      loading={isLoading}
      loadingIcon="pi pi-spin pi-spinner"
      onClick={onClick}
      type={type}
      style={style}
      label={label}
      className={`p-button-success p-button-rounded p-button-raised ${className}`}
    />
  );
};

export default CustomButton;
