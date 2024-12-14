import { getData, putData } from "../api.js";

const bucketListId = new URLSearchParams(window.location.search).get("id");
console.log("Travel Log ID:", bucketListId);
