
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
    const lineChartLabels = tempatWisataData.map((item) => `${item[0]}-${String(item[1]).padStart(2, '0')}`);
    const lineChartValues = tempatWisataData.map((item) => item[2]);

    new Chart(lineChartCtx, {
      type: "line",
      data: {
        labels: lineChartLabels,
        datasets: [
          {
            label: "Report Snapshot",
            data: lineChartValues,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(74, 144, 226, 0.1)",
            tension: 0.4,
            fill : true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
            title:{
                display: true,
                text: "Report Snapshot",
                font:{
                    size: 18,
                },
                padding:{
                    top: 10,
                    bottom:20,
                },
            },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => `${context.label}: ${context.raw} visits`
            },
          },
          legend: {
            display: false, // Clean look
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#6e6e6e",
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#e5e5e5",
            },
            ticks: {
              color: "#6e6e6e",
            },
          },
        },
    }
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
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Destination", 
            font: {
              size: 18,
            },
            padding: {
              top: 10,
              bottom: 10,
            },
          },
        },}
    });


    // Top Country
    const dashboardContainer = document.getElementById("topCountryContainer");

    dashboardContainer.innerHTML = "";
  
    const topCountryContainer = document.createElement("div");
    topCountryContainer.className = "top-country-container";
  
    const title = document.createElement("h3");
    title.textContent = "Top Country";
    topCountryContainer.appendChild(title);
  
    const countryFlex = document.createElement("div");
    countryFlex.className = "country-flex";
  
    negaraData.slice(0, 5).forEach((country) => {
      const countryBlock = document.createElement("div");
      countryBlock.className = "country-block";
  
      const count = document.createElement("span");
      count.className = "country-count";
      count.textContent = country[2];
  
      const name = document.createElement("span");
      name.className = "country-name";
      name.textContent = country[1];
  
      countryBlock.appendChild(count);
      countryBlock.appendChild(name);
      countryFlex.appendChild(countryBlock);
    });
  
    topCountryContainer.appendChild(countryFlex);
    dashboardContainer.appendChild(topCountryContainer);

  } catch (error) {
    console.error("Error setting up Travel Trail:", error);
  }
});