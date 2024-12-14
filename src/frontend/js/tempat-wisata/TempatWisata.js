import { getData, deleteData } from "../api.js";

async function loadData() {
  const dataTempatWisata = await getData(
    "http://127.0.0.1:5000/api/tempat-wisata"
  );
  const tempatWisataCards = document.getElementById("tempat-wisata-cards");
  tempatWisataCards.innerHTML = "";
  dataTempatWisata.forEach((tempatWisata) => {
    const card = createCard(tempatWisata);
    tempatWisataCards.appendChild(card);
  });
}
loadData();

function createCard(tempatWisata) {
  const url = `http://127.0.0.1:5000/api/tempat-wisata/${tempatWisata.id}`;

  const card = document.createElement("div");
  card.classList.add("card");

  const header = document.createElement("div");
  header.classList.add("header");

  const editLink = document.createElement("a");
  editLink.href = `../../pages/tempat-wisata/EditTempatWisata.html?id=${tempatWisata.id}`;
  editLink.innerHTML = '<img src="../../../../img/Icon.svg" alt="Edit Icon">';

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML =
    '<img src="../../../../img/Vector.svg" alt="Delete Icon">';
  deleteButton.addEventListener("click", async () => {
    deleteData(url);
    window.location.reload();
  });

  header.appendChild(editLink);
  header.appendChild(deleteButton);
  card.appendChild(header);

  const image = document.createElement("img");
  image.src = tempatWisata.ImagePath;
  image.alt = tempatWisata.NamaTempatWisata;
  card.appendChild(image);

  const title = document.createElement("h1");
  title.textContent = tempatWisata.NamaTempatWisata;
  card.appendChild(title);

  const cityCountry = document.createElement("h2");
  cityCountry.textContent = `${tempatWisata.NamaKota}, ${tempatWisata.NamaNegara}`;
  card.appendChild(cityCountry);

  const description = document.createElement("p");
  description.textContent =
    tempatWisata.Deskripsi.split(" ").length > 10
      ? tempatWisata.Deskripsi.split(" ").slice(0, 10).join(" ") + "..."
      : tempatWisata.Deskripsi;
  card.appendChild(description);

  const buttonLink = document.createElement("a");
  buttonLink.href = `../../pages/tempat-wisata/DetailTempatWisata.html?id=${tempatWisata.id}`;
  const seeDetailButton = document.createElement("button");
  seeDetailButton.classList.add("see-detail-button");
  seeDetailButton.textContent = "See Detail";
  buttonLink.appendChild(seeDetailButton);
  card.appendChild(buttonLink);

  return card;
}
