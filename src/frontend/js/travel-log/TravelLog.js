import { getData, deleteData } from "../api.js";

async function loadTravelLogData(value) {
  const data = await getData(`http://127.0.0.1:5000/api/travel-log?country=${value}`);
  console.log(data);
  const travelLogCards = document.getElementById("travel-log-cards");
  travelLogCards.innerHTML = "";
  data.forEach((travelLog) => {
    const card = createCard(travelLog);
    travelLogCards.appendChild(card);
  });
}

function createCard(travelLogItem) {
  const url = `http://127.0.0.1:5000/api/travel-log/${travelLogItem.id}`;

  const card = document.createElement("div");
  card.classList.add("card");

  const header = document.createElement("div");
  header.classList.add("header");

  const editLink = document.createElement("a");
  editLink.href = `../../pages/travel-log/EditTravelLog.html?id=${travelLogItem.id}`;
  editLink.innerHTML = '<img src="../../../../img/Icon.svg" alt="Edit Icon">';

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML =
    '<img src="../../../../img/Vector.svg" alt="Delete Icon">';
  deleteButton.addEventListener("click", () => {
    deleteData(url);
    window.location.reload();
  });

  header.appendChild(editLink);
  header.appendChild(deleteButton);
  card.appendChild(header);

  const image = document.createElement("img");
  image.src = travelLogItem.ImagePath;
  image.alt = travelLogItem.NamaTempatWisata;
  card.appendChild(image);

  const title = document.createElement("h1");
  title.textContent = travelLogItem.NamaTempatWisata;
  card.appendChild(title);

  const cityCountry = document.createElement("h2");
  cityCountry.textContent = `${travelLogItem.NamaKota}, ${travelLogItem.NamaNegara}`;
  card.appendChild(cityCountry);

  const rawDate = travelLogItem.Tanggal;
  const date = new Date(rawDate);
  const formattedDate = formatDateToDDMMYYYY(date);
  
  const dateElement = document.createElement("p");
  dateElement.textContent = formattedDate;
  card.appendChild(dateElement);

  const notes = document.createElement("p");
  notes.textContent =
    travelLogItem.DeskripsiUser.split(" ").length > 10
      ? travelLogItem.DeskripsiUser.split(" ").slice(0, 10).join(" ") + "..."
      : travelLogItem.DeskripsiUser;
  card.appendChild(notes);

  const buttonLink = document.createElement("a");
  buttonLink.href = `../../pages/travel-log/DetailTravelLog.html?id=${travelLogItem.id}`;
  const seeDetailButton = document.createElement("button");
  seeDetailButton.classList.add("see-detail-button");
  seeDetailButton.textContent = "See Detail";
  buttonLink.appendChild(seeDetailButton);
  card.appendChild(buttonLink);

  return card;
}

function formatDateToDDMMYYYY(date) {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const destinationDropdown = document.getElementById("destination");
  const dataTempatWisata = await getData(
    "http://127.0.0.1:5000/api/tempat-wisata/negara"
  );


  dataTempatWisata.forEach((tempat) => {
    const option = document.createElement("option");
    option.value = tempat;
    option.textContent = `${tempat}`;
    destinationDropdown.appendChild(option);
  });

  destinationDropdown.addEventListener("change", () => {
    loadTravelLogData(destinationDropdown.value);
  });
})

loadTravelLogData("");