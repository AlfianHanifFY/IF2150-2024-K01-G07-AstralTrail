import { getData, putData, uploadImage } from "../api.js";

const travelLogId = new URLSearchParams(window.location.search).get("id");

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

async function loadTravelLogDataById() {
  if (!travelLogId) {
    alert("ID Bucket List tidak ditemukan!");
    return;
  }

  try {
    const travelLog = await getData(
      `http://127.0.0.1:5000/api/travel-log/${travelLogId}`
    );

    const destinationDropdown = document.getElementById("destination");
    const selectedTempatWisataId = travelLog[0].TempatWisataId;

    destinationDropdown.value = selectedTempatWisataId;

    document.getElementById("city").value = travelLog[0].NamaKota;
    document.getElementById("country").value = travelLog[0].NamaNegara;

    const tanggal = new Date(travelLog[0].Tanggal);
    const formattedDate = tanggal.toISOString().split("T")[0];
    document.getElementById("tanggal").value = formattedDate;

    document.getElementById("notes").value = travelLog[0].DeskripsiUser;

    const imagePath = travelLog[0].ImagePath;
    if (imagePath) {
      preview.src = imagePath;
      preview.style.display = "block";
      removeImageButton.style.display = "block";
      dragText.style.display = "none";
    }
  } catch (error) {
    console.error("Gagal memuat data travel log:", error);
    alert("Terjadi kesalahan saat memuat data travel log.");
  }
}

document
  .getElementById("travelLogForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    let imagePath = ""; // Default: jika tidak ada gambar baru

    // Jika ada gambar baru, unggah gambar
    const imageFile = document.getElementById("image").files[0];
    if (imageFile) {
      try {
        imagePath = await uploadImage(imageFile);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengunggah gambar:", error);
        alert("Terjadi kesalahan saat mengunggah gambar.");
        return;
      }
    } else {
      // Cek jika gambar baru dihapus dan tidak ada gambar
      const travelLog = await getData(
        `http://127.0.0.1:5000/api/travel-log/${travelLogId}`
      );
      imagePath = travelLog[0].ImagePath || ""; // Tetap gunakan gambar yang ada atau kosongkan
    }

    const destination = document.getElementById("destination").value;
    const date = document.getElementById("tanggal").value;
    const notes = document.getElementById("notes").value;

    // Validation check: If no image is available
    if (!imagePath) {
      alert("Harap unggah gambar sebelum menyimpan form.");
      return;
    }

    const updatedData = {
      TempatWisataId: destination,
      Tanggal: date,
      DeskripsiUser: notes,
      ImagePath: imagePath,
    };

    try {
      const result = await putData(
        `http://127.0.0.1:5000/api/travel-log/${travelLogId}`,
        updatedData
      );
      console.log("Data berhasil diperbarui:", result);
      alert("Travel log berhasil diperbarui!");
      window.location.href = `../../pages/travel-log/travelLog.html`;
    } catch (error) {
      console.error("Gagal memperbarui travel log:", error);
      alert("Terjadi kesalahan saat memperbarui travel log.");
    }
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

document.addEventListener("DOMContentLoaded", async () => {
  await loadTempatWisata();
  loadTravelLogDataById();
});
