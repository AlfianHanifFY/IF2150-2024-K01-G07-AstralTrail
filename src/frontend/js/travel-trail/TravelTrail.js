
import { getData } from "../api.js";


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await getData("http://127.0.0.1:5000/api/showStatisticPage");

    if (!data || data.error) {
      console.error("Error fetching TravelTrail data:", data.error || "No data");
      return;
    }

    const tempatWisataData = data.TempatWisata || [];
    const negaraData = data.Negara || [];

    // Log fetched data
    console.log("Fetched TempatWisata:", tempatWisataData);
    console.log("Fetched Negara:", negaraData);

    if (!tempatWisataData.length || !negaraData.length) {
      console.warn("No data available to display.");
      return;
    }

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
    });

    // Top 5 List
    const sortedNegaraData = negaraData.sort((a, b) => b[2] - a[2]);
    const top5List = document.getElementById("top5List");
    sortedNegaraData.slice(0, Math.min(5, sortedNegaraData.length)).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item[1]}: ${item[2]} visits`;
      top5List.appendChild(li);
    });
  } catch (error) {
    console.error("Error setting up Travel Trail:", error);
  }
});
