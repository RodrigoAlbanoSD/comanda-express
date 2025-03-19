
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import styles from "../../styles/styles.js";
import * as React from 'react';
import Input from './Inputs/Input';
import { useState } from "react";

/*
onActive={activeIndex}
onClick={setActiveIndex}
addProduct={addProductHandler}
onButtonClick={setActiveIndex}
*/
const FormAddProduct = (props) => {
  let isActive = props.onActive;
  if (isActive !== 9) return;
  //inputValues State set for every input values in the form
  const [inputValues, setInputValues] = useState({
    name: '',
    desc: '',
  });
  //function to replace old value for new one after a change
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  //Function to handle the form submissions
  //in:client object
  const onSubmit = () => {
    //Validate inputs
    if (inputValues.name === "")  {
      Alert.alert("Entrada vazia", "Os campos do Nome e obrigatorios");
      //break submit
      return;
    }
    let key = true;
    let productList = props.productList;
    for(let i = 0; i <productList?.length; i++){
      if(props.productList[i]?.name === inputValues.name) {
      Alert.alert("Erro", "Este nome já existe");
      //break submit
      key = false;
      }
    }
    if(key){
    //Build client
    props.addProduct(inputValues);
    //Reset inputs
    handleCancel();      
    }

  }
  //Function to handle the Cancel button 
  //it erases the input fields
  //and set the active component to Clients menu.
  function handleCancel() {
    //Reset Inputs
    inputValues.name = '';
    inputValues.desc = '';
    //Set active index
    props.onClick(8);
  };
  return (
    <>
      {/*view form. Englobes all */}
      <View style={styles.form}>
        <Text style={styles.title}>Adicionar produto</Text>
        {/*each field has its own view row  */}
        <View style={styles.formRow}>
          <Input
            label="Nome"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'name'),
              value: inputValues.name,
              maxLength: 25,
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Input
            label="Descrição"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'desc'),
              value: inputValues.desc,
              multiline:true,
              maxLength: 150,
              numberOfLines:4,
              placeholder: "Insira alguma descrição sobre este produto"
            }}
          />
        </View>
        
        <View style={styles.formButtons}>
          <TouchableOpacity
            style={styles.btnForm}
            onPress={handleCancel}
          >
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnForm}
            onPress={onSubmit}
          >
            <Text style={styles.btnText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
}

export default FormAddProduct;
