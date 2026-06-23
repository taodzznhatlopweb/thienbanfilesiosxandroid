let users = JSON.parse(localStorage.getItem("users")) || [];

let services = JSON.parse(localStorage.getItem("services")) || [];

const adminUser = "admin1";
const adminPass = "thienproso1";

function saveUsers(){
localStorage.setItem("users",JSON.stringify(users));
}

function saveServices(){
localStorage.setItem("services",JSON.stringify(services));
}

function showRegister(){
document.getElementById("loginForm").style.display="none";
document.getElementById("registerForm").style.display="block";
}

function showLogin(){
document.getElementById("loginForm").style.display="block";
document.getElementById("registerForm").style.display="none";
}

function register(){

let u=document.getElementById("regUser").value;
let p=document.getElementById("regPass").value;

if(!u || !p){
alert("Nhập đầy đủ thông tin");
return;
}

users.push({
username:u,
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