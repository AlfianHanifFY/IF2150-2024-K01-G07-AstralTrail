import { getData } from "../api.js";

document.addEventListener("DOMContentLoaded", async () => {

    try{
        const data = await getData("http://127.0.0.1:5000/showStatisticPage")

        if (data.error) {
            console.error("Error fetching TravelTrail data:", data.error);
            return;}
    
    const tempatWisataData = data.TempatWisata;
    const negaraData = data.Negara;

    // Line Chart
    const lineChartCtx = document.getElementById("lineChart").getContext("2d");
    const lineChartLabels = tempatWisataData.map((item) => item[1]); // NamaTempatWisata
    const lineChartValues = tempatWisataData.map((item) => item[4]); // VisitCount

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
              label: (context) =>
                `${context.label}: ${context.raw} visits`,
            },
          },
        },
      },
    });
    
    const pieChartCtx = document.getElementById("pieChart").getContext("2d");
    const pieChartLabels = negaraData.map((item) => item[1]); // NamaNegara
    const pieChartValues = negaraData.map((item) => item[2]); // VisitCount

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

    const sortedNegaraData = negaraData.sort((a, b) => b[2] - a[2]); // Sort by VisitCount
    const top5List = document.getElementById("top5List");

    const label = document.createElement("label");
    label.setAttribute("for", "top5List");
    label.textContent = "Top 5 Countries by Visit Count:";

    top5List.parentElement.insertBefore(label, top5List);

    sortedNegaraData.slice(0, 5).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item[1]}: ${item[2]} visits`; // NamaNegara: VisitCount
        top5List.appendChild(li);
    });



    } catch (error) {
        console.error("Error setting up Travel Trail:", error);
    }



});