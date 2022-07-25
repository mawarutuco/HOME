import { Button } from "@mui/material";

const HomeButton = ({ value, doClick, color = "primary" }) => {
  return (
    <Button variant="outlined" onClick={doClick} color={color} size='large'>
      {value}
    </Button>
  );
};

export default HomeButton;
