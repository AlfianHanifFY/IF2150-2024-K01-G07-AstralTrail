// Simulate importing data from TempatWisata.js
export const dataTempatWisata = [
    { name: "Eiffel Tower", city: "Paris", country: "France" },
    { name: "Mount Fuji", city: "Shizuoka", country: "Japan" },
    { name: "Statue of Liberty", city: "New York", country: "USA" },
  ];
  
  // Dynamically populate the dropdown and auto-fill city and country
  document.addEventListener("DOMContentLoaded", () => {
    const destinationDropdown = document.getElementById("destination");
    const cityInput = document.getElementById("city");
    const countryInput = document.getElementById("country");
  
    // Populate the dropdown dynamically
    dataTempatWisata.forEach((tempat) => {
      const option = document.createElement("option");
      option.value = `${tempat.name},${tempat.city},${tempat.country}`;
      option.textContent = `${tempat.name} (${tempat.city}, ${tempat.country})`;
      destinationDropdown.appendChild(option);
    });
  
    // Update city and country inputs based on destination selection
    destinationDropdown.addEventListener("change", () => {
      const selectedValue = destinationDropdown.value; // Get selected value
      const [, city, country] = selectedValue.split(","); // Split value by commas
  
      // Auto-fill city and country inputs
      cityInput.value = city || "";
      countryInput.value = country || "";
    });
  
    console.log("Dropdown populated:", dataTempatWisata);
  });
  