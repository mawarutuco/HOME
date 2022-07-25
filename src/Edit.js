import "./App.css";
import { Container, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Btn from "./component/Button";
import Show from "./component/Show";
import { v4 as uuidv4 } from "uuid";

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
      <Btn value="列印" doClick={() => printThis()} color="success" />
      <Btn
        value="翻譯越南文"
        doClick={() => googleTranslate()}
        color="success"
      />
      <Btn
        value="貼上"
        doClick={() => {
          // const tmp = window.clipboardData.getData("Text");
          // navigator.clipboard.readText().then((text) => {
          //   alert(text);
          // })
          // setText(tmp);
        }}
      />
      <Btn
        value="字放大"
        doClick={() => setFontSize((pre) => Number(pre) + 5)}
      />
      <Btn
        value="字縮小"
        doClick={() => setFontSize((pre) => Number(pre) - 5)}
      />
      <Btn value="字靠左" doClick={() => setAlignItems("flex-start")} />
      <Btn value="字中間" doClick={() => setAlignItems("center")} />
      <Btn value="清空" doClick={() => setText("")} color="error" />
      <br />
      快速增加文字：
      <Btn
        value="「廖本源0915277990」"
        doClick={() => setText((pre) => pre + "\n廖本源 0915277990")}
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
        doClick={() => {
          const nowID = uuidv4();
          setHistory((pre) => [
            { id: nowID, title, text, fontSize, alignItems },
            ...pre,
          ]);
          localStorage.setItem(
            "history",
            JSON.stringify([
              { id: nowID, title, text, fontSize, alignItems },
              ...history,
            ])
          );
          setTitle("");
        }}
      />
      {history.map((n) => (
        <Alert key={n.id}>
          <Btn
            value={n.title}
            doClick={() => {
              setText(n.text);
              setFontSize(n.fontSize);
              setAlignItems(n.alignItems);
            }}
          />
          <Btn
            value="刪除"
            doClick={() =>
              setHistory((pre) => pre.filter((m) => m.id !== n.id))
            }
            color="error"
          />
        </Alert>
      ))}
    </Container>
  );
}

export default App;
