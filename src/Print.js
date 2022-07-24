import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Show from "./component/Show";
import Btn from "./component/Button";

const Print = ({ text, fontSize, alignItems }) => {
  const navigate = useNavigate();
  const [notShow, setShow] = useState(false);

  //   const textArr = text.split("\n");
  //   setTimeout(() => {
  //     window.print();
  //   }, 10);
  useEffect(() => {
    setShow(true);
    window.print();
    setShow(false);
  }, []);

  return (
    <>
      <Show text={text} fontSize={fontSize} alignItems={alignItems} />
      <Btn
        value="回去編輯"
        fun={() => {
          navigate("/");
        }}
        style={{ display: notShow && "hide" }}
      />
    </>
  );
};

export default Print;
