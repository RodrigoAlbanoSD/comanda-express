import { TouchableOpacity, Text, View, Alert } from 'react-native';
import styles from "../../styles/styles.js";
import * as React from 'react';
import Input from './Inputs/Input';
import { useState, useEffect } from "react";
/*
client={activeClient}
editClient={EditClientHandler}
onClick={setActiveIndex}
deleteClient={DeleteClient}
*/
const FormEditClient = (props) => {

  //Client order owner
  //inputValues set state for every input values in the form
  const [inputValues, setInputValues] = useState(props.client);
  useEffect(() => {
    setInputValues(props.client);
  }, [props.client])

  //Brakes the component if is not active
  let isActive = props.onActive;
  if (isActive !== 4) return;

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
    if ((inputValues.name === "") || (inputValues.email === "") || (inputValues.address === "")) {
      Alert.alert("Erro", "Os campos do Nome, Email e endereço sao obrigatorios");
      //break submit
      return;
    };
    if (!(inputValues.email.includes("@") && inputValues.email.includes("mail") && inputValues.email.includes(".com"))) {
      Alert.alert("Erro", "Há algum erro no campo do email. Por favor verifique e tente novamente.");
      //break submit
      return;
    };

    let tel = inputValues.tel.replace(/[().-\s]/g, '');
    if ((typeof tel !== 'number' && isNaN(tel))) {
      Alert.alert("Erro", "Um numero de contato é obrigatorio");
      //break submit
      return;
    };
    tel = parseInt(tel);
    if (tel < 100000000) {
      Alert.alert("Erro", "Parece que esta faltando algum numero");
      //break submit
      return;
    };


    //Edit client
    props.editClient(inputValues);
    //Reset inputs
    handleCancel();

  };

  //Function to handle the Cancel button 
  //it erases the input fields
  //and set the active component to Clients menu.
  function handleCancel() {
    //reset inputValues values
    inputValues.name = '';
    inputValues.email = '';
    inputValues.address = '';
    inputValues.tel = '';
    inputValues.note = '';

    //Get back to clients page
    props.onClick(1);
  };

  //Function to handle the Delete button
  function handleDelete() {
    Alert.alert(
      //This is title
      "Deletar cliente",
      //This is body text
      "Deseja deletar " + props.client.name + "?",
      [
        { text: 'Sim', onPress: () => props.deleteClient(props.client.email) },
        { text: 'Nao', style: 'cancel' },
      ],
      //on clicking out side, Alert will not dismiss
    );
    //Get back to clients page
    props.onClick(1);
  };
  return (
    <>
      {/*view form. Englobes all */}
      <View style={styles.form} key={"Form" + props.client}>
        {/*each field has its own view row  */}
        <Text style={styles.header}>Edicao do cliente {props.client.name}</Text>
        <View style={[styles.formRow, { gap: "3%" }]}>
          <Input
            style={{flex:1 }}
            label="Nome"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'name'),
              value: inputValues.name,
              maxLength: 20,
            }}
          />
          <Input
            style={{flex:1 }}
            label="Contato"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'tel'),
              value: inputValues.tel,
              KeyboardType: "phone-pad",
              maxLength: 20,
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Input
            label="Email"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'email'),
              value: inputValues.email,
              keyboardType: 'email-address'
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Input
            label="Endereco"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'address'),
              value: inputValues.address,
              multiline: true,
              maxLength: 90,
              numberOfLines:2,
            }}
          />
        </View>

        <View style={styles.formRow}>
          <Input
            style={styles.inputs}
            label="Notas"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'notes'),
              value: inputValues.notes,
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

export default FormEditClient;
