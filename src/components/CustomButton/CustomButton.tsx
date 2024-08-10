import { Button } from "primereact/button";
interface CustomButtonProps {
  label: string;
  className?: string;
  type?: "submit" | "button";
  style?: React.CSSProperties;
  onClick?: () => void;
}
const CustomButton = ({
  label,
  onClick,
  style,
  type = "button",
  className,
}: CustomButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      style={style}
      label={label}
      className={`p-button-success p-button-rounded p-button-raised ${className}`}
    />
  );
};

export default CustomButton;
