import instance from "./instance";

//const token = localStorage.getItem("token");
// for the token..
export function setTokenHeader(token) {
  if (token !== undefined) {
    instance.defaults.headers.common["token"] = token;
  }
}

export function login(data) {
  const url = "/auth";
  return instance.post(url, data).then((response) => response.data);
}
export function createUser(data) {
  const url = "/createUser";
  return instance.post(url, data).then((response) => response.data);
}
//gets all postions
export function getTeams() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/team";
  return instance.get(url).then((response) => response.data);
}
export function getModules() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getModules";
  return instance.get(url).then((response) => response.data);
}
//gets all customer
export function getClients(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/customerlist";
  return instance.post(url, data).then((response) => response.data);
}
//gets all customer
export function getOrders(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getOrders";
  return instance.post(url, data).then((response) => response.data);
}
//gets all customer
export function createTeam(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/createTeam";
  return instance.post(url, data).then((response) => response.data);
}
//gets all customer
export function getTeam(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/teaminfo/" + id;
  return instance.get(url).then((response) => response.data);
}
export function deleteTeam(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/deleteTeam/" + id;
  return instance.get(url).then((response) => response.data);
}
//gets all customer
export function updateTeam(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/updateTeam";
  return instance.post(url, data).then((response) => response.data);
}
export function deleteUserFromTeam(employeeId) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/deleteUserFromTeam/" + employeeId;
  return instance.post(url).then((response) => response.data);
}
//gets all customer
export function getUsers() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/User";
  return instance.get(url).then((response) => response.data);
}
//gets all customer
export function getUser(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/userinfo/" + id;
  return instance.get(url).then((response) => response.data);
}
//gets all customer
export function attestTimeStamp(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/attestTimeStamp/" + id;
  return instance.post(url).then((response) => response.data);
}

export function deleteUser(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/deleteUser/" + id;
  return instance.post(url).then((response) => response.data);
}

export function updateTimeStamp(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/updateTimeStamp";
  return instance.post(url, data).then((response) => response.data);
}
//gets all customer
export function updateUserInfo(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/updateUserInfo";
  return instance.post(url, data).then((response) => response.data);
}
//gets all customer
export function updateClientInfo(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/updatecustumerinfo";
  return instance.post(url, data).then((response) => response.data);
}
//gets all customer
export function updateClientlocation(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/updatecustumerlocation";
  return instance.post(url, data).then((response) => response.data);
}
export function updateClientNotes(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/updateClientNotes";
  return instance.post(url, data).then((response) => response.data);
}

export function getTimelogs() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/timelogs";
  return instance.post(url).then((response) => response.data);
}
export function getBook(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getBooking/" + id;
  return instance.get(url).then((response) => response.data);
}

//gets all customer
export function updateUserPassword(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/updateUserPassword";
  return instance.post(url, data).then((response) => response.data);
}
//gets all customer
export function createOrder(objectToPost) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/createOrder";
  return instance.post(url, objectToPost).then((response) => response.data);
}

//gets booking
export function getBooking(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getBookings";
  return instance.post(url, data).then((response) => response.data);
}
//gets booking
export function getBookingSelf() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getBookingsSelf";
  return instance.get(url).then((response) => response.data);
}

export function updateTimeBooking(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/updateTimeBooking";
  return instance.post(url, data).then((response) => response.data);
}
export function updateBooking(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/updateBooking";
  return instance.post(url, data).then((response) => response.data);
}
export function deleteBooking(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/deleteBooking/" + id;
  return instance.post(url).then((response) => response.data);
}
export function createClient(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/customer";
  return instance.post(url, data).then((response) => response.data);
}
export function getClientInfo(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getcustomer/" + id;
  return instance.get(url).then((response) => response.data);
}
export function logTime(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/timelog";
  return instance.post(url, data).then((response) => response.data);
}
export function getStats(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/Stats";
  return instance.post(url, data).then((response) => response.data);
}

export function addOrderNote(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/addOrderNote";
  return instance.post(url, data).then((response) => response.data);
}

export function getTravels() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getTravelslist";
  return instance.get(url).then((response) => response.data);
}
export function getWarehouses() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/GetWarehouses";
  return instance.get(url).then((response) => response.data);
}

export function createWarehouseSpace(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/createWarehouseSpace";
  return instance.post(url, data).then((response) => response.data);
}
export function getNotes(bookingid) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getOrderNotes/" + bookingid;
  return instance.post(url).then((response) => response.data);
}

export function getWarehouseInfo(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getWarehouseInfo/" + id;
  return instance.get(url).then((response) => response.data);
}

export function deleteOrder(selectedOrder) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/deleteOrder/" + selectedOrder;
  return instance.get(url).then((response) => response.data);
}
export function createWarehouse(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/createWarehouse";
  return instance.post(url, data).then((response) => response.data);
}
export function getWarehouseSpace(id, type) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getWarehouseSpace/" + id + "/" + type;
  return instance.get(url).then((response) => response.data);
}

export function logUserTimeStamp() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/logUserTimeStamp";
  return instance.get(url).then((response) => response.data);
}
export function getSpaceInfo(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getSpaceInfo/" + id;
  return instance.get(url).then((response) => response.data);
}
export function getThings() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/things";
  return instance.get(url).then((response) => response.data);
}
export function addProduct(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/addthing";
  return instance.post(url, data).then((response) => response.data);
}
export function getArticels() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/articels";
  return instance.get(url).then((response) => response.data);
}
export function addArticels(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/addArticels";
  return instance.post(url, data).then((response) => response.data);
}
export function addInspection(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/addInspection";
  return instance.post(url, data).then((response) => response.data);
}

export function editInspection(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/editInspection";
  return instance.post(url, data).then((response) => response.data);
}

export function getInspectionList(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getInspectionList";
  return instance.get(url, data).then((response) => response.data);
}
export function getInspection(Eid) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getInspection/" + Eid;
  return instance.get(url).then((response) => response.data);
}
export function saveEmployeeWorkHours(id, data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/saveWorkingHours/" + id;
  return instance.post(url, data).then((response) => response.data);
}
export function logAbsence(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/logAbsence";
  return instance.post(url, data).then((response) => response.data);
}
export function getAbsence(id) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getAbsence/" + id;
  return instance.get(url).then((response) => response.data);
}
export function getAbsenceAll(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getAbsenceAll";
  return instance.post(url, data).then((response) => response.data);
}

export function createVehicle(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/createVehicle";
  return instance.post(url, data).then((response) => response.data);
}

export function getVehicles() {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getVehicles";
  return instance.get(url).then((response) => response.data);
}
export function getVehicleInfo(regnr) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/getVehicleInfo/" + regnr;
  return instance.get(url).then((response) => response.data);
}
export function saveVehicleNote(data) {
  setTokenHeader(localStorage.getItem("token"));
  let url = "/createVehicle";
  return instance.post(url, data).then((response) => response.data);
}
