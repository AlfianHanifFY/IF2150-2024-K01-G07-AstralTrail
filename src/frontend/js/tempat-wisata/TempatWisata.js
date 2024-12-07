// Data tempat wisata
const dataTempatWisata = [
  {
    id: 1,
    image: "../../../../img/Sample-Image.jpg",
    name: "Nama Tempat Wisata",
    city: "Kota",
    country: "Negara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
  },
  {
    id: 1,
    image: "../../../../img/Sample-Image.jpg",
    name: "Nama Tempat Wisata",
    city: "Kota",
    country: "Negara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
  },
  {
    id: 1,
    image: "../../../../img/Sample-Image.jpg",
    name: "Nama Tempat Wisata",
    city: "Kota",
    country: "Negara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
  },
  {
    id: 1,
    image: "../../../../img/Sample-Image.jpg",
    name: "Nama Tempat Wisata",
    city: "Kota",
    country: "Negara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
  },
  {
    id: 1,
    image: "../../../../img/Sample-Image.jpg",
    name: "Nama Tempat Wisata",
    city: "Kota",
    country: "Negara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
  },
];

function createCard(tempatWisata) {
  const card = document.createElement("div");
  card.classList.add("card");

  const header = document.createElement("div");
  header.classList.add("header");

  const editLink = document.createElement("a");
  editLink.href = `/tempat-wisata/edit/${tempatWisata.id}`;
  editLink.innerHTML = '<img src="../../../../img/Icon.svg" alt="Edit Icon">';

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<img src="../../../../img/Vector.svg" alt="Delete Icon">';

  header.appendChild(editLink);
  header.appendChild(deleteButton);
  card.appendChild(header);

  const image = document.createElement("img");
  image.src = tempatWisata.image;
  image.alt = tempatWisata.name;
  card.appendChild(image);

  const title = document.createElement("h1");
  title.textContent = tempatWisata.name;
  card.appendChild(title);

  const cityCountry = document.createElement("h2");
  cityCountry.textContent = `${tempatWisata.city}, ${tempatWisata.country}`;
  card.appendChild(cityCountry);

  const description = document.createElement("p");
  description.textContent =
    tempatWisata.description.split(" ").length > 10
      ? tempatWisata.description.split(" ").slice(0, 10).join(" ") + "..."
      : tempatWisata.description;
  card.appendChild(description);

  const buttonLink = document.createElement("a");
  buttonLink.href = `/tempat-wisata/${tempatWisata.id}`;
  const seeDetailButton = document.createElement("button");
  seeDetailButton.classList.add("see-detail-button");
  seeDetailButton.textContent = "See Detail";
  buttonLink.appendChild(seeDetailButton);
  card.appendChild(buttonLink);

  return card;
}

const container = document.getElementById("tempat-wisata-cards");
dataTempatWisata.forEach((tempatWisata) => {
  const card = createCard(tempatWisata);
  container.appendChild(card);
});
