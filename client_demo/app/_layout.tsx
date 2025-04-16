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

// side packages
import { Picker } from '@react-native-picker/picker';

// const mockData = Array.from({ length: 20 }, (_, i) => ({
//   id: `${i}`,
//   name: `Элемент ${i + 1}`,
//   value: Math.floor(Math.random() * 100),
// }));

const inputParameters = [
  {
    id: "Gender",
    type: "dropdown",
    label: "Gender",
    possibleValues: ["Male", "Female"],
    value: "Male",
  },
  {
    id: "Age",
    type: "input",
    label: "Age",
    value: '',
  },
  {
    id: "Driving_License",
    type: "dropdown",
    label: "Driving license",
    possibleValues: ["Yes", "No"],
    value: "Yes",
  },

  {
    id: "Region_Code",
    type: "input",
    label: "Region code",
    value: '',
  },

  {
    id: "Previously_Insured",
    type: "dropdown",
    label: "Previously Insured",
    possibleValues: ["Yes", "No"],
    value: "Yes",
  },

  {
    id: "Vehicle_Age",
    type: "dropdown",
    label: "Vehicle Age",
    possibleValues: ["1-2 Year", "< 1 Year", "> 2 Years"],
    value: "< 1 Year",
  },
  {
    id: "Vehicle_Damage",
    type: "dropdown",
    label: "Vehicle Damage",
    possibleValues: ["Yes", "No"],
    value: "Yes",
  },

  {
    id: "Annual_Premium",
    type: "input",
    label: "Annual Premium",
    value: '',
  },
  {
    id: "Policy_Sales_Channel",
    type: "input",
    label: "Policy Sales Channel",
    value: '',
  },
  {
    id: "Vintage",
    type: "input",
    label: "Vintage",
    value: '',
  },
];

export default function App() {
  const [fields, setFields] = useState(inputParameters);

  const handleChange = (text, id) => {
    setFields((prev) =>
      prev.map((field, index) => (index === id ? { ...field, value: text } : field))
    );
  };

  const [selectedOption, setSelectedOption] = useState('option1');

  const [data, setData] = useState([]);//mockData);

  const handlePress = () => {
    let dataToSend = fields.reduce((acc, elem) => {
      acc[elem.id] = (elem.type == "input") ? parseInt(elem.value) : elem.value;
      return acc
    }, {}); 

    // fetch("http://host.docker.internal:8000/predict", {
    fetch("http://localhost:8000/predict", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(response => {
      console.log(data)
      if (response.status == "ok") {
        let dataToDisplay = fields.reduce((acc, elem) => {
          acc[elem.id] = (elem.type == "input") ? parseInt(elem.value) : elem.value;
          return acc
        }, {}); 
        const newItem = {
          id: Date.now().toString(),
          name: Object.entries(dataToDisplay)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n'),
          value: response.prediction,
        };
        setData([newItem, ...data]);
      }

    })
    .catch(error => console.error(error));
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


        {fields.map((field, index) => (
        
          (field.type  == "input") ? <View key={index} style={styles.inputContainer}>
            <Text style={styles.inputLabelContainer}>{field.label}</Text>
              <View style={styles.uniformInputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Введите число"
                value={field.value}
                onChangeText={(text)=>handleChange(text.replace(/[^0-9]/g, ''), index)}//{setText}
              />
            </View> 
          </View> : <View key={index} style={styles.inputContainer}>
            <Text style={styles.inputLabelContainer}>{field.label}</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={field.value}
                onValueChange={(itemValue) => handleChange(itemValue, index)}
                style={styles.picker}
              >
                {field.possibleValues.map((option, index) => (<Picker.Item label={option} value={option} />))}
                
              </Picker>
            </View>
          </View>
      ))}


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
    padding: "5%",
    // padding: 50,
  },
  inputContainer : {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 20,
    width:"100%",
  },
  inputLabelContainer: {
    width: 300,
    height:"100%",
    padding: 15,
    // padding: 10,
    // fontSize: 20,
  },

  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  rightPanel: {
    flex: 1,
    // padding: 50,
    padding: "5%",
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
  // pickerWrapper: {
  //   width: 275,
  //   // borderWidth: 1,
  //   // borderColor: '#000',
  //   borderRadius: 10,
  //   marginBottom: 20,
  //   // overflow: 'hidden',
  // },
  // picker: {
  //   width: '100%',
  //   height: 50,
  //   borderColor: "#000",
  //   borderRadius: 8,
  //   boxShadow: "none",
  //   // border
  //   // color: 'fff',
  //   // color: '#007AFF',
  //   backgroundColor: '#fff',
  // },
  // input: {
  //   width: 500,
  //   height: 50,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   padding: 10,
  //   marginBottom: 20,
  //   borderRadius: 10,
  // },
  // pickerWrapper: {
  //   width: 500,
  //   height: 50,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 10,
  //   marginBottom: 20,
  //   justifyContent: 'center',
  // },
  // picker: {
  //   width: '100%',
  //   height: '100%',
  // },
  uniformInputWrapper: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    // marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000', 
  },
  picker: {
    // width: "100%",
    width: 200,
    height:"100%",
    borderRadius:10,
    color: '#000',
    
    backgroundColor: '#fff',
    // flex: 1,
  },
});