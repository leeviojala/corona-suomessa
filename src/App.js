import React from "react";
import "./App.css";
import MainContainer from "./components/MainContainer";
import { ThemeProvider } from "@material-ui/core";
import { CssBaseline, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <MainContainer></MainContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
