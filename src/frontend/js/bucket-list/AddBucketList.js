export const dataTempatWisata = [
    { name: "Eiffel Tower", city: "Paris", country: "France" },
    { name: "Mount Fuji", city: "Shizuoka", country: "Japan" },
    { name: "Statue of Liberty", city: "New York", country: "USA" },
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const destinationDropdown = document.getElementById("destination");
    const cityInput = document.getElementById("city");
    const countryInput = document.getElementById("country");
  
    dataTempatWisata.forEach((tempat) => {
      const option = document.createElement("option");
      option.value = `${tempat.name},${tempat.city},${tempat.country}`;
      option.textContent = `${tempat.name} (${tempat.city}, ${tempat.country})`;
      destinationDropdown.appendChild(option);
    });
  
    destinationDropdown.addEventListener("change", () => {
      const selectedValue = destinationDropdown.value;
      const [, city, country] = selectedValue.split(",");
      cityInput.value = city || "";
      countryInput.value = country || "";
    });
  
    console.log("Dropdown populated:", dataTempatWisata);
  });
  