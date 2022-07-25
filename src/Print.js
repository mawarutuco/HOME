import { useNavigate } from "react-router-dom";
import { useState, useEffect,useMemo } from "react";
import Show from "./component/Show";
import Btn from "./component/Button";

const Print = ({ text, fontSize, alignItems }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.print();
    setShow(true);
  }, []);

  // useMemo(() => {
  //   window.print();
  //   setShow(true);
  // }, [window.print()]);

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
