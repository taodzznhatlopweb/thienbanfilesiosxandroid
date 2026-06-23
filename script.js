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

    alert("Đã thêm dịch vụ");
}

function renderServices() {

    let html = "";

    services.forEach((s, index) => {

        html += `
        <div class="service">
            <h3>${s.name}</h3>
            <p>Giá: ${s.price}</p>
            <button onclick="buy(${index})">
                Mua
            </button>
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

    user.purchased.push(services[index]);

    saveUsers();

    alert("Vào phần đã mua để xem chi tiết");
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

window.onload = () => {

    if (localStorage.getItem("currentUser")) {

        openDashboard();

    }
};
