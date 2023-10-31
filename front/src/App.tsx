import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { Layout } from "./layout";
import { UserContextProvider } from "./contexts/UserContext";
import { ModalContextProvider } from "./contexts/ModalContext";

export function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <ModalContextProvider>
        <Layout>
          <Router/>
        </Layout>
        </ModalContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  )
}

