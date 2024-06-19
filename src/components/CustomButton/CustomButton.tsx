import { Button } from "primereact/button";
interface CustomButtonProps {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
const CustomButton = ({
  label,
  onClick,
  style,
  className,
}: CustomButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      style={style}
      label={label}
      className={`p-button-success p-button-rounded p-button-raised ${className}`}
    />
  );
};

export default CustomButton;
