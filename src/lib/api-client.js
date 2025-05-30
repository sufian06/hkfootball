class ApiClient {
  async fetch(endpoint, options = {}) {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  async getPlayers() {
    return this.fetch("/players");
  }

  async getAPlayer(id) {
    return this.fetch(`/players/${id}`);
  }
}

export const apiClient = new ApiClient();
