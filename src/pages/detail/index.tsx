import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function Detail() {
  const { cripto } = useParams();
  const navigate = useNavigate();

  useEffect (() => {
    async function getCoin() {
      try{
        fetch(`https://rest.coincap.io/v3/assets?${cripto}&apiKey=474de8a719cb1410fc2716baebf76ccdf2d075ae541003dd285bd5bc61d3306f`)
        .then(response => response.json())
        .then((data) => {
          console.log(data)
        })

        console.log(cripto)

      } catch(err){
        console.log(err);
        navigate('/')
      }
    }

    getCoin();

  }, [cripto])
  return (
    <div>
      <h1>Página Detalhe da moeda</h1>
    </div>
  )
}