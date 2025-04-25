import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function Detail() {
  const { cripto } = useParams();
  const navigate = useNavigate();

  useEffect (() => {
    async function getCoin() {
      try{
        fetch(`https://assets.coincap.io/assets/${cripto}`)
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