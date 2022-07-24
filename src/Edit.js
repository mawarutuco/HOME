import "./App.css";
import { Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Btn from "./component/Button";
import Show from "./component/Show";
// import Print from "./Print";

function App({
  text,
  setText,
  fontSize,
  setFontSize,
  alignItems,
  setAlignItems,
}) {
  const navigate = useNavigate();

  function printThis() {
    navigate("/print");
  }

  return (
    <Container className="App">
      <h1>預覽畫面：</h1>
      <Show text={text} fontSize={fontSize} alignItems={alignItems} />
      <hr />
      <TextField
        label="輸入文字"
        helperText="輸入文字"
        variant="outlined"
        minRows={15}
        fullWidth
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Btn value="列印" fun={() => printThis()} color="success" style={{ display:  "none" }}/>
      <Btn value="字放大" fun={() => setFontSize((pre) => Number(pre) + 5)} />
      <Btn value="字縮小" fun={() => setFontSize((pre) => Number(pre) - 5)} />
      <Btn value="字靠左" fun={() => setAlignItems("flex-start")} />
      <Btn value="字中間" fun={() => setAlignItems("center")} />
      <Btn value="清空" fun={() => setText("")} color="error" />
      <hr />
      <TextField label="這份檔名" variant="outlined" />
      <Btn value="存檔" fun={() => console.log("存檔")} />
    </Container>
  );
}

export default App;
