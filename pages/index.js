import axios from 'axios';
import { useState, useEffect } from 'react';

const fetchCoinPrices = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
    console.log(response.data); // Выводим данные
    return response.data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return null;
  }
};

const CoinCard = ({ name, price, symbol, imageUrl }) => (
  <div className="coin-card bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-transform transform hover:scale-105">
    <img src={imageUrl} alt={name} className="w-16 h-16 mb-4 mx-auto" />
    <h3 className="text-xl font-semibold text-white text-center">{name} ({symbol})</h3>
    <p className="text-lg text-white text-center mt-2">Price: ${price}</p>
  </div>
);

const CoinList = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const getCoinData = async () => {
      const data = await fetchCoinPrices();
      if (data) {
        // Добавляем изображения для каждой монеты
        const coinDetails = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            ids: 'bitcoin,ethereum,solana',
            vs_currency: 'usd',
          },
        });

        const coinsWithImages = Object.keys(data).map((key) => {
          const coin = coinDetails.data.find((c) => c.id === key);
          return {
            name: coin.name,
            symbol: coin.symbol,
            price: data[key].usd,
            imageUrl: coin.image,
          };
        });

        setCoins(coinsWithImages);
      }
    };

    getCoinData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <header className="text-center py-6">
        <h1 className="text-5xl font-extrabold">Crypto Token Prices</h1>
        <p className="text-lg mt-2 opacity-75">Updated in real-time</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 pb-10">
        {coins.length === 0 ? (
          <p className="text-center text-lg animate-pulse">Loading prices...</p>
        ) : (
          coins.map((coin) => (
            <CoinCard
              key={coin.symbol}
              name={coin.name}
              price={coin.price}
              symbol={coin.symbol}
              imageUrl={coin.imageUrl}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CoinList;
