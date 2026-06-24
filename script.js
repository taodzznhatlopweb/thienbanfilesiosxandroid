let users = JSON.parse(localStorage.getItem("users")) || [];
let services = JSON.parse(localStorage.getItem("services")) || [];

const adminUser = "admin1";
const adminPass = "thienproso1";

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function saveServices() {
    localStorage.setItem("services", JSON.stringify(services));
}

function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}

function register() {

    let u = document.getElementById("regUser").value.trim();
    let p = document.getElementById("regPass").value.trim();

    if (!u || !p) {
        alert("Nhập đầy đủ thông tin");
        return;
    }

    if (users.find(x => x.username === u)) {
        alert("Tài khoản đã tồn tại");
        return;
    }

    users.push({
        username: u,
        password: p,
        balance: 0,
        purchased: []
    });

    saveUsers();

    alert("Đăng ký thành công");

    localStorage.setItem("currentUser", u);

    openDashboard();
}

function login() {

    let u = document.getElementById("loginUser").value.trim();
    let p = document.getElementById("loginPass").value.trim();

    if (u === adminUser && p === adminPass) {
        localStorage.setItem("currentUser", u);
        openDashboard();
        return;
    }

    let user = users.find(
        x => x.username === u && x.password === p
    );

    if (user) {

        localStorage.setItem("currentUser", u);

        openDashboard();

    } else {

        alert("Sai tài khoản hoặc mật khẩu");

    }
}

function openDashboard() {

    document.getElementById("authPage").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    let currentUser = localStorage.getItem("currentUser");

    if (currentUser === adminUser) {

        document.getElementById("adminPanel").style.display = "block";

    }

    renderServices();

updateStats();

if (typeof updateAccountInfo === "function") {
    updateAccountInfo();
}
}

function addService() {

    services.push({
        name: document.getElementById("serviceName").value,
        price: document.getElementById("servicePrice").value,
        link: document.getElementById("serviceLink").value,
        desc: document.getElementById("serviceDesc").value
    });

    saveServices();

    renderServices();

    updateStats();

    alert("Đã thêm dịch vụ");
}

function renderServices() {

    let html = "";
    let currentUser = localStorage.getItem("currentUser");

    services.forEach((s,index)=>{

        html += `
        <div class="service">
            <h3>${s.name}</h3>
            <p>${s.desc || ""}</p>
            <p>Giá: ${s.price}</p>

            <button onclick="buy(${index})">
                Mua
            </button>
        `;

        if(currentUser === adminUser){

            html += `
            <button onclick="editService(${index})">
                Sửa
            </button>

            <button onclick="deleteService(${index})">
                Xóa
            </button>
            `;
        }

        html += `
        </div>
        `;
    });

    document.getElementById("serviceList").innerHTML = html;
}

function buy(index) {

    let currentUser =
        localStorage.getItem("currentUser");

    if (currentUser === adminUser) {
        alert("Admin không thể mua");
        return;
    }

    let user =
        users.find(
            x => x.username === currentUser
        );

    if (!user) return;

    let service = services[index];
if(!confirm(
    "Bạn có chắc muốn mua " +
    service.name +
    " không?"
)){
    return;
}
    let price = parseInt(
        String(service.price).replace(/\./g,"")
    ) || 0;

    if(user.balance < price){

        alert(
            "Số dư không đủ để mua dịch vụ này"
        );

        return;
    }

    user.balance -= price;

    user.purchased.push(service);

    saveUsers();

    alert(
        "Mua thành công! Vào phần đã mua để xem chi tiết"
    );

    if(typeof updateAccountInfo === "function"){
        updateAccountInfo();
    }
}

function showPurchased() {

    let currentUser =
        localStorage.getItem("currentUser");

    let user =
        users.find(
            x => x.username === currentUser
        );

    if (!user) {
        alert("Chưa có đơn hàng");
        return;
    }

    let txt = "";

    user.purchased.forEach(item => {

        txt +=
            "Tên: " + item.name + "\n" +
            "Mô tả: " + item.desc + "\n" +
            "Link: " + item.link + "\n\n";
    });

    if (txt === "") {
        txt = "Chưa có đơn hàng";
    }

    alert(txt);
}

function changePassword() {

    let currentUser =
        localStorage.getItem("currentUser");

    let user =
        users.find(
            x => x.username === currentUser
        );

    if (!user) return;

    let newPass =
        prompt("Nhập mật khẩu mới");

    if (!newPass) return;

    user.password = newPass;

    saveUsers();

    alert("Đổi mật khẩu thành công");
}

function toggleMenu() {

    let menu =
        document.getElementById("menu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function closeWelcomePopup() {

    let popup =
        document.getElementById("welcomePopup");

    if (popup) {
        popup.style.display = "none";
    }
}

function logout() {

    localStorage.removeItem("currentUser");

    location.reload();
}
function deleteService(index){

    if(confirm("Xóa dịch vụ này?")){

        services.splice(index,1);

        saveServices();

        renderServices();

updateStats();
    }
}

function editService(index){

    let s = services[index];

    let newName = prompt("Tên dịch vụ", s.name);
    if(newName === null) return;

    let newPrice = prompt("Giá", s.price);
    if(newPrice === null) return;

    let newDesc = prompt("Mô tả", s.desc);
    if(newDesc === null) return;

    let newLink = prompt("Link", s.link);
    if(newLink === null) return;

    s.name = newName;
    s.price = newPrice;
    s.desc = newDesc;
    s.link = newLink;

    saveServices();

renderServices();

updateStats();

    alert("Đã cập nhật");
} 
function giftMoneyToUser(){

    let username =
        document.getElementById("giftUser").value.trim();

    let money =
        document.getElementById("giftMoney").value.trim();

    if(!/^[0-9.]+$/.test(money)){
        alert("Chỉ được nhập số và dấu chấm");
        return;
    }

    let amount =
        parseInt(money.replace(/\./g,""));

    let user =
        users.find(
            x => x.username === username
        );

    if(!user){
        alert("Không tìm thấy tài khoản");
        return;
    }

    user.balance += amount;

    saveUsers();

    alert(
        "Đã tặng " +
        amount.toLocaleString("vi-VN") +
        " VND cho " +
        username
    );

    document.getElementById("giftUser").value = "";
    document.getElementById("giftMoney").value = "";
}
function updateAccountInfo(){

    let currentUser =
        localStorage.getItem("currentUser");

    document.getElementById("accountName").innerText =
        "Tài khoản: " + currentUser;

    let user =
        users.find(
            x => x.username === currentUser
        );

    if(user){

        document.getElementById("accountMoney").innerText =
            "Số dư: " +
            user.balance.toLocaleString("vi-VN") +
            " VND";

    }else{

        document.getElementById("accountMoney").innerText =
            "Số dư: ADMIN";
    }
}
function updateStats(){

    let userBox =
        document.getElementById("totalUsers");

    let serviceBox =
        document.getElementById("totalServices");

    if(userBox){
        userBox.innerText = users.length;
    }

    if(serviceBox){
        serviceBox.innerText = services.length;
    }
}
window.onload = () => {

    if (localStorage.getItem("currentUser")) {

        openDashboard();

    }
};
function showUsers(){

    let txt = "";

    users.forEach(user => {

        txt +=
            "User: " + user.username +
            "\nSố dư: " +
            user.balance.toLocaleString("vi-VN") +
            " VND\n\n";
    });

    if(txt === ""){
        txt = "Chưa có user nào";
    }

    alert(txt);
}
function banUser(){

    let username =
        prompt("Nhập tên user cần ban");

    if(!username) return;

    if(username === adminUser){

        alert("Không thể ban admin");

        return;
    }

    let index =
        users.findIndex(
            x => x.username === username
        );

    if(index === -1){

        alert("Không tìm thấy user");

        return;
    }

    if(confirm(
        "Xóa user " + username + " ?"
    )){

        users.splice(index,1);

        saveUsers();

        updateStats();

        alert("Đã ban user");
    }
}