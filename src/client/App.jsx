import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home, { loader as homeLoader } from "./pages/Home/Home";
import DashLayout from "./pages/layout/DashLayout";
import Analytics from "./pages/AnalyticsPage/Analytics.jsx";

import Classes, {
  loader as classLoader,
  action as classAction,
} from "./pages/Classes/Classes";
import Teachers, {
  loader as teacherLoader,
  action as teacherAction,
} from "./pages/Teachers/Teachers";
import Students, {
  loader as studentLoader,
  action as studentAction,
} from "./pages/Students/Students";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<DashLayout />}>
        <Route loader={homeLoader} index element={<Home />} />
        <Route
          path='/classes'
          action={classAction}
          loader={classLoader}
          element={<Classes />}
        />
        <Route
          path='/classes/:classId'
          element={<h1>class details not added yet</h1>}
        />
        <Route
          path='/teachers'
          loader={teacherLoader}
          action={teacherAction}
          element={<Teachers />}
        />
        <Route
          loader={studentLoader}
          action={studentAction}
          path='/students'
          element={<Students />}
        />
        <Route path='/analytics' element={<Analytics />} />
      </Route>
    </Route>
  )
);
function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

