import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemonsMock } from '../mocks/pokemons.mock'
// Componentes
import PokemonImage from '@/components/PokemonImage.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

describe('PokemonPage Component', () => {

    let wrapper

    beforeEach(() => {
      wrapper = shallowMount( PokemonPage )

      jest.clearAllMocks()
    })

    test('Debe hacer match con el Snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })
    
    test('Debe de llamar mixedPokemonArray al montar', () => {
        const mixedPokemonArray = jest.spyOn( PokemonPage.methods, 'mixedPokemonArray' )
        const wrapper = shallowMount( PokemonPage )

        expect( mixedPokemonArray ).toHaveBeenCalled()
    })

    test('Debe de hacer match con el snapshot cuando cargan los pokemon', () => {

      const wrapper = shallowMount( PokemonPage, {
        data() {
          return {
            pokemonArr: pokemonsMock,
            pokemon: pokemonsMock[0],
            showPokemon: false,
            message: null
          } 
        }
      })

      expect( wrapper.html() ).toMatchSnapshot( )

    })

    test('Debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
      
      const wrapper = mount( PokemonPage, {
        data() {
          return {
            pokemonArr: pokemonsMock,
            pokemon: pokemonsMock[0],
            showPokemon: true,
            meesage: null
          }
        }
      })
      const pokemonImage = wrapper.findComponent(PokemonImage)
      const pokemonOptions = wrapper.findComponent(PokemonOptions)

      expect( pokemonImage.exists() ).toBeTruthy()
      expect( pokemonOptions.exists() ).toBeTruthy()
      expect( pokemonImage.props('pokemonId') ).toBe(1)
      expect( pokemonOptions.props('pokemons') ).toBeTruthy()

    })

    test('Prubas con checkAnswer', async() => {
      const wrapper = shallowMount( PokemonPage, {
        data() {
          return {
            pokemonArr: pokemonsMock,
            pokemon: pokemonsMock[0],
            showPokemon: false,
            meesage: null
          }
        }
      })

      
      // Pokemon correcto
      await wrapper.vm.checkAnswer(1)
      expect( wrapper.find('h2').text() ).toBe(`Correcto, ${ pokemonsMock[0].name }`)
      expect( wrapper.vm.message ).toBe(`Correcto, ${ pokemonsMock[0].name }`)

      // Revisa si el pokemon es visible
      expect( wrapper.vm.showPokemon ).toBeTruthy()
      
      // Revisa si el mensaje es visible
      expect( wrapper.find('h2').exists() ).toBeTruthy()

      // Pokemon incorrecto
      await wrapper.vm.checkAnswer(2)
      expect( wrapper.find('h2').text() ).toBe(`Oops, era ${ pokemonsMock[0].name }`)
      expect( wrapper.vm.message ).toBe(`Oops, era ${ pokemonsMock[0].name }`)
      
    })

})