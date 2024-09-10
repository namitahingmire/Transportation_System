// AuthService.js
const user = {
    userId: '',
    userType: ''
}


export function setUser(userData) {
    user.userId = userData.userId;
    user.userType = userData.userType
}

export function getUserId() {
    return user.userId;
}

export function getUserType() {
    return user.userType;
}

export const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        resolve(loggedIn);
    });
};

export const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
};

export const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
};

