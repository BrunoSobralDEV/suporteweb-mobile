import { StyleSheet } from "react-native";
import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { StorageAccessFramework } from 'expo-file-system';


export function DownTxt() {
  async function handleCreateFiletxt() {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      const uri = permissions.directoryUri;
      const files = await StorageAccessFramework.readDirectoryAsync(uri);
      console.log('===>',files);
    }
    
    console.log("Criando arquivo txt")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta-feira, 04 de Novembro de 2022</Text>

      <TouchableOpacity 
          style={styles.button}
          onPress={handleCreateFiletxt}
        >
          <Text style={styles.buttonText}>
            Txt
          </Text>
        </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#131016',
    padding: 24
  },
  eventName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 48
  },
  eventDate: {
    color: '#6B6B6B',
    fontSize: 16,
  },
  form: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 36,
    marginBottom: 42
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: '#1F1E25',
    borderRadius: 5,
    color: '#FFF',
    padding: 16,
    fontSize: 16,
    marginRight: 12
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: '#31CF67',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24
  },
  listEmptyText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center'
  }
})