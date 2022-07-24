import axios from "axios";
import "./App.css";
import { Container, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Btn from "./component/Button";
import Show from "./component/Show";
// import "http://www.google.com/jsapi";

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

  let strURL =
    "http://translate.google.com.tw/translate_tts?q=" + text + "&tl=ja";

  // const apiInstance = axios.create({
  //   baseURL: strURL,
  //   timeout: 9000,
  // });

  const googleTranslate=()=>{
    fetch(`http://www.google.com/jsapi`, {})
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
      })
      .catch((err) => {
        console.log("錯誤:", err);
      });
    // setText('')
  }

  return (
    <Container className="App">
      <h1>預覽畫面：</h1>
      <Show text={text} fontSize={fontSize} alignItems={alignItems} />
      <br />
      <TextField
        label="輸入文字"
        variant="outlined"
        minRows={10}
        fullWidth
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Btn value="列印" fun={() => printThis()} color="success" />
      <Btn value="翻譯越南文" fun={() => googleTranslate()} color="success" />
      <Btn value="字放大" fun={() => setFontSize((pre) => Number(pre) + 5)} />
      <Btn value="字縮小" fun={() => setFontSize((pre) => Number(pre) - 5)} />
      <Btn value="字靠左" fun={() => setAlignItems("flex-start")} />
      <Btn value="字中間" fun={() => setAlignItems("center")} />
      <Btn value="清空" fun={() => setText("")} color="error" />
      <br />
      快速增加文字：
      <Btn
        value="增加「廖本源0915277990」"
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
          setHistory((pre) => [{ title, text }, ...pre]);
          localStorage.setItem(
            "history",
            JSON.stringify([{ title, text }, ...history])
          );
          setTitle("");
        }}
      />
      {history.map((n) => (
        <Alert key={n.title}>
          <Btn value={n.title} fun={() => setText(n.text)} />
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
