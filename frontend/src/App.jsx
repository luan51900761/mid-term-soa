import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Content from "./pages/Content";
import PaymentHistory from "./pages/PaymentHistory";
import RootLayout from "./components/RootLayout";
import { useSelector } from "react-redux";
import { selectUser } from "./store/user/userSelect";
import { useEffect } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Content />} />
        <Route path="/lich-su-thanh-toan" element={<PaymentHistory />} />
      </Route>
      <Route
        path="/login"
        element={<Login />}
        // errorElement={<p>An error occurred</p>}
      />
    </>
  )
);

function App() {
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!user) {
      router.navigate("/login");
    } else {
      router.navigate("/");
    }
  }, [user]);
  return <RouterProvider router={router} />;
}

export default App;
