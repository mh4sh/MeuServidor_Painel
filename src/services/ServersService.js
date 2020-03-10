import {ApiService} from './ApiService';

const endpoint = 'server';

export const ServersService = {
    listAll: () => {
        return ApiService.get(endpoint);
    },
    remove: (id) => {
        return ApiService.delete(endpoint, id);
    },
    add: (data) => {
        return ApiService.post(endpoint, data);
    }
}