// const dataBucketList = [
//     {
//       id: 1,
//       name: "Visit Eiffel Tower",
//       city: "Paris",
//       country: "France",
//       date: "2024-12-25",
//       notes: "Must visit the Eiffel Tower during the holiday season!",
//     },
//     {
//       id: 2,
//       name: "Explore Great Wall of China",
//       city: "Beijing",
//       country: "China",
//       date: "2025-06-15",
//       notes: "Take a guided tour and explore different sections of the Wall.",
//     },
//     {
//       id: 3,
//       name: "Tour Machu Picchu",
//       city: "Cusco",
//       country: "Peru",
//       date: "2025-04-10",
//       notes: "Make sure to hike up early to catch the sunrise.",
//     },

//   ];

//   function createCard(bucketItem) {
//     const card = document.createElement("div");
//     card.classList.add("card");

//     const header = document.createElement("div");
//     header.classList.add("header");

//     const editLink = document.createElement("a");
//     editLink.href = `/bucket-list/edit/${bucketItem.id}`;
//     editLink.innerHTML = '<img src="../../../../img/Icon.svg" alt="Edit Icon">';

//     const deleteButton = document.createElement("button");
//     deleteButton.innerHTML = '<img src="../../../../img/Vector.svg" alt="Delete Icon">';

//     header.appendChild(editLink);
//     header.appendChild(deleteButton);
//     card.appendChild(header);

//     const title = document.createElement("h1");
//     title.textContent = bucketItem.name;
//     card.appendChild(title);

//     const cityCountry = document.createElement("h2");
//     cityCountry.textContent = `${bucketItem.city}, ${bucketItem.country}`;
//     card.appendChild(cityCountry);

//     const date = document.createElement("p");
//     date.textContent = `Date: ${bucketItem.date}`;
//     card.appendChild(date);

//     const notes = document.createElement("p");
//     notes.textContent =
//       bucketItem.notes.split(" ").length > 10
//       ? bucketItem.notes.split(" ").slice(0, 10).join(" ") + "..."
//       : bucketItem.notes;
//     card.appendChild(notes);

//     const buttonLink = document.createElement("a");
//     buttonLink.href = `/bucket-list/${bucketItem.id}`;
//     const seeDetailButton = document.createElement("button");
//     seeDetailButton.classList.add("see-detail-button");
//     seeDetailButton.textContent = "See Detail";
//     buttonLink.appendChild(seeDetailButton);
//     card.appendChild(buttonLink);

//     return card;
//   }

//   const container = document.getElementById("bucket-list-cards");

//   dataBucketList.forEach((bucketItem) => {
//     const card = createCard(bucketItem);
//     container.appendChild(card);
//   });

import { getData, deleteData } from "../api.js";

async function loadBucketListData() {
  const dataBucketList = await getData("http://127.0.0.1:5000/api/bucket-list");

  console.log(dataBucketList);
  const bucketListCards = document.getElementById("bucket-list-cards");
  bucketListCards.innerHTML = "";
  dataBucketList.forEach((bucketItem) => {
    const card = createCard(bucketItem);
    bucketListCards.appendChild(card);
  });
}

function createCard(bucketItem) {
  const url = `http://127.0.0.1:5000/api/bucket-list/${bucketItem.id}`;

  const card = document.createElement("div");
  card.classList.add("card");

  const header = document.createElement("div");
  header.classList.add("header");

  const editLink = document.createElement("a");
  editLink.href = `../../pages/bucket-list/EditBucketList.html?id=${bucketItem.id}`;
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

  const title = document.createElement("h1");
  title.textContent = bucketItem.NamaTempatWisata;
  card.appendChild(title);

  const cityCountry = document.createElement("h2");
  cityCountry.textContent = `${bucketItem.NamaKota}, ${bucketItem.NamaNegara}`;
  card.appendChild(cityCountry);

  const rawDate = bucketItem.Tanggal;
  const date = new Date(rawDate);
  const formattedDate = formatDateToDDMMYYYY(date);
  
  const dateElement = document.createElement("p");
  dateElement.textContent = formattedDate;
  card.appendChild(dateElement);

  // const notes = document.createElement("p");
  // notes.textContent =
  //   bucketItem.notes.split(" ").length > 10
  //     ? bucketItem.notes.split(" ").slice(0, 10).join(" ") + "..."
  //     : bucketItem.notes;
  // card.appendChild(notes);

  // const buttonLink = document.createElement("a");
  // buttonLink.href = `/bucket-list/${bucketItem.id}`;
  // const seeDetailButton = document.createElement("button");
  // seeDetailButton.classList.add("see-detail-button");
  // seeDetailButton.textContent = "See Detail";
  // buttonLink.appendChild(seeDetailButton);
  // card.appendChild(buttonLink);

  return card;
}

function formatDateToDDMMYYYY(date) {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

loadBucketListData();
