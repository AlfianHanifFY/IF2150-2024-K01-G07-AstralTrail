// // Data travel log
// const dataTravelLog = [
//     {
//       id: 1,
//       image: "../../../../img/Sample-Image.jpg",
//       name: "Nama Tempat Wisata",
//       city: "Kota",
//       country: "Negara",
//       date: "DD/MM/YYYY",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
//     },
//     {
//       id: 1,
//       image: "../../../../img/Sample-Image.jpg",
//       name: "Nama Tempat Wisata",
//       city: "Kota",
//       country: "Negara",
//       date: "DD/MM/YYYY",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
//     },
//     {
//       id: 1,
//       image: "../../../../img/Sample-Image.jpg",
//       name: "Nama Tempat Wisata",
//       city: "Kota",
//       country: "Negara",
//       date: "DD/MM/YYYY",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
//     },
//     {
//       id: 1,
//       image: "../../../../img/Sample-Image.jpg",
//       name: "Nama Tempat Wisata",
//       city: "Kota",
//       country: "Negara",
//       date: "DD/MM/YYYY",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
//     },
//     {
//       id: 1,
//       image: "../../../../img/Sample-Image.jpg",
//       name: "Nama Tempat Wisata",
//       city: "Kota",
//       country: "Negara",
//       date: "DD/MM/YYYY",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
//     },
//   ];
  
//   function createCard(travelLog) {
//     const card = document.createElement("div");
//     card.classList.add("card");
  
//     const header = document.createElement("div");
//     header.classList.add("header");
  
//     const editLink = document.createElement("a");
//     editLink.href = `/travel-log/edit/${travelLog.id}`;
//     editLink.innerHTML = '<img src="../../../../img/Icon.svg" alt="Edit Icon">';
  
//     const deleteButton = document.createElement("button");
//     deleteButton.innerHTML = '<img src="../../../../img/Vector.svg" alt="Delete Icon">';
  
//     header.appendChild(editLink);
//     header.appendChild(deleteButton);
//     card.appendChild(header);
  
//     const image = document.createElement("img");
//     image.src = travelLog.image;
//     image.alt = travelLog.name;
//     card.appendChild(image);
  
//     const title = document.createElement("h1");
//     title.textContent = travelLog.name;
//     card.appendChild(title);
  
//     const cityCountry = document.createElement("h2");
//     cityCountry.textContent = `${travelLog.city}, ${travelLog.country}`;
//     card.appendChild(cityCountry);

//     const date = document.createElement("h2");
//     date.textContent = travelLog.date;
//     card.appendChild(date);
  
//     const description = document.createElement("p");
//     description.textContent =
//       travelLog.description.split(" ").length > 10
//         ? travelLog.description.split(" ").slice(0, 10).join(" ") + "..."
//         : travelLog.description;
//     card.appendChild(description);
  
//     const buttonLink = document.createElement("a");
//     buttonLink.href = `/travel-log/${travelLog.id}`;
//     const seeDetailButton = document.createElement("button");
//     seeDetailButton.classList.add("see-detail-button");
//     seeDetailButton.textContent = "See Detail";
//     buttonLink.appendChild(seeDetailButton);
//     card.appendChild(buttonLink);
  
//     return card;
//   }
  
//   const container = document.getElementById("travel-log-cards");
//   dataTravelLog.forEach((travelLog) => {
//     const card = createCard(travelLog);
//     container.appendChild(card);
//   });

import { getData, deleteData } from "../api.js";

async function loadTravelLogData() {
  const data = await getData("http://127.0.0.1:5000/api/travel-log");
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
    "http://127.0.0.1:5000/api/tempat-wisata"
  );

  console.log(dataTempatWisata);
  // Populate the dropdown with destinations
  dataTempatWisata.forEach((tempat) => {
    const option = document.createElement("option");
    option.value = tempat.id;
    option.textContent = `${tempat.NamaTempatWisata} (${tempat.NamaKota}, ${tempat.NamaNegara})`;
    destinationDropdown.appendChild(option);
  });

  // Set city and country fields based on selected destination
  destinationDropdown.addEventListener("change", () => {
    const selectedId = destinationDropdown.value;
    const selectedTempat = dataTempatWisata.find(
      (tempat) => tempat.id == selectedId
    );

    if (selectedTempat) {
      cityInput.value = selectedTempat.NamaKota || "";
      countryInput.value = selectedTempat.NamaNegara || "";
    }
  });
  })
  // Handle form submission
  

loadTravelLogData();