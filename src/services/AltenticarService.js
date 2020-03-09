import {ApiService} from './ApiService';

const endpoint = 'login';

export const AltenticarService = {
    login: (data) => {
        return ApiService.post(endpoint, data);
    },
    logout: (id) => {
        return ApiService.delete(endpoint, id);
    }
}