import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

const mockData = Array.from({ length: 20 }, (_, i) => ({
  id: `${i}`,
  name: `Элемент ${i + 1}`,
  value: Math.floor(Math.random() * 100),
}));

export default function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState(mockData);

  const handlePress = () => {
    const newItem = {
      id: Date.now().toString(),
      name: text || `Новый элемент`,
      value: Math.floor(Math.random() * 100),
    };
    setData([newItem, ...data]);
    setText('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <View style={styles.leftPanel}>
        <TextInput
          style={styles.input}
          placeholder="Введите текст"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Отправить</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightPanel}>
        <View style={styles.headerRow}>
          <Text style={[styles.cell, styles.headerText]}>История запросов</Text>
          <Text style={[styles.cell, styles.headerText]}>Результат</Text>
        </View>

        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  leftPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  rightPanel: {
    flex: 1,
    padding: 100,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  headerText: {
    fontWeight: 'bold',
  },
});