import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList, Alert, Keyboard } from "react-native";
import { CloseIcon, DeleteIcon, SearchIcon, useToast } from 'native-base';

import { convertDateToString } from '../../lib/converDates';
import { api } from '../../lib/api';

import { ClientsProps, SearchClients } from '../../components/SearchClients';
import { Participant } from "../../components/Participant";
import { Loading } from '../../components/Loading';

import { styles } from "./styles";

interface ClientProps {
  serie: string;
  dataBloqueio: string;
  seraBloqueado: string;
  msgParaUsuario: string;
  usuarioResponsavel: string;
}

interface ClientDbfProps {
  serie: string;
  nomcli: string;
  dataBloqueio: string;
}

export function Home() {
  const [filterClients, setFilterClients] = useState<ClientsProps[]>([]);
  const [allClients, setAllClients] = useState<ClientsProps[]>([]);
  const [txtClients, setTxtClients] = useState<ClientDbfProps[]>([]);
  const [searchClient, setSearchClient] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastChange, setLastChange] = useState('');
  const [fileName, setFileName] = useState('');

  const toast = useToast();
  
  const textToday = 'Sexta-feira, 19 de Agosto de 2022'
  const today = new Date().toLocaleDateString('pt-BR',{ dateStyle: 'full' } )

  function formatDate(string: string){
    return string.substring(0,2)+'/'+string.substring(2,4)+'/20'+string.substring(4,6)
  }

  function getAllClientsBySearchComponent(childData: any){
    setAllClients(childData)
    setFilterClients(childData)
  }

  function handleButtonSearch() {
    Keyboard.dismiss();
    setSearchActive(false);
    setIsLoading(true);
    setSearchClient('');
  }

  function handlePartipantRemove(serie: string, name: string) {
    Alert.alert('Desbloquear', `Deseja desbloquear ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setIsLoading(true)
          api.post('/desbloquear-cliente', {serie})
          .then(function (response) {
            setIsLoading(true)
            toast.show({
              title: 'Cliente desbloqueado com sucesso!',
              placement: 'top',
              bgColor: 'green.500'
            })
          })
          .catch(error => toast.show({
            title: `Erro! Tente mais tarde.${error}`,
            placement: 'top',
            bgColor: 'red.500'
          }))
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }
  
  const searchFilter = (text: string) => {
    if (text) {
      const newData = allClients.filter(client => {
        const clientData = client.nomcli ? client.nomcli.toUpperCase()
                                    : ''.toUpperCase();
        const textData = text.toUpperCase();
        return clientData.indexOf(textData) > -1;
      });
      
      setFilterClients(newData)
      setSearchClient(text)
    } else {
      setFilterClients(filterClients)
      setSearchClient(text)
    }
  }

  const fetchTxtClientList = () => {
    api.get('/dbf-e-txt')
      .then(response => {
        setTxtClients(response.data)
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const fetchAllClientList = () => {
    api.get('lista-de-clientes')
      .then(response => {
        setAllClients(response.data)})
      .then(() => getAllClientsBySearchComponent(allClients))
      .catch(error => console.log(error.message))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    api.get('/dbf-e-txt')
      .then(response => {
        setTxtClients(response.data.data);
        setLastChange(response.data.at_update);
        setFileName(response.data.fileName);
      })
      .catch(error => {
        console.log(error)
        alert(error.message == 'Request failed with status code 500'?
          'Sem resposta do servidor':
          error.message == 'timeout of 30000ms exceeded'?'Sem resposta do servidor, tente mais tarde.':error.message)
      })
      .finally(() => setIsLoading(false))
  },[isLoading])

  return (
    <View style={styles.container}>
      <Text style={searchActive ? styles.displayNone : styles.eventName}>Clientes Bloqueados</Text>
      <Text style={searchActive ? styles.displayNone : styles.eventDate}>
        Última atualização {!lastChange?'Carregando...':convertDateToString(new Date(lastChange))}. 
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={searchActive ? styles.inputActive : styles.input}
          placeholder='Nome do cliente'
          placeholderTextColor='#6B6B6B'
          value={searchClient}
          onChangeText={(text) => searchFilter(text)}
          onPressIn={() => setSearchActive(true)}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleButtonSearch}
        >
          <Text style={styles.buttonText}>
            {searchActive ? 'x' : <SearchIcon size={6} color='black' />}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{color: 'white', marginBottom: 5}}>Arquivo txt: {!fileName?'Carregando...':fileName} Versão 1.2</Text>
      {
        searchActive 
        ? <SearchClients filterClients={filterClients} clientName={searchClient} setSearchActive={setSearchActive} getAllClientsBySearchComponent={getAllClientsBySearchComponent}/>
        : isLoading ? <Loading/> : <FlatList 
          data={txtClients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Participant 
              key={item.serie}
              name={item.nomcli} 
              date={formatDate(item.dataBloqueio)}
              onRemove={() => handlePartipantRemove(item.serie, item.nomcli)}
              icon={<DeleteIcon size={6} color='white'/>}
            />
          )}    
          showsVerticalScrollIndicator={false}   
          ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>
              Não existe clientes bloqueados.
            </Text>
          )} 
          />
      }
      
    </View>
  )
}