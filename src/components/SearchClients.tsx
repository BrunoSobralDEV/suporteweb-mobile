import { useState, useEffect } from 'react'
import { Alert } from "react-native";
import { FlatList, Text, VStack, DeleteIcon, useToast } from "native-base";

import { api } from '../lib/api';

import { ClientCard } from './ClientCard';
import { Loading } from './Loading';

export interface ClientsProps {
  serie: string;
  nomcli: string;
  telcli: string;
}
interface Props {
  clientName: string;
  filterClients: ClientsProps[];
  setSearchActive: (arg0: boolean) => void;
  getAllClientsBySearchComponent: (data:ClientsProps[]) => void;
}

export function SearchClients({clientName, filterClients, setSearchActive, getAllClientsBySearchComponent}:Props) {
  const [allClientsChild, setAllClientsChild] = useState<ClientsProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const toast = useToast();

  const fetchAllClientList = () => {
    api.get('/lista-de-clientes')
      .then(response => {
        setAllClientsChild(response.data)
        getAllClientsBySearchComponent(response.data)
      })
      .catch(error => {
        console.log(error.message)
        toast.show({
          title: error.message,
          placement: 'top',
          bgColor: 'red.500'
        })
      })
      .finally(() => setIsLoading(false))
  }
  

  function handleBlockClient(serie: string, name: string) {
    Alert.alert('Bloquear', `Deseja bloquear ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setIsLoading(true)
          api.post('bloquear-cliente', {serie})
            .then(response => {
              toast.show({
                title: 'Cliente Bloqueado com sucesso.',
                placement: 'top',
                bgColor: 'green.500'
              })
              setIsLoading(false)
            })
            .catch(error => {
              toast.show({
                title: 'Erro! Tente mais tarde.',
                placement: 'top',
                bgColor: 'red.500',
              })
              setIsLoading(false)
            })
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }

  useEffect(() => {
    fetchAllClientList()
  },[])

  if(isLoading) return <Loading />
  
  return (
    <VStack flex={1} bgColor='gray.900'>
      <FlatList 
          data={filterClients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ClientCard 
              key={item.serie}
              name={item.nomcli} 
              tel={item.telcli} 
              onPress={() => handleBlockClient(item.serie, item.nomcli)}
            />
          )}    
          showsVerticalScrollIndicator={false}   
          ListEmptyComponent={() => (
            <Text>
              Não existe clientes bloqueados.
            </Text>
          )} 
          />
    </VStack>
  )
}