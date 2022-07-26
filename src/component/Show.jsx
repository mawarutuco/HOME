import { Stack } from "@mui/material";

const Show = ({ text, fontSize, alignItems }) => {
  const textArr = text.split("\n");

  return (
    <Stack direction="column" justifyContent="center">
      {textArr.map((n, index) =>
        n.indexOf("廖本源") > -1 ? (
          <Stack key={index} style={{ fontSize: `35px` }} alignItems="flex-end">
            {n}
          </Stack>
        ) : (
          <Stack
            key={index}
            style={{ fontSize: `${fontSize}px` }}
            alignItems={alignItems}
          >
            {n}
          </Stack>
        )
      )}
    </Stack>
  );
};

export default Show;
