
import { getData } from "../api.js";


document.addEventListener("DOMContentLoaded", async () => {
  try {

    const data = await getData("http://127.0.0.1:5000/api/showStatisticPage");

    if (data.error) {
      console.error("Error fetching TravelTrail data:", data.error);
      return;
    }

    const tempatWisataData = data.TempatWisata;
    const negaraData = data.Negara;

    // Line Chart
    const lineChartCtx = document.getElementById("lineChart").getContext("2d");
    const lineChartLabels = tempatWisataData.map((item) => item[1]);
    const lineChartValues = tempatWisataData.map((item) => item[4]);

    new Chart(lineChartCtx, {
      type: "line",
      data: {
        labels: lineChartLabels,
        datasets: [
          {
            label: "Report Snapshot",
            data: lineChartValues,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw} visits`,
            },
          },
        },
      },
    });

    // Pie Chart
    const pieChartCtx = document.getElementById("pieChart").getContext("2d");
    const pieChartLabels = negaraData.map((item) => item[1]);
    const pieChartValues = negaraData.map((item) => item[2]);

    new Chart(pieChartCtx, {
      type: "pie",
      data: {
        labels: pieChartLabels,
        datasets: [
          {
            data: pieChartValues,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    });

    // Country List
    const countryContainer = document.getElementById("countryContainer");
    const countryTitle = document.createElement("h3");
    countryTitle.textContent = "Country";
    countryContainer.appendChild(countryTitle);

    const countryList = document.createElement("ul");

    negaraData.forEach((country) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${country[1]}: ${country[2]} visits`;
      countryList.appendChild(listItem);
    });


    countryContainer.appendChild(countryList);

    // Top Country
    const topCountryContainer = document.getElementById("topCountryContainer");
    const topCountryTitle = document.createElement("h3");
    topCountryTitle.textContent = "Top Country";
    topCountryContainer.appendChild(topCountryTitle);

    const topCountries = negaraData
      .sort((a, b) => b[2] - a[2]) // Sort by VisitCount descending
      .slice(0, 5);

    topCountries.forEach((country) => {
      const topCountryDiv = document.createElement("div");
      topCountryDiv.textContent = `${country[1]}: ${country[2]} visits`;
      topCountryContainer.appendChild(topCountryDiv);
    });

  } catch (error) {
    console.error("Error setting up Travel Trail:", error);
  }
});