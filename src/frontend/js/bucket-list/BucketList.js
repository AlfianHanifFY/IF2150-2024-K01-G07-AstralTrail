const dataBucketList = [
    {
      id: 1,
      name: "Visit Eiffel Tower",
      city: "Paris",
      country: "France",
      date: "2024-12-25",
      notes: "Must visit the Eiffel Tower during the holiday season!",
    },
    {
      id: 2,
      name: "Explore Great Wall of China",
      city: "Beijing",
      country: "China",
      date: "2025-06-15",
      notes: "Take a guided tour and explore different sections of the Wall.",
    },
    {
      id: 3,
      name: "Tour Machu Picchu",
      city: "Cusco",
      country: "Peru",
      date: "2025-04-10",
      notes: "Make sure to hike up early to catch the sunrise.",
    },
    // More bucket list items here...
  ];
  
  // Function to create each bucket list card
  function createCard(bucketItem) {
    const card = document.createElement("div");
    card.classList.add("card");
  
    const header = document.createElement("div");
    header.classList.add("header");
  
    const editLink = document.createElement("a");
    editLink.href = `/bucket-list/edit/${bucketItem.id}`;
    editLink.innerHTML = '<img src="../../../../img/Icon.svg" alt="Edit Icon">';
  
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<img src="../../../../img/Vector.svg" alt="Delete Icon">';
  
    header.appendChild(editLink);
    header.appendChild(deleteButton);
    card.appendChild(header);
  
    const title = document.createElement("h1");
    title.textContent = bucketItem.name;
    card.appendChild(title);
  
    const cityCountry = document.createElement("h2");
    cityCountry.textContent = `${bucketItem.city}, ${bucketItem.country}`;
    card.appendChild(cityCountry);
  
    const date = document.createElement("p");
    date.textContent = `Date: ${bucketItem.date}`;
    card.appendChild(date);
  
    const notes = document.createElement("p");
    notes.textContent = 
      bucketItem.notes.split(" ").length > 10 
      ? bucketItem.notes.split(" ").slice(0, 10).join(" ") + "..." 
      : bucketItem.notes;
    card.appendChild(notes);
  
    const buttonLink = document.createElement("a");
    buttonLink.href = `/bucket-list/${bucketItem.id}`;
    const seeDetailButton = document.createElement("button");
    seeDetailButton.classList.add("see-detail-button");
    seeDetailButton.textContent = "See Detail";
    buttonLink.appendChild(seeDetailButton);
    card.appendChild(buttonLink);
  
    return card;
  }
  
  // Get the container to append cards to
  const container = document.getElementById("bucket-list-cards");
  
  // Loop through data and create a card for each bucket list item
  dataBucketList.forEach((bucketItem) => {
    const card = createCard(bucketItem);
    container.appendChild(card);
  });
  