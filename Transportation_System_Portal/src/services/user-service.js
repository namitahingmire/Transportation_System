class UserService {
    static setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }


    static getUser() {
        const userJSON = localStorage.getItem('user');
        return userJSON ? JSON.parse(userJSON) : null;
    }
    
    static clearUser() {
        localStorage.removeItem('user');    
    }
}

export default UserService;