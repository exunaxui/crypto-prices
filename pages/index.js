import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

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
  `.replace(/\s/g, "");

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: tokenIds,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <header className="text-center py-6">
        <h1 className="text-5xl font-extrabold">Crypto Token Prices</h1>
        <p className="text-lg mt-2 opacity-75">Updated in real-time</p>
      </header>
      {loading ? (
        <p className="text-center mt-20 text-lg animate-pulse">Loading prices...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 pb-10">
          {Object.entries(coins).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition hover:scale-105"
            >
              <h2 className="text-xl font-semibold mb-2">{key.toUpperCase()}</h2>
              <p className="text-lg">
                Price: <span className="text-green-400">${value.usd.toFixed(2)}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

