// export const dataTempatWisata = [
//     { name: "Eiffel Tower", city: "Paris", country: "France" },
//     { name: "Mount Fuji", city: "Shizuoka", country: "Japan" },
//     { name: "Statue of Liberty", city: "New York", country: "USA" },
//   ];

import { getData, postData } from "../api.js";

  
//   document.addEventListener("DOMContentLoaded", () => {
//     const destinationDropdown = document.getElementById("destination");
//     const cityInput = document.getElementById("city");
//     const countryInput = document.getElementById("country");
  
//     dataTempatWisata.forEach((tempat) => {
//       const option = document.createElement("option");
//       option.value = `${tempat.name},${tempat.city},${tempat.country}`;
//       option.textContent = `${tempat.name} (${tempat.city}, ${tempat.country})`;
//       destinationDropdown.appendChild(option);
//     });
  
//     destinationDropdown.addEventListener("change", () => {
//       const selectedValue = destinationDropdown.value;
//       const [, city, country] = selectedValue.split(",");
//       cityInput.value = city || "";
//       countryInput.value = country || "";
//     });
  
//     console.log("Dropdown populated:", dataTempatWisata);
//   });
  

document.addEventListener("DOMContentLoaded", async () => {
  const destinationDropdown = document.getElementById("destination");
  const cityInput = document.getElementById("city");
  const countryInput = document.getElementById("country");
  const dateInput = document.getElementById("tanggal");
  // const notesInput = document.getElementById("notes");

  // Fetching the destination data from the API
  const dataTempatWisata = await getData("http://127.0.0.1:5000/api/tempat-wisata");

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

  // Handle form submission
  document.getElementById("bucketListForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedId = destinationDropdown.value;
    const date = dateInput.value;
    console.log(date);
    console.log(selectedId);
    // const notes = notesInput.value;

    if (!selectedId || !date) {
      alert("Please select a destination and date.");
      return;
    }

    const BucketListData = {
      TempatWisataId: selectedId,
      Tanggal: date,
    };

    const result = await postData("http://127.0.0.1:5000/api/bucket-list", BucketListData)
      .then((response) => {
        console.log("Data berhasil ditambahkan:", response);
        alert("Bucket list berhasil ditambahkan!");
        // window.location.href = `../../pages/bucket-list/BucketList.html`;
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan saat menambahkan bucket list.");
      });

    console.log("BucketList Data:", result);
  });

  // console.log("Dropdown populated:", dataTempatWisata);
});
