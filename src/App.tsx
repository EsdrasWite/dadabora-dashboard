import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found/NoteFound";
import Dashboard from "./pages/dashboard/Dashboard";

const HomeLayout = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        {/* <SideBar /> */}
        {/* <main id="main" className="main dashboard"> */}
        <Outlet />
        {/* </main> */}
        {/* <Footer />
      <BackToTop /> */}
      </div>
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Dashboard /> },

        {
          path: "/login",
          element: <h1>Login</h1>,
        },
        {
          path: "/aide",
          element: <h1>Aide</h1>,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
