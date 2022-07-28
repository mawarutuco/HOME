import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Show from "./component/Show";
import Btn from "./component/Button";

const Print = ({ text, fontSize, alignItems }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  let firstTime = useRef(true);
  useEffect(() => {
    if (firstTime.current) {
      window.print();
      setShow(true);
    }
    firstTime.current = false;
  }, []);

  return (
    <>
      {show && (
        <Btn
          value="回去打字"
          doClick={() => {
            navigate("/");
          }}
        />
      )}
      <Show text={text} fontSize={fontSize} alignItems={alignItems} />
    </>
  );
};

export default Print;
