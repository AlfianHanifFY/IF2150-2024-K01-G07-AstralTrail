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

  // Handle form submission
  document
    .getElementById("travelLogForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const selectedId = destinationDropdown.value;
      const date = dateInput.value;
      // console.log(date);
      // console.log(selectedId);
      // const notes = notesInput.value;

      if (!selectedId || !date) {
        alert("Please select a destination and date.");
        return;
      }

      const TravelLogData = {
        TempatWisataId: selectedId,
        Tanggal: date,
        DeskripsiUser: document.getElementById("notes").value,
        ImagePath: "../../../../img/Sample-Image.jpg",
      };

      const result = await postData(
        "http://127.0.0.1:5000/api/travel-log",
        TravelLogData
      )
        .then((response) => {
          console.log("Data berhasil ditambahkan:", response);
          alert("Travel Log berhasil ditambahkan!");
          // window.location.href = `../../pages/bucket-list/BucketList.html`;
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
          alert("Terjadi kesalahan saat menambahkan travel log.");
        });

      console.log("Travel Log Data:", result);
    });

  // console.log("Dropdown populated:", dataTempatWisata);
});

document.getElementById("cancelButton").addEventListener("click", function () {
  document.getElementById("travelLogForm").reset();
  document.getElementById("preview").style.display = "none";
  document.getElementById("dragText").style.display = "block";
  document.getElementById("removeImage").style.display = "none";
  document.getElementById("image").value = "";
});

const dragArea = document.getElementById("dragArea");
const fileInput = document.getElementById("image");
const preview = document.getElementById("preview");
const removeImageButton = document.getElementById("removeImage");
const dragText = document.getElementById("dragText");

dragArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragArea.style.backgroundColor = "#e0e0e0";
});

dragArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dragArea.style.backgroundColor = "#f9f9f9";
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    showPreview(files[0]);
  }
});

dragArea.addEventListener("click", () => {
  if (!fileInput.files.length) {
    fileInput.click();
  }
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    showPreview(fileInput.files[0]);
  }
});

function showPreview(file) {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
      removeImageButton.style.display = "block";
      dragText.style.display = "none";
    };
    reader.readAsDataURL(file);
  } else {
    console.log("File yang dipilih bukan gambar.");
  }
}

removeImageButton.addEventListener("click", function () {
  preview.style.display = "none";
  dragText.style.display = "block";
  removeImageButton.style.display = "none";
  fileInput.value = "";
});
