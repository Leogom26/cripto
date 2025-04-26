import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CoinProps } from '../home'

import styles from './detail.module.css'

export function Detail() {
  const { cripto } = useParams();
  const navigate = useNavigate();

  const [coin, setCoin] = useState<CoinProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCoin() {
      try {
        const response = await fetch(`https://rest.coincap.io/v3/assets/${cripto}?apiKey=474de8a719cb1410fc2716baebf76ccdf2d075ae541003dd285bd5bc61d3306f`);

        if (!response.ok) {
          console.error('Moeda não encontrada ou erro na API');
          navigate('/');
          return;
        }

        const result = await response.json();
        console.log("Resposta da API:", result);

        if (!result || !result.data || !result.data.id) {
          console.error('Dados ausentes ou inválidos');
          navigate('/');
          return;
        }

        const coinData = result.data;

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        });

        const priceCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact"
        });

        const resultData = {
          ...coinData,
          formatedPrice: price.format(Number(coinData.priceUsd)),
          formatedMarket: priceCompact.format(Number(coinData.marketCapUsd)),
          formatedVolume: priceCompact.format(Number(coinData.volumeUsd24Hr))
        };

        setCoin(resultData);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados da moeda:", err);
        navigate('/');
      }
    }

    getCoin();
  }, [cripto, navigate]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando detalhes...</h4>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Moeda não encontrada.</h4>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coin.name}</h1>
      <h1 className={styles.center}>{coin.symbol}</h1>

      <section className={styles.content}>
        <img
          src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
          alt={`Logo da moeda ${coin.name}`}
          className={styles.logo}
        />

        <h1>{coin.name} | {coin.symbol}</h1>
        <p><strong>Preço: </strong>{coin.formatedPrice}</p>
        <a><strong>Mercado: </strong>{coin.formatedMarket}</a>
        <a><strong>Volume: </strong>{coin.formatedVolume}</a>
        <a>
          <strong>Mudança 24h: </strong>
          <span className={Number(coin.changePercent24Hr) > 0 ? styles.protift : styles.loss}>
            {Number(coin.changePercent24Hr).toFixed(3)}%
          </span>
        </a>
      </section>
    </div>
  );
}
