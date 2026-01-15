const axios = require('axios');

class PteroClient {
    constructor() {
        this.url = process.env.PTERO_URL;
        this.apiKey = process.env.PTERO_API_KEY;
        this.api = axios.create({
            baseURL: `${this.url}/api/application`,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            }
        });
    }

    async getUsers() {
        const response = await this.api.get('/users');
        return response.data;
    }

    async createUser(userData) {
        const response = await this.api.post('/users', userData);
        return response.data;
    }

    async deleteUser(userId) {
        await this.api.delete(`/users/${userId}`);
    }

    async getServers() {
        const response = await this.api.get('/servers');
        return response.data;
    }

    async createServer(serverData) {
        const response = await this.api.post('/servers', serverData);
        return response.data;
    }

    async deleteServer(serverId) {
        await this.api.delete(`/servers/${serverId}`);
    }
}

module.exports = new PteroClient();
