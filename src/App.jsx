import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Content from "./pages/Content";
import RootLayout from "./components/RootLayout";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Content />} />
      </Route>
      <Route
        path="/login"
        element={<Login />}
        errorElement={<p>An error occurred</p>}
      />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
