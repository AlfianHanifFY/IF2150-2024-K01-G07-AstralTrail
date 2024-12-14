// keruwetan dibawah ini diabaikan aja
export async function fetchData(url, method, data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // kalo ada metod post atau put, nambahin json buat dikirim
        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        // error handling
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // respon dari backend
        return await response.json(); 

    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: error.message };
    }
}

// Ini yang penting :D

// Fungsi untuk mengambil data dengan metod GET
export async function getData(url) {
    return await fetchData(url, 'GET');
}

// Fungsi mengirim json pada http request dengan metod POST
export async function postData(url, data) {
    return await fetchData(url, 'POST', data);
}

// Fungsi mengirim json pada http request dengan metod PUT
export async function putData(url, data) {
    return await fetchData(url, 'PUT', data);
}

// Fungsi untuk mengirim delete request
export async function deleteData(url) {
    return await fetchData(url, 'DELETE');
}

// Fungsi untuk upload image
export async function uploadImage(imageFile) {
 const imageFormData = new FormData();
  imageFormData.append("files[]", imageFile);

  if (!imageFile) {
    alert("Please select an image!");
    return;
  }

  const uploadResponse = await fetch(
    "http://127.0.0.1:5000/api/upload-image",
    {
      method: "POST",
      body: imageFormData,
    }
  );

  // bikin path
  const imagePath = `../../../../img/${imageFile.name}`;
  return imagePath;

    
}
