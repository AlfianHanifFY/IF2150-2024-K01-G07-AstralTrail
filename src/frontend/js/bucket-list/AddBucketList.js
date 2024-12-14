import { getData, postData } from "../api.js";
  
document.addEventListener("DOMContentLoaded", async () => {
  const destinationDropdown = document.getElementById("destination");
  const cityInput = document.getElementById("city");
  const countryInput = document.getElementById("country");
  const dateInput = document.getElementById("tanggal");

  const dataTempatWisata = await getData("http://127.0.0.1:5000/api/tempat-wisata");

  dataTempatWisata.forEach((tempat) => {
    const option = document.createElement("option");
    option.value = tempat.id;
    option.textContent = `${tempat.NamaTempatWisata} (${tempat.NamaKota}, ${tempat.NamaNegara})`;
    destinationDropdown.appendChild(option);
  });

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

  document.getElementById("bucketListForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedId = destinationDropdown.value;
    const date = dateInput.value;

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
        window.location.href = `../../pages/bucket-list/BucketList.html`;
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan saat menambahkan bucket list.");
      });
  });

  document
    .getElementById("cancelButton")
    .addEventListener("click", function () {
      document.getElementById("bucketListForm").reset();
      document.getElementById("image").value = "";
    });
});
