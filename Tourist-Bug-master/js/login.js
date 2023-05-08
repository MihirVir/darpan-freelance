const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const username = document.getElementById("username");
    const pswd = document.getElementById("password");
    const btn = document.getElementById("submit-btn");
    const title = document.getElementById("form-title");
    const loader = document.getElementById("loader");
    const user = username.value;
    const pass = pswd.value;
    const userData = { username: user, password: pass };
    username.classList.add("loading");
    pswd.classList.add("loading");
    title.classList.add("loading");
    btn.classList.add("loading");
    loader.classList.add("active");
    // set time out to spin the login animation
    setTimeout(() => {
      const res = fetch(`http://localhost:8000/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data === undefined || data === null) {
            username.classList.remove("loading");
            pswd.classList.remove("loading");
            title.classList.remove("loading");
            btn.classList.remove("loading");
            loader.classList.remove("active");
          } else {
            localStorage.setItem("token", JSON.stringify(data.token));

            window.location.href =
              "http://127.0.0.1:5500/Tourist-Bug-master/html/index1.html";
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
