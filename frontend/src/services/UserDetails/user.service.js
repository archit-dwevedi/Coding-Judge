import http from "../../http-common";

class UserService {
    register(data) {
        return http.post('/user/register', data);
    }

    login(data) {
        return http.post('/api-auth/login', data);
    }

    logout() {
        return http.get('/api-auth/logout');
    }

    // More to Cover 

    // Request for user profile
}

export default new UserService();