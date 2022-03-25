import Page1 from "./components/Page1"
import Page2 from "./components/Page2"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page3 from "./components/Page3"
import Page4 from "./components/Page4"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/1" element={<Page1 />} />
        <Route path="/2" element={<Page2 />} />
        <Route path="/3" element={<Page3 />} />
        <Route path="/4" element={<Page4 />} />
        <Route path="/*" element={<Page1 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
