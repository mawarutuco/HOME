import { Button } from "@mui/material";

const HomeButton = ({ value, fun, color = "primary" }) => {
  return (
    <Button variant="outlined" onClick={fun} color={color} size='large'>
      {value}
    </Button>
  );
};

export default HomeButton;
