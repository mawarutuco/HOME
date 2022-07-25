import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Show from "./component/Show";
import Btn from "./component/Button";

const Print = ({ text, fontSize, alignItems }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  let firstTime = true;
  useEffect(() => {
    if (firstTime) {
      window.print();
      setShow(true);
      firstTime = false;
    }
  }, []);

  return (
    <>
      {show && (
        <Btn
          value="回去打字"
          doClick={() => {
            navigate("/HOME");
          }}
        />
      )}
      <Show text={text} fontSize={fontSize} alignItems={alignItems} />
    </>
  );
};

export default Print;
