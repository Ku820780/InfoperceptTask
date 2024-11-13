import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./components/features/auth/Welcome";
import NotesList from "./components/features/notes/NotesList";
import UsersList from "./components/features/users/UsersList";
import EditUser from "./components/features/users/EditUser";
import NewUserForm from "./components/features/users/NewUserForm";
import EditNote from "./components/features/notes/EditNote";
import NewNote from "./components/features/notes/NewNote";
import Prefetch from "./components/features/auth/Prefetch";
import PersistLogin from "./components/features/auth/PersistLogin";
import { ROLES } from "./config/roles";
import RequireAuth from "./components/features/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route
             element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
