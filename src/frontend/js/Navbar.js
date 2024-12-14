// JavaScript untuk membuka dan menutup sidebar
const toggleButton = document.getElementById("toggleButton");
const mobileSidebar = document.getElementById("mobileSidebar");
const closeButton = document.getElementById("closeButton");

toggleButton.addEventListener("click", function () {
  mobileSidebar.classList.toggle("open");
});

closeButton.addEventListener("click", function () {
  mobileSidebar.classList.remove("open");
});