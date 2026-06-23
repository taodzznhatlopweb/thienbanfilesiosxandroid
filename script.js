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

    alert("Đã đăng ký tài khoản thành công");

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
}username:u,
password:p,
purchased:[]
});

saveUsers();

alert("Đã đăng ký tài khoản thành công");

localStorage.setItem("currentUser",u);

openDashboard();
}

function login(){

let u=document.getElementById("loginUser").value;
let p=document.getElementById("loginPass").value;

if(u===adminUser && p===adminPass){

localStorage.setItem("currentUser",u);

openDashboard();

return;
}

let user=users.find(
x=>x.username===u && x.password===p
);

if(user){

localStorage.setItem("currentUser",u);

openDashboard();

}else{
alert("Sai tài khoản hoặc mật khẩu");
}

}

function openDashboard(){

document.getElementById("authPage").style.display="none";
document.getElementById("dashboard").style.display="block";

let currentUser=localStorage.getItem("currentUser");

if(currentUser===adminUser){

document.getElementById("adminPanel").style.display="block";

}

renderServices();
}

function addService(){

services.push({
name:document.getElementById("serviceName").value,
price:document.getElementById("servicePrice").value,
link:document.getElementById("serviceLink").value,
desc:document.getElementById("serviceDesc").value
});

saveServices();

renderServices();

alert("Đã thêm dịch vụ");
}

function renderServices(){

let html="";

services.forEach((s,index)=>{

html+=`
<div class="service">

<h3>${s.name}</h3>

<p>${s.desc}</p>

<p>Giá: ${s.price} VNĐ</p>

<button onclick="buy(${index})">
Mua
</button>

</div>
`;

});

document.getElementById("serviceList").innerHTML=html;
}

function buy(index){

let currentUser=localStorage.getItem("currentUser");

if(currentUser===adminUser){
return;
}

let user=users.find(x=>x.username===currentUser);

user.purchased.push(services[index]);

saveUsers();

alert("Vào phần đã mua để xem chi tiết");
}

function showPurchased(){

let currentUser=localStorage.getItem("currentUser");

if(currentUser===adminUser){

alert("Admin không có đơn hàng");

return;
}

let user=users.find(
x=>x.username===currentUser
);

let txt="";

user.purchased.forEach(item=>{

txt+=`
Tên: ${item.name}

Mô tả: ${item.desc}

Link: ${item.link}

--------------------
`;

});

if(txt===""){
txt="Chưa có đơn hàng";
}

alert(txt);
}

function showAccount(){

let currentUser=localStorage.getItem("currentUser");

let newPass=prompt("Nhập mật khẩu mới:");

if(!newPass) return;

let user=users.find(
x=>x.username===currentUser
);

if(user){

user.password=newPass;

saveUsers();

alert("Đổi mật khẩu thành công");
}
}

function toggleMenu(){

let menu=document.getElementById("menu");

if(menu.style.display==="block"){
menu.style.display="none";
}else{
menu.style.display="block";
}
}

function logout(){

localStorage.removeItem("currentUser");

location.reload();
}

window.onload=()=>{

if(localStorage.getItem("currentUser")){

openDashboard();

}
}
function openDashboard() {

    document.getElementById("authPage").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    let currentUser = localStorage.getItem("currentUser");

    if (currentUser === adminUser) {

        document.getElementById("adminPanel").style.display = "block";

    }

    updateAccountInfo();

    renderServices();

    let popup = document.getElementById("welcomePopup");

    if (popup) {
        popup.style.display = "flex";
    }
}

function updateAccountInfo() {

    let currentUser = localStorage.getItem("currentUser");

    let nameBox = document.getElementById("accountName");
    let moneyBox = document.getElementById("accountMoney");

    if (!nameBox || !moneyBox) return;

    if (currentUser === adminUser) {

        nameBox.innerText = "Tài khoản: ADMIN";

        moneyBox.innerText = "Số dư: Không giới hạn";

        return;
    }

    let user = users.find(
        x => x.username === currentUser
    );

    if (!user) return;

    nameBox.innerText =
        "Tài khoản: " + user.username;

    moneyBox.innerText =
        "Số dư: " +
        user.balance.toLocaleString("vi-VN") +
        " VND";
}

function closeWelcomePopup() {

    let popup = document.getElementById("welcomePopup");

    if (popup) {
        popup.style.display = "none";
    }
}

function addService() {

    let service = {
        name: document.getElementById("serviceName").value,
        price: document.getElementById("servicePrice").value,
        link: document.getElementById("serviceLink").value,
        desc: document.getElementById("serviceDesc").value
    };

    services.push(service);

    saveServices();

    renderServices();

    alert("Đã thêm dịch vụ");
}

function renderServices() {

    let html = "";

    services.forEach((s, index) => {

        html += `
        <div class="service">

            <h3>${s.name}</h3>

            <p>Giá: ${s.price} VND</p>

            <button onclick="buy(${index})">
                Mua
            </button>

        </div>
        `;
    });

    document.getElementById("serviceList").innerHTML = html;
}

function giftMoneyToUser() {

    let username =
        document.getElementById("giftUser").value.trim();

    let money =
        document.getElementById("giftMoney").value.trim();

    const regex =
        /^\d{1,3}(\.\d{3})*$/;

    if (!regex.test(money)) {

        alert(
            "Tiền không hợp lệ. Ví dụ: 20.000"
        );

        return;
    }

    let user =
        users.find(x => x.username === username);

    if (!user) {

        alert("Không tìm thấy user");

        return;
    }

    let amount =
        parseInt(money.replace(/\./g, ""));

    user.balance += amount;

    saveUsers();

    updateAccountInfo();

    alert("Đã cộng tiền thành công");
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

    let alreadyBought =
        user.purchased.find(
            x => x.name === service.name
        );

    if (alreadyBought) {

        alert("Bạn đã mua dịch vụ này");

        return;
    }

    user.purchased.push(service);

    saveUsers();

    alert("Vào phần đã mua để xem chi tiết");
}

function showPurchased() {

    let currentUser =
        localStorage.getItem("currentUser");

    if (currentUser === adminUser) {

        alert("Admin không có đơn hàng");

        return;
    }

    let user =
        users.find(
            x => x.username === currentUser
        );

    if (!user) return;

    if (user.purchased.length === 0) {

        alert("Chưa có đơn hàng");

        return;
    }

    let txt = "";

    user.purchased.forEach(item => {

        txt +=
            "Tên: " + item.name + "\n\n" +

            "Giá: " + item.price + "\n\n" +

            "Mô tả: " + item.desc + "\n\n" +

            "Link: " + item.link + "\n\n" +

            "--------------------------\n\n";
    });

    alert(txt);
}

function changePassword() {

    let currentUser =
        localStorage.getItem("currentUser");

    if (currentUser === adminUser) {

        alert("Không đổi mật khẩu admin");

        return;
    }

    let newPass =
        prompt("Nhập mật khẩu mới");

    if (!newPass) return;

    let user =
        users.find(
            x => x.username === currentUser
        );

    if (!user) return;

    user.password = newPass;

    saveUsers();

    alert("Đổi mật khẩu thành công");
}

function toggleMenu() {

    let menu =
        document.getElementById("menu");

    if (!menu) return;

    if (menu.style.display === "block") {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";

    }
}

function logout() {

    localStorage.removeItem("currentUser");

    location.reload();
}

window.onload = () => {

    let currentUser =
        localStorage.getItem("currentUser");

    if (currentUser) {

        openDashboard();

    }
};
