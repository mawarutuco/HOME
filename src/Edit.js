import "./App.css";
import { Container, TextField, ButtonGroup, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
  let historyTmp = JSON.parse(localStorage.getItem("history"));
  const [history, setHistory] = useState(historyTmp || []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const printThis = () => navigate("/print");

  const [drawerShow, setDrawerShow] = useState(false);
  const toggleDrawer = () => setDrawerShow((pre) => (pre = !pre));

  const googleTranslate = () => {
    window.open(
      `https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=vi&text=${text}&op=translate`
    );
    //%0A =>\n
  };

  let today = new Date().toISOString().split("T")[0].replaceAll("-", "/");

  return (
    <Container className="App">
      <h1>預覽畫面：</h1>
      <Show text={text} fontSize={fontSize} alignItems={alignItems} />
      <br />
      <TextField
        id="textInput"
        label="輸入文字"
        variant="outlined"
        fullWidth
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ButtonGroup>
        <Btn value="列印" doClick={() => printThis()} color="success" />
        <Btn
          value="清空"
          doClick={() => {
            Swal.fire({
              icon: "question",
              title: "清空所有文字囉?",
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) setText("");
            });
          }}
          color="error"
        />
      </ButtonGroup>
      <br />
      調整：
      <ButtonGroup>
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
      </ButtonGroup>
      <br />
      翻譯：
      <ButtonGroup>
        <Btn value="翻譯越南文" doClick={() => googleTranslate()} />
        {/* 記得點這個<img src="/copy.png"/> */}
        <Btn
          value="貼上剛複製的文字"
          doClick={() => {
            setTimeout(async () => {
              let tmp = await window.navigator.clipboard.readText();
              setText(tmp);
            }, 0);
          }}
        />
      </ButtonGroup>
      <br />
      快速增加文字：
      <ButtonGroup>
        <Btn
          value="「廖本源0915277990」"
          doClick={() => setText((pre) => pre + "\n廖本源 0915277990")}
        />
        <Btn value="「，」" doClick={() => setText((pre) => pre + "，")} />
        <Btn value="「。」" doClick={() => setText((pre) => pre + "。")} />
        <Btn
          value="重複目前所有文字"
          doClick={async () => {
            const { value: times } = await Swal.fire({
              title: "重複次數是?",
              input: "text",
              inputValue: "5",
              showCancelButton: true,
            });

            if (Number(times)) {
              //要換行
              setText((pre) => (pre + "\n").repeat(times));
            }
          }}
        />
        <Btn
          value="今天日期"
          doClick={() => {
            setText((pre) => `${pre} ${today}`);
          }}
        />
      </ButtonGroup>
      <hr />
      <ButtonGroup>
        <Btn
          value="存檔"
          doClick={async () => {
            const { value: title } = await Swal.fire({
              title: "請輸入標題，沒標題不會存檔歐",
              input: "text",
              inputPlaceholder: "例如：不要亂丟垃圾、不要在這裡餵貓",
              showCancelButton: true,
            });

            if (title) {
              setHistory((pre) => [
                {
                  id: uuidv4(),
                  title,
                  text,
                  fontSize,
                  alignItems,
                  date: today,
                },
                ...pre,
              ]);
            }
          }}
        />
        <Btn value="打開之前存檔的" doClick={toggleDrawer} />
      </ButtonGroup>
      <Drawer open={drawerShow} onClose={toggleDrawer}>
        <h1>之前存檔過的</h1>
        {history.map((n) => (
          <ButtonGroup key={n.id}>
            <Btn
              value={n.title + " ->" + n.date}
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
          </ButtonGroup>
        ))}
      </Drawer>
    </Container>
  );
}

export default App;
