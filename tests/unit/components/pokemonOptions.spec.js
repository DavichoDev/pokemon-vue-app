import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions'
import { pokemonsMock } from '../mocks/pokemons.mock'

describe('PokemonOptions Component', () => {
    
    let wrapper

      beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons: pokemonsMock 
            }
        })
      })

    test('Debe de hacer match con el Snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de mostrar las 4 opciones correctamente', () => {

        const liPokemons = wrapper.findAll('li')
        const pokemons = liPokemons.map( ( pokemon, index ) => 
        (
            {
                name: pokemon.text(),
                id: index + 1
            }
        ))
        
        expect( pokemons.length ).toBe(4)
        expect( pokemons ).toEqual( pokemonsMock )

    })

    test('Debe de emitir "selectedPokemon" con sus respectivos parametros al hacer click', () => {

        const [li1, li2, li3, li4] = wrapper.findAll('li')

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')

        expect( wrapper.emitted('selectedPokemon').length ).toBe(4)
        expect( wrapper.emitted('selectedPokemon')[0] ).toEqual([1])
        expect( wrapper.emitted('selectedPokemon')[1] ).toEqual([2])
        expect( wrapper.emitted('selectedPokemon')[2] ).toEqual([3])
        expect( wrapper.emitted('selectedPokemon')[3] ).toEqual([4])
    })

})