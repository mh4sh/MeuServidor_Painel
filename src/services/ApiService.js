const api = 'https://api.meuservidor.projeto.mh4sh.dev/v1/';

export const ApiService = {
    get: async (endpoint) => {
        const request = await fetch(`${api}${endpoint}`),
            response = await request.json(),
            status = await request.status;

        return {status, data: response.dados};
    },
    getItem: async (endpoint, id) => {
        const request = await fetch(`${api}${endpoint}/${id}`),
            response = await request.json(),
            status = await request.status;

        return {status, data: response.dados};
    },
    post: async (endpoint, data) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const request = await fetch(`${api}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        }),
            response = await request.json(),
            status = await request.status;

        return {status, data: response.dados};
    },
    delete: async (endpoint, id) => {
        const request = await fetch(`${api}${endpoint}/${id}`, {
            method: 'DELETE'
        }),
            response = await request.json(),
            status = await request.status;

        return {status, data: response.dados};
    },
    put: async (endpoint, id, data) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const request = await fetch(`${api}${endpoint}/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        }),
            response = await request.json(),
            status = await request.status;

        return {status, data: response.dados};
    },
    patch: async (endpoint, id, data) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const request = await fetch(`${api}${endpoint}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(data)
        }),
            response = await request.json(),
            status = await request.status;

        return {status, data: response.dados};
    }
}