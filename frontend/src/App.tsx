import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:4001/name");
      console.log(response.data);
      setUserName(response.data);
    })();
  }, []);

  return <>{userName === "" ? <>Carregando Nome...</> : <>{userName}</>}</>;
}

export default App;
