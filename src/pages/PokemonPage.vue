<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>

  <div v-else>

    <h1>¿Quién es este pokémon?</h1>

    <PokemonImage 
      :pokemonId="pokemon.id" 
      :showPokemon="showPokemon" />

    <PokemonOptions 
      :pokemons="pokemonArr" 
      @selected-pokemon="checkAnswer"
    />

    <template v-if="message"
         class="fade-in">
      <h2>{{ message }}</h2>
      <button @click="newGame">Nuevo juego</button>
    </template>


  </div>

</template>

<script>

import PokemonImage from '@/components/PokemonImage.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
  components: {
    PokemonImage,
    PokemonOptions
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      message: null
    }
  },
  methods: {
    async mixedPokemonArray() {

      this.pokemonArr = await getPokemonOptions()
      
      const rndInt = Math.floor( Math.random() * 4 )

      this.pokemon = this.pokemonArr[ rndInt ]

    },
    checkAnswer( selectedId ) {

      if (selectedId === this.pokemon.id) {
        this.message = `Correcto, ${ this.pokemon.name }`
      } else { 
        this.message = `Oops, era ${ this.pokemon.name }`
      }

      this.showPokemon = true

    },
    newGame() {

      this.message = null
      this.showPokemon = false,
      this.pokemon = null
      this.pokemonArr = []
      this.mixedPokemonArray()

    }
  },
  mounted() {
    this.mixedPokemonArray()
  },
}
</script>

<style>

</style>