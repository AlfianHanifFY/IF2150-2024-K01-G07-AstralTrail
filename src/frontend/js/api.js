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
