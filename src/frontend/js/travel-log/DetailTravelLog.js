import { getData } from "../api.js";

const travelLogId = new URLSearchParams(window.location.search).get("id");


async function loadTravelLogById() {
  const travelLogData = await getData(
    `http://127.0.0.1:5000/api/travel-log/${travelLogId}`
  );
  console.log(travelLogData);

  const imageElement = document.querySelector(".image");
  const titleElement = document.querySelector(".title");
  const locationElement = document.querySelector(".location");
  const descriptionElement = document.querySelector(".description");
  const dateElement = document.querySelector(".date");

  imageElement.src = travelLogData[0].ImagePath;
  imageElement.alt = travelLogData[0].NamaTempatWisata;
  titleElement.textContent = travelLogData[0].NamaTempatWisata;
  locationElement.textContent = `${travelLogData[0].NamaKota}, ${travelLogData[0].NamaNegara}`;

  const rawDate = travelLogData[0].Tanggal;
  const date = new Date(rawDate);
  const formattedDate = formatDateToDDMMYYYY(date);

  dateElement.textContent = formattedDate;
  descriptionElement.textContent = travelLogData[0].DeskripsiUser;

}

function formatDateToDDMMYYYY(date) {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

loadTravelLogById();
