// import { getData, putData } from "../api.js";

// const bucketListId = new URLSearchParams(window.location.search).get("id");
// console.log("Bucket List ID:", bucketListId);

// // Memuat data bucket list dan mengisi form
// async function loadBucketListData() {
//   if (!bucketListId) {
//     alert("ID Bucket List tidak ditemukan!");
//     return;
//   }

//   try {
//     const bucketList = await getData(
//       `http://127.0.0.1:5000/api/bucket-list/${bucketListId}`
//     );
//     console.log("Bucket List Data:", bucketList);

//     // Mengisi form dengan data bucket list
//     document.getElementById("destination").value = bucketList.TempatWisataId;
//     document.getElementById("city").value = bucketList.NamaKota || "";
//     document.getElementById("country").value = bucketList.NamaNegara || "";
//     document.getElementById("tanggal").value = new Date(bucketList.Tanggal)
//       .toISOString()
//       .slice(0, 10); // Format YYYY-MM-DD
//   } catch (error) {
//     console.error("Gagal memuat data bucket list:", error);
//     alert("Terjadi kesalahan saat memuat data bucket list.");
//   }
// }

// // Menangani submit form untuk update data
// document
//   .getElementById("bucketListForm")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const destination = document.getElementById("destination").value;
//     const date = document.getElementById("tanggal").value;

//     if (!destination || !date) {
//       alert("Harap isi semua field!");
//       return;
//     }

//     const updatedData = {
//       TempatWisataId: destination,
//       Tanggal: date,
//     };

//     try {
//       const result = await putData(
//         `http://127.0.0.1:5000/api/bucket-list/${bucketListId}`,
//         updatedData
//       );
//       console.log("Data berhasil diperbarui:", result);
//       alert("Bucket list berhasil diperbarui!");
//     //   window.location.href = "../../pages/bucket-list/BucketList.html"; // Redirect setelah berhasil
//     } catch (error) {
//       console.error("Gagal memperbarui bucket list:", error);
//       alert("Terjadi kesalahan saat memperbarui bucket list.");
//     }
//   });

// // Memuat data bucket list saat halaman dimuat
// document.addEventListener("DOMContentLoaded", loadBucketListData);
