import {ApiService} from './ApiService';

const endpoint = 'nodequery';

export const NodeQueryService = {
    listAll: () => {
        return ApiService.get(endpoint);
    },
    data: (id) => {
        return ApiService.getItem(endpoint, id);
    },
    edit: (accont) => {
        return ApiService.put(endpoint, accont._id, accont);
    },
    updateServers: (id) => {
        return ApiService.patch(endpoint, id, {});
    },
    remove: (id) => {
        return ApiService.delete(endpoint, id);
    },
    add: (data) => {
        return ApiService.post(endpoint, data);
    }
}