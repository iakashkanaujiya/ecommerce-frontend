import { API } from "../apiEndpoint";

//singup the user
export const signUp = async (phone) => {
    try {
        const response = await fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ phone })
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

//signin the user
export const signIn = async (userId) => {
    try {
        const response = await fetch(`${API}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId })
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

// Verify Session
export const verifySessionToken = async (token, userId) => {
    try {
        const response = await fetch(`${API}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, userId })
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

//authenticate the user
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", JSON.stringify(data));
        localStorage.setItem("session", Date.now());
    }
    next();
};

// check whether the user is authenticated
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("token")) {
        let session = localStorage.getItem("session");
        let time = Date.now() - session;
        let seconds = time / 1000;
        let minutes = seconds / 60;
        let hours = minutes / 60;
        let days = hours / 24;

        if (days > 3) {
            localStorage.removeItem("token");
            localStorage.removeItem("session");
        } else {
            return JSON.parse(localStorage.getItem("token"));
        }
    }
    return false;
}

// update Authenticated user in token
export const updateAuthenticatedUser = (user, next) => {
    let data;
    if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
            data = JSON.parse(localStorage.getItem("token"));
            data.user.firstname = user.firstname;
            data.user.lastname = user.lastname;
            data.user.email = user.email;
            data.user.phone = user.phone;
            localStorage.setItem("token", JSON.stringify(data));
            next();
        }
    }
}

// signout the User
export const signOut = (next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
            next();
        }
    }
};