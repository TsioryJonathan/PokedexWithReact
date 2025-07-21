import assets from '@/assets/assets'
import React from 'react'

function PokeBallLogo({className}) {
  return (
    <img src={assets.pokeball} alt="Pokeball" className={className} />
  )
}

export default PokeBallLogo