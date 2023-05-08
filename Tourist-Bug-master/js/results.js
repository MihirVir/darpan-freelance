const urlParams = new URLSearchParams(window.location.search);
const wrapper = document.getElementById("wrapper");
const homeBtn = document.getElementById("home-btn");
window.onload = function () {
  const loca = urlParams.get("location");
  const days = urlParams.get("days");

  // fetch data from the api
  fetch(`http://localhost:8000/api/v1/hotel/${loca}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.hotels);
      data.hotels.forEach((item) => {
        console.log(item);
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("results-card");
        const imgContainer = document.createElement("img");
        imgContainer.src = `http://localhost:8000/images/${item.filename[0]}`;
        imgContainer.classList.add("img-cover");
        const divContainer = document.createElement("div");
        divContainer.classList.add("container");
        const nameContainer = document.createElement("p");
        nameContainer.textContent = item.name;
        const addressContainer = document.createElement("p");
        addressContainer.classList.add("address");
        addressContainer.textContent = item.address.substring(0, 30);
        const cityContainer = document.createElement("p");
        cityContainer.textContent = item.city;
        const awayContainer = document.createElement("p");
        awayContainer.textContent = `${item.away} from the city center`;
        const priceContainer = document.createElement("span");
        priceContainer.classList.add("price");
        priceContainer.textContent = `$${item.price * parseInt(days)}`;
        wrapper.appendChild(cardContainer);
        cardContainer.appendChild(imgContainer);
        cardContainer.appendChild(divContainer);
        divContainer.appendChild(nameContainer);
        divContainer.appendChild(addressContainer);
        divContainer.appendChild(cityContainer);
        divContainer.appendChild(awayContainer);
        cardContainer.appendChild(priceContainer);
      });
    })
    .catch((err) => console.log(err));
};

homeBtn.addEventListener("click", () => {
  window.location.href =
    "http://127.0.0.1:5500/Tourist-Bug-master/html/index1.html";
});
