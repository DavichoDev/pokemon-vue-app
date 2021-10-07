import pokemonApi from '@/api/pokemonApi'

export const getPokemons = () => {
    // Array.from crea una arreglo basado en el de 650 posiciones.
    const pokemonsArr = Array.from( Array(650) )
    return pokemonsArr.map( ( _ , index ) => index + 1 )
}

export const getPokemonNames = async ( [a,b,c,d] = [] ) => {
    
    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`),
    ]

    const [pkmna, pkmnb, pkmnc, pkmnd] = await Promise.all( promiseArr )

    return [
        {name: pkmna.data.name, id: pkmna.data.id},
        {name: pkmnb.data.name, id: pkmnb.data.id},
        {name: pkmnc.data.name, id: pkmnc.data.id},
        {name: pkmnd.data.name, id: pkmnd.data.id},
    ]

}

export const getPokemonOptions = async () => {
    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 )
    const pokemons = await getPokemonNames( mixedPokemons.splice(0,4) )
    return pokemons
}



export default getPokemonOptions