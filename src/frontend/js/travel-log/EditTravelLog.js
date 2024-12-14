import { putData, getData } from "../api.js";

const travelLogId = new URLSearchParams(window.location.search).get("id");
console.log(travelLogId);

async function loadTravelLogById() {
    const travelLogData = await getData(
        `http://127.0.0.1:5000/api/travel-log/${travelLogId}`
    );
    console.log(travelLogData);
}

loadTravelLogById();