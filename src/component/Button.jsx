import { Button } from "@mui/material";

const HomeButton = ({
  value,
  doClick,
  color = "primary",
  variant = "outlined",
}) => {
  return (
    <Button variant={variant} onClick={doClick} color={color} size="large">
      {value}
    </Button>
  );
};

export default HomeButton;
