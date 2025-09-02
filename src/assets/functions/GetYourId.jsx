const GetYourId = async () => {
    const API_URL = "https://striveschool-api.herokuapp.com/api/profile/";
    const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI2Yjk5MDE2MjdjNjAwMTVmOGM1ODEiLCJpYXQiOjE3NTY4MDU1MjAsImV4cCI6MTc1ODAxNTEyMH0.CSCymkjF77OkWMKrXDgQ7Gsm-g6OZLgXMmeqIc6UgwA";

    try {
        const response = await fetch(`${API_URL}me`, {
            headers: {
                authorization: `Bearer ${API_KEY}`,
            },
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const result = await response.json();
        console.log(result._id);
        return result._id;
    } catch (err) {
        console.log(err);
    }
};

export default GetYourId;
