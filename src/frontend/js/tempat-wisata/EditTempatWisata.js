import { getData, putData } from "../api.js";

const tempatWisataId = new URLSearchParams(window.location.search).get("id");
// console.log(tempatWisataId);

async function loadTempatWisataById() {
  const tempatWisata = await getData(
    `http://127.0.0.1:5000/api/tempat-wisata/${tempatWisataId}`
  );
  // console.log(tempatWisata);
  document.getElementById("name").value = tempatWisata[0].NamaTempatWisata;
  document.getElementById("country").value = tempatWisata[0].NamaNegara;
  document.getElementById("city").value = tempatWisata[0].NamaKota;
  document.getElementById("description").value = tempatWisata[0].Deskripsi;
  // document.getElementById("image").value = tempatWisata[0].ImagePath;
}
loadTempatWisataById();


document
  .getElementById("tempatWisataForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      NamaTempatWisata: document.getElementById("name").value,
      NamaNegara: document.getElementById("country").value,
      NamaKota: document.getElementById("city").value,
      Deskripsi: document.getElementById("description").value,
      ImagePath: "", // Gunakan gambar yang ada atau kosongkan jika tidak ada.
    };

    const result = await putData(
      `http://127.0.0.1:5000/api/tempat-wisata/${tempatWisataId}`,
      formData
    )
      .then((response) => {
        console.log("Data berhasil diperbarui:", response);
        alert("Tempat wisata berhasil diperbarui!");
        // window.location.href = `../../pages/tempat-wisata/TempatWisata.html`;    
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan saat memperbarui tempat wisata.");
      });

    console.log("Form Data:", result);
  });

// Drag-and-drop logic
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
