import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function App() {

  const [pokemon, setPokemon] = useState('Nenhum Pokémon carregado');
  const [imagem, setImagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function buscarPokemon() {
    try {
      setCarregando(true);

      const idAleatorio = Math.floor(Math.random() * 1025) + 1;

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${idAleatorio}`
      );

      const dados = await response.json();

      setPokemon(dados.name);
      setImagem(dados.sprites.front_default);

      setCarregando(false);

    } catch (erro) {
      console.error('Erro:', erro);
    }
  }

  async function buscarPokemonAxios() {
    try {

      const idAleatorio = Math.floor(Math.random() * 151) + 1;

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idAleatorio}`
      );

      setPokemon(response.data.name);
      setImagem(response.data.sprites.front_default);

    } catch (erro) {
      console.error('Erro:', erro);
    }
  }

  function mostrarConteudo(){
    if(carregando){
      return <ActivityIndicator size="large"/>
    }
    else{
      return (
      <>
        <Text style={styles.marginBottom10}>{pokemon}</Text>

        {imagem !== '' && (
          <Image
            source={{ uri: imagem }}
            style={styles.imagem}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={buscarPokemon}>
          <Text style={styles.buttonText}>
              Buscar Pokémon
          </Text>
        </TouchableOpacity>
      </>
      )
    }
  }

  return (
    <View style={styles.container}>
      {mostrarConteudo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button: {
    backgroundColor: 'blue',
    width: '50%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: 'white'
  },
  marginBottom10: {
    marginBottom: 10,
    fontSize: 20,
    textTransform: 'capitalize'
  },
  imagem: {
    width: 120,
    height: 120,
    marginBottom: 10
  }
});