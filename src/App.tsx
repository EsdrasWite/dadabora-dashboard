import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found/NoteFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import Conversation from "./pages/conversations/Conversations";
import Monitoring from "./pages/monitoring/Monitoring";
import Setting from "./pages/setting/Setting";
import SingleUser from "./pages/singleUser/SingleUser";
import KnowledgeBase from "./pages/knowledgeBase/KnowledgeBase";

const HomeLayout = () => {
  return (
    // <div className="flex h-screen bg-gray-50">
    <Outlet />
    // </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/users", element: <Users /> },
        { path: "/conversations", element: <Conversation /> },
        { path: "/users/:id", element: <SingleUser /> },
        { path: "/monitoring", element: <Monitoring /> },
        { path: "/knowledgebase", element: <KnowledgeBase /> },

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
