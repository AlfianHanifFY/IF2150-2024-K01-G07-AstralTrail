import { getData, deleteData } from "../api.js";

async function loadBucketListData() {
  const dataBucketList = await getData("http://127.0.0.1:5000/api/bucket-list");

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

  return card;
}

function formatDateToDDMMYYYY(date) {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

loadBucketListData();
