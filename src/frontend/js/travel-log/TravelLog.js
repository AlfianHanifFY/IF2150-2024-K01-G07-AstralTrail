// Data travel log
const dataTravelLog = [
    {
      id: 1,
      image: "../../../../img/Sample-Image.jpg",
      name: "Nama Tempat Wisata",
      city: "Kota",
      country: "Negara",
      date: "DD/MM/YYYY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
    },
    {
      id: 1,
      image: "../../../../img/Sample-Image.jpg",
      name: "Nama Tempat Wisata",
      city: "Kota",
      country: "Negara",
      date: "DD/MM/YYYY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
    },
    {
      id: 1,
      image: "../../../../img/Sample-Image.jpg",
      name: "Nama Tempat Wisata",
      city: "Kota",
      country: "Negara",
      date: "DD/MM/YYYY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
    },
    {
      id: 1,
      image: "../../../../img/Sample-Image.jpg",
      name: "Nama Tempat Wisata",
      city: "Kota",
      country: "Negara",
      date: "DD/MM/YYYY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
    },
    {
      id: 1,
      image: "../../../../img/Sample-Image.jpg",
      name: "Nama Tempat Wisata",
      city: "Kota",
      country: "Negara",
      date: "DD/MM/YYYY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies urna et urna efficitur, non vehicula risus dapibus.",
    },
  ];
  
  function createCard(travelLog) {
    const card = document.createElement("div");
    card.classList.add("card");
  
    const header = document.createElement("div");
    header.classList.add("header");
  
    const editLink = document.createElement("a");
    editLink.href = `/travel-log/edit/${travelLog.id}`;
    editLink.innerHTML = '<img src="../../../../img/Icon.svg" alt="Edit Icon">';
  
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<img src="../../../../img/Vector.svg" alt="Delete Icon">';
  
    header.appendChild(editLink);
    header.appendChild(deleteButton);
    card.appendChild(header);
  
    const image = document.createElement("img");
    image.src = travelLog.image;
    image.alt = travelLog.name;
    card.appendChild(image);
  
    const title = document.createElement("h1");
    title.textContent = travelLog.name;
    card.appendChild(title);
  
    const cityCountry = document.createElement("h2");
    cityCountry.textContent = `${travelLog.city}, ${travelLog.country}`;
    card.appendChild(cityCountry);

    const date = document.createElement("h2");
    date.textContent = travelLog.date;
    card.appendChild(date);
  
    const description = document.createElement("p");
    description.textContent =
      travelLog.description.split(" ").length > 10
        ? travelLog.description.split(" ").slice(0, 10).join(" ") + "..."
        : travelLog.description;
    card.appendChild(description);
  
    const buttonLink = document.createElement("a");
    buttonLink.href = `/travel-log/${travelLog.id}`;
    const seeDetailButton = document.createElement("button");
    seeDetailButton.classList.add("see-detail-button");
    seeDetailButton.textContent = "See Detail";
    buttonLink.appendChild(seeDetailButton);
    card.appendChild(buttonLink);
  
    return card;
  }
  
  const container = document.getElementById("travel-log-cards");
  dataTravelLog.forEach((travelLog) => {
    const card = createCard(travelLog);
    container.appendChild(card);
  });
  