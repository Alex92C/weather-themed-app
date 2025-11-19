import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/home/Home";
import "./styles/_utilities.scss";

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;
