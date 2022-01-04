import {API} from "../apiEndpoint";

export const getAllCategories = async () => {
    try {
        const response = await fetch(`${API}/categories`, {
            method: "GET",
            headers: {
                Acdept: "application/json"
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

export const getAllSubCategories = async () => {
    try {
        const response = await fetch(`${API}/categories/sub`, {
            method: "GET"
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};