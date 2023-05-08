const searchButton = document.getElementById("search");
const hotelsDiv = document.getElementById("hotels");
const form = document.getElementById("form");
const nav = document.getElementById("nav-header");

window.onload = function () {
  if (!localStorage.getItem("token")) {
    window.location.href =
      "http://127.0.0.1:5500/Tourist-Bug-master/html/login.html";
  }
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    nav.classList.add("nav-color-changer");
  } else {
    nav.classList.remove("nav-color-changer");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.getElementById("location");
  const checkin = document.getElementById("checkin");
  const checkout = document.getElementById("checkout");
  //getting the value
  const locationVal = location.value;
  const checkinVal = checkin.value;
  const checkoutVal = checkout.value;
  // printing hte values
  console.log(`${locationVal} - ${checkinVal} - ${checkoutVal}`);
  // calculating number of days
  const startDate = checkinVal.split("-");
  const endDate = checkoutVal.split("-");
  var d = endDate[2] - startDate[2] + 1;
  var m = endDate[1] - startDate[1];
  var y = endDate[0] - startDate[0];
  if (m < 0 || y < 0 || d < 0) {
    location.value = "";
    checkin.value = "";
    checkout.value = "";
  }
  if (m > 0) {
    d = d + m * 30;
  }
  window.location.href = `http://127.0.0.1:5500/Tourist-Bug-master/html/results.html?location=${encodeURIComponent(
    locationVal
  )}&days=${encodeURIComponent(d)}`;
});
