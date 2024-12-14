import { getData, putData } from "../api.js";

const bucketListId = new URLSearchParams(window.location.search).get("id");

async function loadTempatWisata() {
  try {
    const tempatWisataData = await getData(
      "http://127.0.0.1:5000/api/tempat-wisata"
    );
    const destinationDropdown = document.getElementById("destination");

    tempatWisataData.forEach((tempat) => {
      const option = document.createElement("option");
      option.value = tempat.id;
      option.textContent = `${tempat.NamaTempatWisata} (${tempat.NamaKota}, ${tempat.NamaNegara})`;
      destinationDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Gagal memuat data tempat wisata:", error);
    alert("Terjadi kesalahan saat memuat data tempat wisata.");
  }
}

async function loadBucketListData() {
  if (!bucketListId) {
    alert("ID Bucket List tidak ditemukan!");
    return;
  }

  try {
    const bucketList = await getData(
      `http://127.0.0.1:5000/api/bucket-list/${bucketListId}`
    );

    const destinationDropdown = document.getElementById("destination");
    const selectedTempatWisataId = bucketList[0].TempatWisataId;

    destinationDropdown.value = selectedTempatWisataId;

    document.getElementById("city").value = bucketList[0].NamaKota || "";
    document.getElementById("country").value = bucketList[0].NamaNegara || "";

    const tanggal = new Date(bucketList[0].Tanggal);
    const formattedDate = tanggal.toISOString().split("T")[0];
    document.getElementById("tanggal").value = formattedDate;
  } catch (error) {
    console.error("Gagal memuat data bucket list:", error);
    alert("Terjadi kesalahan saat memuat data bucket list.");
  }
}

document
  .getElementById("bucketListForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const destination = document.getElementById("destination").value;
    const date = document.getElementById("tanggal").value;

    if (!destination || !date) {
      alert("Harap isi semua field!");
      return;
    }

    const updatedData = {
      TempatWisataId: destination,
      Tanggal: date,
    };

    try {
      const result = await putData(
        `http://127.0.0.1:5000/api/bucket-list/${bucketListId}`,
        updatedData
      );
      console.log("Data berhasil diperbarui:", result);
      alert("Bucket list berhasil diperbarui!");
      window.location.href = `../../pages/bucket-list/BucketList.html`;
    } catch (error) {
      console.error("Gagal memperbarui bucket list:", error);
      alert("Terjadi kesalahan saat memperbarui bucket list.");
    }
  });


document.addEventListener("DOMContentLoaded", async () => {
  await loadTempatWisata();
  loadBucketListData();
});

document
.getElementById("cancelButton")
.addEventListener("click", function () {
  document.getElementById("bucketListForm").reset();
});
