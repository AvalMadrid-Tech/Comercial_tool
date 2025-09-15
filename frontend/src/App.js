import { useEffect, useState } from "react";
import { getHello } from "./services/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getHello().then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
