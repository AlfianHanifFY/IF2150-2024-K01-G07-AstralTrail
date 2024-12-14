import { getData } from "../api.js";

const tempatWisataId = new URLSearchParams(window.location.search).get("id");
// console.log(tempatWisataId);

async function loadTempatWisataById() {
    const tempatWisataData = await getData(
        `http://127.0.0.1:5000/api/tempat-wisata/${tempatWisataId}`
    );
    console.log(tempatWisataData);
    
    
    const imageElement = document.querySelector(".image");
    const titleElement = document.querySelector(".title");
    const locationElement = document.querySelector(".location");
    const descriptionElement = document.querySelector(".description");

    imageElement.src = tempatWisataData[0].ImagePath;
    imageElement.alt = tempatWisataData[0].NamaTempatWisata;
    titleElement.textContent = tempatWisataData[0].NamaTempatWisata;
    locationElement.textContent = `${tempatWisataData[0].NamaKota}, ${tempatWisataData[0].NamaNegara}`;
    descriptionElement.textContent = tempatWisataData[0].Deskripsi;

    // document.getElementById("image").value = tempatWisata[0].ImagePath;
}

loadTempatWisataById();