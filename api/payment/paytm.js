import { API } from "../apiEndpoint";

export const createPaytmTransaction = async (orderId, userId, token, redirectUrl) => {
    try {
        const response = await fetch(`${API}/create-paytm-transaction/${userId}?orderId=${orderId}&redirectUrl=${redirectUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

export const getPaytmTransaction = async (orderId) => {
    try {
        const response = await fetch(`${API}/paytm-transaction-status?orderId=${orderId}`, {
            method: "GET"
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}
