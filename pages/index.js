import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "bitcoin,ethereum,solana", // Список монет
              vs_currencies: "usd",
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center my-8">Цены на криптовалюты</h1>
      {loading ? (
        <p className="text-center">Загрузка...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {Object.entries(coins).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{key.toUpperCase()}</h2>
              <p className="text-lg">Цена: ${value.usd.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
