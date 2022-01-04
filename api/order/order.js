import { API } from "../apiEndpoint";

export const createOrder = async (order, userId, token) => {
    try {
        const response = await fetch(`${API}/order/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ order })
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

export const getOrder = async (orderId) => {
    try {
        const response = await fetch(`${API}/order/${orderId}`, {
            method: "GET",
            headers: {
                Accpet: "application/json"
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

export const updateOrderStatus = async (orderId, status, userId, token) => {
    try {
        const response = await fetch(`${API}/order/${orderId}/status/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({status})
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export const completeOrder = async (data, id, userId, token) => {
    // ID is the Object ID of the Database
    try {
        const response = await fetch(`${API}/order/${id}/complete/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};