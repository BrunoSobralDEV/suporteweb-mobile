import { useState } from 'react'
import { FlatList, Text, VStack, DeleteIcon, HStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { User, UserCircle } from 'phosphor-react-native';

interface ClientCardProps extends TouchableOpacityProps{
  name: string;
  tel: string;
  onPress: () => void;
}

export function ClientCard({ name, tel, ...rest}: ClientCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
          w="full"
          h={20}
          bgColor="gray.800"
          borderBottomWidth={3}
          borderBottomColor="yellow.500"
          alignItems="center"
          rounded="sm"
          mb={3}
          p={4}
        >
          <User size={32} color='white' style={{marginRight: 10}}/>
        <VStack>
          <Text color="white" fontSize="md" fontFamily="heading">
            {name}
          </Text>

        
          <Text color="gray.200" fontSize="xs">
            {tel}
          </Text>
          </VStack>
      </HStack>
    </TouchableOpacity>
  )
}