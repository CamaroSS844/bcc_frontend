const url = "https://bcc-backend-fwc7.onrender.com";

export const retrieveData = async (authToken, dispatch, initialize) => {
    try {
        const response = await fetch(
            `${url}/cemeteries/graves/?cemetery=Luveve`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    "Accept-encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    Authorization: `Token ${authToken}`,
                },
            }
        );

        if (!response.ok) {
            console.log("Response status:", response.status);
            throw new Error("Failed to retrieve data");
        }

        const data = await response.json();
        console.log("Retrieved data:", data);

        // Dispatch the data to the Redux store
        dispatch(initialize(data));
    } catch (error) {
        console.error("Error retrieving data:", error.message);
    }
};

export const addNewGrave = async (authToken, body) => {
    try {
        const response = await fetch(
            `${url}/cemeteries/graves/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    "Accept-encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    Authorization: `Token ${authToken}`,
                },
                body: JSON.stringify(body),
            },
        );

        if (!response.ok) {
            console.log("Response status:", response.status);
            throw new Error("Failed to add new grave");
        }

        const data = await response.json();

    } catch (error) {
        console.error("Error adding new grave:", error.message);
    }
};

export const updateGrave = async (authToken, body) => {
    try {
        const response = await fetch(
            `${url}/cemeteries/graves/1/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    "Accept-encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    Authorization: `Token ${authToken}`,
                },
                body: JSON.stringify(body),
            },
        );

        if (!response.ok) {
            console.log("Response status:", response.status);
            throw new Error("Failed to update grave");
        }

        const data = await response.json();

    } catch (error) {
        console.error("Error updating grave:", error.message);
    }
};