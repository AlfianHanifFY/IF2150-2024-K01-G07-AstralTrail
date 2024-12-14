import { postData, uploadImage } from "../api.js";

document
  .getElementById("tempatWisataForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const imageFile = document.getElementById("image").files[0];

    if (!imageFile) {
      alert("Harap unggah gambar sebelum menyimpan form.");
      return;
    }

    try {
      const imagePath = await uploadImage(imageFile);

      const formData = {
        NamaTempatWisata: document.getElementById("name").value,
        NamaNegara: document.getElementById("country").value,
        NamaKota: document.getElementById("city").value,
        Deskripsi: document.getElementById("description").value,
        ImagePath: imagePath,
      };

      const response = await postData(
        "http://127.0.0.1:5000/api/tempat-wisata",
        formData
      );
      console.log("Data berhasil ditambahkan:", response);
      alert("Tempat wisata berhasil ditambahkan!");
      window.location.href = `../../pages/tempat-wisata/TempatWisata.html`;
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat menambahkan tempat wisata.");
    }
  });

document.getElementById("cancelButton").addEventListener("click", function () {
  document.getElementById("tempatWisataForm").reset();
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
