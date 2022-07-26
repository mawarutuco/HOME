import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Edit from "./Edit";
import Print from "./Print";

const App = () => {
  const [text, setText] = useState(localStorage.getItem("text") || "");
  const [alignItems, setAlignItems] = useState(
    localStorage.getItem("alignItems") || "center"
  );
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize") || 60
  );

  useEffect(() => {
    localStorage.setItem("text", text);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("alignItems", alignItems);
  }, [text, fontSize, alignItems]);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Edit
              text={text}
              setText={setText}
              fontSize={fontSize}
              setFontSize={setFontSize}
              alignItems={alignItems}
              setAlignItems={setAlignItems}
            />
          }
        />
        <Route
          path="/print"
          element={<Print text={text} fontSize={fontSize} alignItems={alignItems}/>}
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
