import Api from "../apiConnection";

const ApiInstance = new Api().instance;

export const login = (name: string, password: string) => {
    return ApiInstance.post('/login', { name, password });
};

export const getUser = (name: string) => {
    return ApiInstance.get(`/user/${name}`);
};

export const createUser = (userData: { name: string; email: string }) => {
    return ApiInstance.post(`/user`, userData);
};
