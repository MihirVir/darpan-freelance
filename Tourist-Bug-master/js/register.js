const form = document.getElementById("form");

function checkCookie() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cook = cookies[i].trim();
    if (cook.startsWith("auth=")) {
      return true;
    }
    return false;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const pswd = document.getElementById("password");
    const btn = document.getElementById("submit-btn");
    const title = document.getElementById("form-title");
    const loader = document.getElementById("loader");
    const user = username.value;
    const pass = pswd.value;
    const userData = { username: user, password: pass, email: email.value };
    username.classList.add("loading");
    pswd.classList.add("loading");
    title.classList.add("loading");
    btn.classList.add("loading");
    email.classList.add("loading");
    loader.classList.add("active");
    // set time out to spin the login animation
    setTimeout(() => {
      const res = fetch(`http://localhost:8000/api/v1/auth/register`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          console.log(response);
          if (response.status === 400 || response.status === 404) {
            username.classList.remove("loading");
            pswd.classList.remove("loading");
            title.classList.remove("loading");
            btn.classList.remove("loading");
            email.classList.remove("loading");
            loader.classList.remove("active");
          } else {
            window.location.href =
              "http://127.0.0.1:5500/Tourist-Bug-master/html/login.html";
          }
        })
        .catch((err) => {
          console.log(err);
          username.classList.remove("loading");
          pswd.classList.remove("loading");
          title.classList.remove("loading");
          btn.classList.remove("loading");
          loader.classList.remove("active");
        });
    }, 500);
  } catch (err) {
    console.log(err);
  }
});
