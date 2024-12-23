import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Список идентификаторов токенов
  const tokenIds = `
    ai16z,fartcoin,grass,goatseus-maximus,io-net,act-i-the-ai-prophecy,zerebro,
    nosana,griffain,tars-protocol,ai-rig-complex,eliza,alchemist-ai,memes-ai,
    degen-spartan-ai,dasha,dolos-the-bully,kween,orbit-2,fxn,top-hat,shoggoth,
    agenttank,deep-worm,big-pharmai,bongo-cat,numogram,ava-ai,opus-2,obot,
    project89,chaos-and-disorder,meow-2,koala-ai,kitten-haimer,pippin,max-2,
    aimonica-brands,autonomous-virtual-beings,forest,solaris-ai,synesis-one,
    moe-4,universal-basic-compute,mizuki,naitzsche,slopfather,the-lokie-cabal,
    tensor,arok-vc,aiwithdaddyissues,bloomsperg-terminal,omega-2,thales-ai,
    keke-terminal,horny,quasar-2,ropirito,kolin,kwantxbt,dither,duck-ai,
    centience,iq6900,darksun,weird-medieval-memes,yousim,sensus,ocada-ai,
    singularry,naval-ai,kira-2,kirakuru,brot,effective-accelerationism,
    cheshire-grin,limbo,size,neroboss,gmika,kira-3,convo,sqrfund,ugly-dog,
    gemxbt,roastmaster9000,nova-on-mars,sendor,flowerai,dojo-protocol,
    internosaur,devin,lea-ai,rex-3,aletheia,mona-arcane,apicoin,cyphomancer,
    lucy-ai,agent-rogue
  `.replace(/\s/g, ""); // Убираем лишние пробелы

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: tokenIds, // Список токенов
              vs_currencies: "usd", // Валюта: USD
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
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

