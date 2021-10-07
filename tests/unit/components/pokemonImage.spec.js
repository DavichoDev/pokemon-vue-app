import { shallowMount } from '@vue/test-utils'
import PokemonImage from '@/components/PokemonImage'

describe('PokemonPicture Component', () => {

    test('Debe de hacer match con el snapshot', () => {
        const wrapper = shallowMount( PokemonImage, {
            props:{
                pokemonId: 1,
                showPokemon: false
            }
        } )

        expect( wrapper.html() ).toMatchSnapshot()

    })
    
    test('Debe de mostrar la imagen oculta y el pokemon 100', () => {

        const wrapper = shallowMount( PokemonImage, {
            props: {
                pokemonId: 100,
                showPokemon: false
            }
        } )

        const [imgHiddenPokemon, imgShowPokemon] = wrapper.findAll('img')

        expect( imgHiddenPokemon.attributes('src') )
            .toBe( wrapper.vm.imgSrc )
        expect( imgHiddenPokemon.exists() )
            .toBeTruthy()
        expect( imgShowPokemon )
            .toBeUndefined()
        expect( imgHiddenPokemon.classes('hidden-pokemon') )
            .toBeTruthy()
        
    })

    test('Debe de mostrar el pokemon si showPokemon: true', () => {

        const wrapper = shallowMount( PokemonImage, {
            props: {
                pokemonId: 100,
                showPokemon: true
            }
        })

        const imgShowPokemon = wrapper.find('img')

        expect( imgShowPokemon.exists() ).toBeTruthy()
        expect( imgShowPokemon.classes('hidden-pokemon') ).toBe(false)
        expect( imgShowPokemon.classes('fade-in') ).toBe(true)
    })

})