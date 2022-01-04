import {API} from "../apiEndpoint";

export const createPayment = async (orderId, userId, token) => {
    try {
        const response = await fetch(`${API}/create-payment/${userId}?orderid=${orderId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authoriztion: `Bearer ${token}`
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};