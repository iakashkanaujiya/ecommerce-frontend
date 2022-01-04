import { API } from "../apiEndpoint";

export const getAllProducts = async (limit, sortBy, filterByCategory, filterBySubCategory) => {
    try {
        const response = await fetch(`${API}/products?limit=${limit}&sortBy=${sortBy}&filterByCategory=${filterByCategory}&filterBySubCategory=${filterBySubCategory}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });
        return response.json();
    } catch (error) {
        console.log("Error", error);        
    }
};

export const getProductById = async () => {
    try {
        const response = await fetch(`${API}/product/${productId}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

export const searchProduct = async (search) => {
    try {
        const response = await fetch(`${API}/products/search?search=${search}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}