const api = 'https://api.meuservidor.projeto.mh4sh.dev/v1/';

export const ApiService = {
    get: async (endpoint) => {
        const headers = new Headers();
        headers.append('token', '7345ETCA362V6EVWER27C3VBCJI2F3OIFD4FRYPB3NJEVZMHSRUZZ4FC2HFJYUJ2DD62KF5FUOOANBFR');

        const request = await fetch(`${api}${endpoint}`, {
            headers
        }),
            response = await request.json(),
            status = await request.status;

        return {status, data: response.dados};
    },
    getItem: async (endpoint, id) => {
        const headers = new Headers();
        headers.append('token', '7345ETCA362V6EVWER27C3VBCJI2F3OIFD4FRYPB3NJEVZMHSRUZZ4FC2HFJYUJ2DD62KF5FUOOANBFR');

        const request = await fetch(`${api}${endpoint}/${id}`, {
            headers
        }),
            response = await request.json(),
            status = await request.status;

        return {status, data: response.dados};
    },
    post: async (endpoint, data) => {
        const headers = new Headers();
        headers.append('token', '7345ETCA362V6EVWER27C3VBCJI2F3OIFD4FRYPB3NJEVZMHSRUZZ4FC2HFJYUJ2DD62KF5FUOOANBFR');
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
        const headers = new Headers();
        headers.append('token', '7345ETCA362V6EVWER27C3VBCJI2F3OIFD4FRYPB3NJEVZMHSRUZZ4FC2HFJYUJ2DD62KF5FUOOANBFR');

        const request = await fetch(`${api}${endpoint}/${id}`, {
            method: 'DELETE',
            headers
        }),
            response = await request.json(),
            status = await request.status;

        return {status, data: response.dados};
    },
    put: async (endpoint, id, data) => {
        const headers = new Headers();
        headers.append('token', '7345ETCA362V6EVWER27C3VBCJI2F3OIFD4FRYPB3NJEVZMHSRUZZ4FC2HFJYUJ2DD62KF5FUOOANBFR');
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
        headers.append('token', '7345ETCA362V6EVWER27C3VBCJI2F3OIFD4FRYPB3NJEVZMHSRUZZ4FC2HFJYUJ2DD62KF5FUOOANBFR');
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