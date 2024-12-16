import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import Layout from "./components/Layout.tsx";
import Edit from "./pages/Edit.tsx";
import { TodosProvider } from "./context.tsx";

function App() {
  return (
    <TodosProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodosProvider>
  );
}

export default App;
