import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Show from "./component/Show";
import Btn from "./component/Button";

const Print = ({ text, fontSize, alignItems }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.print();
    setShow(true);
  }, []);

  return (
    <>
      {show && (
        <Btn
          value="回去打字"
          fun={() => {
            navigate('/');
          }}
        />
      )}
      <Show text={text} fontSize={fontSize} alignItems={alignItems} />
    </>
  );
};

export default Print;
