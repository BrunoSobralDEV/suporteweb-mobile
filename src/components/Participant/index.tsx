import { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
  name: string;
  onRemove: () => void;
  icon: ReactNode;
  date?: string;
}

export function Participant({ name, onRemove, icon, date }: Props) {
  return (
  <View style={styles.container}>
    <View style={styles.divColumn}>
      <Text style={styles.name}> {name} </Text>
      <Text style={styles.date}> Data Bloqueio: {date} </Text>
    </View>

    <TouchableOpacity style={styles.button} onPress={onRemove}>
      <Text style={styles.buttonText}> {icon} </Text>
    </TouchableOpacity>
  </View>
)
}