const API_URL = "https://api.apify.com/v2/actors/nomad-agent~buyrentkenya-scraper/runs/last/dataset/items";
const API_TOKEN = import.meta.env.VITE_APIFY_TOKEN; 

export async function fetchProperties(){
    const response = await fetch(
        `${API_URL}?token=${API_TOKEN}&limit=40`
    );
    if (!response.ok){
        throw new Error("Failed to fetch properties");
    }
    return response.json();
}