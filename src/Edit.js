import "./App.css";
import { Container, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Btn from "./component/Button";
import Show from "./component/Show";

function App({
  text,
  setText,
  fontSize,
  setFontSize,
  alignItems,
  setAlignItems,
}) {
  const navigate = useNavigate();
  let tmp = JSON.parse(localStorage.getItem("history"));
  const [history, setHistory] = useState(tmp || []);

  const [title, setTitle] = useState("");

  const printThis = () => navigate("/print");

  const textInput = document.getElementById("textInput");

  const googleTranslate = () => {
    window.open(
      `https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=vi&text=${text}&op=translate`
    );
    //%0A =>\n
    // setText('')
  };

  return (
    <Container className="App">
      <h1>預覽畫面：</h1>
      <Show text={text} fontSize={fontSize} alignItems={alignItems} />
      <br />
      <TextField
        id="textInput"
        label="輸入文字"
        variant="outlined"
        minRows={10}
        fullWidth
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Btn value="列印" fun={() => printThis()} color="success" />
      <Btn
        value="複製"
        fun={() => {
          textInput.select();
          //時好時壞@@
          document.execCommand("copy");
        }}
      />
      <Btn value="翻譯越南文" fun={() => googleTranslate()} color="success" />
      <Btn
        value="貼上"
        fun={() => {
          // const tmp = window.clipboardData.getData("Text");
          // navigator.clipboard.readText().then((text) => {
          //   alert(text);
          // })
          // setText(tmp);
        }}
      />
      <Btn value="字放大" fun={() => setFontSize((pre) => Number(pre) + 5)} />
      <Btn value="字縮小" fun={() => setFontSize((pre) => Number(pre) - 5)} />
      <Btn value="字靠左" fun={() => setAlignItems("flex-start")} />
      <Btn value="字中間" fun={() => setAlignItems("center")} />
      <Btn value="清空" fun={() => setText("")} color="error" />
      <br />
      快速增加文字：
      <Btn
        value="「廖本源0915277990」"
        fun={() => setText((pre) => pre + "\n廖本源 0915277990")}
      />
      <hr />
      <TextField
        label="這份檔名"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Btn
        value="存檔"
        fun={() => {
          setHistory((pre) => [{ title, text, fontSize, alignItems }, ...pre]);
          localStorage.setItem(
            "history",
            JSON.stringify([{ title, text, fontSize, alignItems }, ...history])
          );
          setTitle("");
        }}
      />
      {history.map((n) => (
        <Alert key={n.title}>
          <Btn
            value={n.title}
            fun={() => {
              setText(n.text);
              setFontSize(n.fontSize);
              setAlignItems(n.alignItems);
            }}
          />
          <Btn
            value="刪除"
            fun={() =>
              setHistory((pre) => pre.filter((m) => m.title !== n.title))
            }
          />
        </Alert>
      ))}
    </Container>
  );
}

export default App;
