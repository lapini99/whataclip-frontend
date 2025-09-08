import Api from "../apiConnection";

const ApiInstance = new Api().instance;

export const getAuthHeader = () => {
    const token = localStorage.getItem('jwt_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export const login = (mail: string, password: string) => {
    return ApiInstance.post('/login', { mail, password });
};

export const getUser = (name: string) => {
    return ApiInstance.get(`/user/${name}`);
};

export const createUser = (userData: { name: string; email: string }) => {
    return ApiInstance.post(`/user`, userData);
};
