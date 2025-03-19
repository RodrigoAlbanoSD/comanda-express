import { TouchableOpacity, Text, View, Alert } from 'react-native';
import styles from "../../styles/styles.js";
import * as React from 'react';
import Input from './Inputs/Input';
import { useState, useEffect } from "react";
/*
onActive={activeIndex}
onClick={setActiveIndex}
editProduct={EditProductHandler}
deleteProduct={DeleteProductHandler}
productActive={activeProduct}
*/
const FormEditProduct = (props) => {
  

  //Client order owner
  //let client = props.productActive;
  //inputValues set state for every input values in the form
  const [inputValues, setInputValues] = useState(props.productActive);
  useEffect(() => {
    setInputValues(props.productActive);
  }, [props.productActive])

  //function to replace old value for new one after a change
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  //Brakes the component if is not active
  let isActive = props.onActive;
  if (isActive !== 10) return;

  //Function to handle the form submissions
  //in:client object
  const onSubmit = () => {
    let data = inputValues;
    //Validate inputs
    if (data.name === "") {
      Alert.alert("Entrada vazia", "Os campos do Nome, sao obrigatorios");
      //break submit
      return;
    };
    //Edit client
    props.editProduct(inputValues);
    //Reset inputs
    handleCancel();
  };

  //Function to handle the Cancel button 
  //it erases the input fields
  //and set the active component to Clients menu.
  function handleCancel() {
    //reset inputValues values
    inputValues.name = '';
    inputValues.desc = '';

    //Get back to clients page
    props.onClick(8);
  };

  //Function to handle the Delete button
  function handleDelete() {
    let data = props.productActive;
    Alert.alert(
      //This is title
      "Deletar produto",
      //This is body text
      "Deseja deletar " + data.name + "?",
      [
        { text: 'Sim', onPress: () => props.deleteProduct(props.productActive.id) },
        { text: 'Nao', style: 'cancel' },
      ],
      //on clicking out side, Alert will not dismiss
    );
    //Get back to clients page
    props.onClick(8);
  };
  return (
    <>
      {/*view form. Englobes all */}
      <View style={styles.form} key={"Form" + props.productActive}>
        {/*each field has its own view row  */}
        <Text style={styles.header}>Edicao do produto {props.productActive.name}</Text>
        <View style={styles.formRow}>
          <Input
            label="Nome"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'name'),
              value: inputValues.name,
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Input
            label="Descrição"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'desc'),
              value: inputValues.desc,
              multiline: true,
              maxLength: 150,
              numberOfLines:4,
            }}
          />
        </View>

        <View style={styles.formButtons}>
          <TouchableOpacity
            style={styles.btnForm}
            onPress={handleDelete}
          >
            <Text style={styles.btnText}>Deletar</Text>
          </TouchableOpacity>
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
            <Text style={styles.btnText}>Editar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
}

export default FormEditProduct;
