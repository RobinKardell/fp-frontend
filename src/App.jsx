import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Home from "./views/home";
import Login from "./views/login";
import Missing from "./views/missing";
import Unauthorized from "./views/unauthorized";
import DashboardLayout from "./components/dashboardLayout";
import Employees from "./views/employees";
import Teams from "./views/teams";
import Employee from "./views/employee";
import Team from "./views/team";
import Orders from "./views/orders";
import Customers from "./views/customers";
import Customer from "./views/customer";
import Order from "./views/order";
import Scheduler from "./views/scheduler";
import Schedule from "./views/schedule";
import TimeReport from "./views/timereport"
import TimeStamp from "./views/timeStamp";
import DriveJournal from "./views/drivejournal";
import { Roles } from "./components/roles";
import Warehouses from "./views/warehouses";
import Products from "./views/products";
import Map from "./views/map";
import Warehouse from "./views/warehouse";
import Scheduler3 from "./views/scheduler3";
import NewOrder from "./views/newOrder";
import Settings from "./views/settings";
import Stats from "./views/stats";
import Inspections from "./views/inspections";
import Vehicles from "./views/vehicles";
import Vehicle from "./views/vehicle";
import Pdfv from "./views/pdf";

//ROLES
const ROLES = Roles;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />


        {/* Protected Routes
        <Route element={<PersistLogin />}> */}
        {/* Protected either Admin or Employee */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Employee, ROLES.Admin, ROLES.Leader]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/warehouses/:id" element={<Warehouse />} />
            <Route path="/products" element={<Products />} />
            <Route path="/drive" element={<DriveJournal />} />
            <Route path="/map" element={<Map />} />
            <Route path="/pdf" element={<Pdfv />} />

            {/* Protected Admin Routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Leader, ROLES.Admin]} />}>
              <Route path="/scheduler" element={<Scheduler />} />
              <Route path="/scheduler3" element={<Scheduler3 />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<Order />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:id" element={<Customer />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/teams/:id" element={<Team />} />
              <Route path="/timereports" element={<TimeReport />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/timereport/:id" element={<TimeStamp />} />
              <Route path="/settings" element={<Settings />} />
            <Route path="/inspections" element={<Inspections />} />
              <Route path="/orders/new" element={<NewOrder />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicle/:regnr" element={<Vehicle />} />
            </Route>
            

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/:id" element={<Employee />} />
            </Route>

            {/* Protected Employee Routes */}

          </Route>
        </Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Employee, ROLES.Admin, ROLES.Leader]} />}>
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Missing />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
