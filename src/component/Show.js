import { Stack } from "@mui/material";

const Show = ({ text, fontSize, alignItems }) => {
  //   const textArr = text.split("\n");

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems={alignItems}
      style={{ fontSize: `${fontSize}px` }}
    >
      {text}
      {/* {textArr.map((n) => n)} */}
    </Stack>
  );
};

export default Show;
