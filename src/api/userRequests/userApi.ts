import Api from "../apiConnection";

const ApiInstance = new Api().instance;

export const getUser = (name: string) => {
    return ApiInstance.get(`/user/${name}`);
};

export const createUser = (userData: { name: string; email: string }) => {
    return ApiInstance.post(`/user`, userData);
};
