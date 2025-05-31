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

  async createplayer(videoData) {
    return this.fetch("/players", {
      method: "POST",
      body: videoData,
    });
  }

  async createMatch(matchData) {
    return this.fetch("/matches", {
      method: "POST",
      body: matchData,
    });
  }
}

export const apiClient = new ApiClient();
