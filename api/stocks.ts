const API_KEY = "KKUAWJ0ZZPMC3QGR";

export const fetchStockPrice = async (symbol: string) => {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );

    const data = await res.json();

    console.log("API RESPONSE:", data);

    const price = data?.["Global Quote"]?.["05. price"];

    console.log("PRICE:", price);

    return price ? Number(price) : 0;

  } catch (error) {
    console.log("API ERROR:", error);
    return 0;
  }
};