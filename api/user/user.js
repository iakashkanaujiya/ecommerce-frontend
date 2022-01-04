import { API } from "../apiEndpoint";

// get the user
export const getUser = async (userId, token) => {
    try {
        const resposne = await fetch(`${API}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return resposne.json();
    } catch (error) {
        console.log(error);
    }
};

// update user
export const updateUser = async (user, userId, token) => {
    try {
        const resposne = await fetch(`${API}/user/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        return resposne.json();
    } catch (error) {
        console.log(error);
    }
};

// Add user address
export const addUserAddress = async (address, userId, token) => {
    try {
        const response = await fetch(`${API}/user/address/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(address)
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

// Get use address
export const getUserAddresses = async (userId, token) => {
    try {
        const response = await fetch(`${API}/user/address/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

// Get address
export const getAddress = async (addressId) => {
    try {
        const response = await fetch(`${API}/address?addressId=${addressId}`, {
            method: "GET",
            headers: {
                Accept: "application/josn"
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

// Update user Address
export const updateUserAddress = async (address, addressId, userId, token) => {
    try {
        const response = await fetch(`${API}/user/address/${userId}?addressId=${addressId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(address)
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

// Delete user Address
export const deleteUserAddress = async (addressId, userId, token) => {
    try {
        const response = await fetch(`${API}/user/address/${userId}?addressId=${addressId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

// Get user's purchased items list
export const getUserOrders = async (userId, token) => {
    try {
        const response = await fetch(`${API}/user/orders/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

