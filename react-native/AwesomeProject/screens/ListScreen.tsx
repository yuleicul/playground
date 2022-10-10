import React, { useCallback } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native'

const ListScreen = ({ navigation }) => {
  const handlePress = useCallback(() => {
    console.log('press')
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity className="border m-2 p-2" onPress={handlePress}>
          <Text className="text-base">Habit one</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border">
          <Text>Habit one</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border">
          <Text>Habit one</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ListScreen
