import "./App.scss";
import {
  Container,
  TextField,
  ButtonGroup,
  Drawer,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  const save = async () => {
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
  };

  const clear = () => {
    Swal.fire({
      icon: "question",
      title: "清空所有文字囉?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) setText("");
    });
  };

  const adjustFrontSize = (detail) => {
    setFontSize((pre) => Number(pre) + detail);
  };

  const repeatText = async () => {
    const { value: times } = await Swal.fire({
      title: "重複次數是?",
      input: "text",
      inputValue: "5",
      showCancelButton: true,
    });

    if (Number(times)) {
      setText((pre) => (pre + "\n").repeat(times));
    }
  };

  let today = new Date().toISOString().split("T")[0].replaceAll("-", "/");

  return (
    <Container className="home-container">
      <Stack mt={2} alignItems="flex-end">
        <ButtonGroup>
          <Btn value="存檔" color="success" doClick={save} />
          <Btn value="打開之前存檔的" color="success" doClick={toggleDrawer} />
          <Btn value="清空" doClick={clear} color="error" />
        </ButtonGroup>
      </Stack>
      <Stack spacing={2}>
        <TextField
          label="輸入文字"
          variant="outlined"
          fullWidth
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <ButtonGroup>
          <Btn value="翻譯越南文" doClick={googleTranslate} color="success" />
          {/* 記得點這個<img src="/copy.png"/> */}
          <Btn
            value="貼上剛複製的文字"
            doClick={() => {
              setTimeout(async () => {
                let clipText = await window.navigator.clipboard.readText();
                setText(clipText);
              }, 0);
            }}
          />
        </ButtonGroup>
        <Drawer open={drawerShow} onClose={toggleDrawer}>
          <Container>
            <Stack direction="column">
              <Btn value="關閉" doClick={toggleDrawer} color="error" />
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
            </Stack>
          </Container>
        </Drawer>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3>列印會用到的工具 (點了可以展開)</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={4}>
              <Stack justifyContent="center">
                <Btn
                  value="列印"
                  doClick={printThis}
                  color="success"
                  variant="contained"
                />
              </Stack>
              <h1>預覽畫面：</h1>
              <Show text={text} fontSize={fontSize} alignItems={alignItems} />

              <Stack direction="row" spacing={2} justifyContent="center">
                <ButtonGroup orientation="vertical">
                  <div>調整文字</div>
                  <Btn
                    value="放大"
                    doClick={() => adjustFrontSize(5)}
                    color="warning"
                  />
                  <Btn
                    value="縮小"
                    doClick={() => adjustFrontSize(-5)}
                    color="warning"
                  />
                  <Btn
                    value="靠左"
                    doClick={() => setAlignItems("flex-start")}
                    color="secondary"
                  />
                  <Btn
                    value="中間"
                    doClick={() => setAlignItems("center")}
                    color="secondary"
                  />
                </ButtonGroup>

                <ButtonGroup orientation="vertical">
                  <div>快速增加文字</div>
                  <Btn
                    value="「廖本源0915277990」"
                    doClick={() =>
                      setText((pre) => pre + "\n廖本源 0915277990")
                    }
                    color="secondary"
                  />
                  <Btn
                    value="逗號"
                    doClick={() => setText((pre) => pre + "，")}
                    color="secondary"
                  />
                  <Btn
                    value="句號"
                    doClick={() => setText((pre) => pre + "。")}
                    color="secondary"
                  />
                  <Btn
                    value="重複目前所有文字"
                    doClick={repeatText}
                    color="warning"
                  />
                  <Btn
                    value="今天日期"
                    doClick={() => {
                      setText((pre) => `${pre} ${today}`);
                    }}
                    color="warning"
                  />
                </ButtonGroup>
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Container>
  );
}

export default App;
