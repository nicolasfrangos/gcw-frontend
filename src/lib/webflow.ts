const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;

if (!WEBFLOW_TOKEN) {
  throw new Error("WEBFLOW_TOKEN is not set in the environment variables.");
}

const COLLECTIONS = {
  REGIONS: '687dc14884283bfc8c96913d',
  WATERFALLS: '687dc11e5481701f6e793932',
  STATES: '687f3675cab304244a0aef19',
  COUNTRIES: '68806af82feb7eaaf73f18fe',
};

const webflowClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `https://api.webflow.com/v2${endpoint}`;
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${WEBFLOW_TOKEN}`,
      "accept-version": "1.0.0",
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Webflow API error: ${response.statusText} - ${errorText}`);
    }

    return response.json();
  },

  async getCollectionItem(collectionId: string, itemId: string) {
    const response = await this.request(`/collections/${collectionId}/items/${itemId}`);
    return response.items?.[0];
  },

  async listCollectionItems(collectionId: string, params: Record<string, any> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/collections/${collectionId}/items` + (queryString ? `?${queryString}` : '');
    return this.request(endpoint);
  }
};

export { webflowClient, COLLECTIONS };
