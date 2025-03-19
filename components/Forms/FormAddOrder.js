
import { TouchableOpacity, Text, View, Alert, TextInput, FlatList, SafeAreaView, SafeAreaProvider } from 'react-native';
import styles from "../../styles/styles.js";
import * as React from 'react';
import Input from './Inputs/Input';
import Dropdown from './Inputs/Dropdown';
import { useState, useEffect } from "react";
import Button from './Inputs/Button.js';

/*
Form to add new order
props:
  client={activeClient}
  addOrder={AddOrderHandler}
  onClick={setActiveIndex}
  clientList={updatedClientsList}
  onSelectedClient={setActiveClient}
*/

const FormAddOrder = (props) => {
  let isActive = props.onActive;
  if (isActive !== 5) return;
  //inputValues set state for every input values in the form
  const [inputValues, setInputValues] = useState({
    client: '',
    deliveryAddress: '',
    product: [''],
    amount: [""],
    price: [""],
    receiveDate: '',
    deliveryDate: '',
    eo: false,
    desc: "",
    addressCheckbox: false,
  });
  const [filterClientList, setFilterClientList] = useState(getClientsList);
  const [filterProductsList, setFilterProductsList] = useState(getProductsList);
  const [productInputNumber, setProductInputNumber] = useState([0]);

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
    //Validation
    if (inputValues.deliveryAddress === "") {
      Alert.alert("Entrada vazia", "O campo do Endereco é obrigatório");
      //break submit
      return;
    }
    let productNameList = [];
    props.products.map((product) => {
      productNameList.push(product.name);
    }
    );
    let goodData = true;
    for (let i = 0; i < inputValues.product.length; i++) {
      if (inputValues.amount[i] <= 0 && (typeof inputValues.amount[i] === 'number' && !isNaN(inputValues.amount[i]))) {
        Alert.alert("Entrada incorreta", "O campo da Quantidade é obrigatório");
        //break submit
        goodData = false;
      }
      if (inputValues.price[i] <= 0 && (typeof inputValues.price[i] === 'number' && !isNaN(inputValues.price[i]))) {
        Alert.alert("Entrada incorreta", "O campo do Preço é obrigatório");
        //break submit
        goodData = false;
      }
      if (!productNameList.includes(inputValues.product[i])) {
        Alert.alert("Produto nao identificado", "O campo do Produto é obrigatório");
        //break submit
        goodData = false;
      }
    };

    if (goodData) {
      //Build Order
      props.addOrder(inputValues);

      //Reset Input
      handleCancel();
    }
  }


  //Function to handle the Cancel button 
  //it erases the input fields
  //and set the active component to Clients menu.
  function handleCancel() {
    //reset inputValues values
    inputValues.deliveryAddress = '';
    inputValues.product = [''];
    inputValues.amount = [""];
    inputValues.price = [""];
    inputValues.receiveDate = '';
    inputValues.deliveryDate = '';
    inputValues.eo = false;
    inputValues.desc = "";
    inputValues.addressCheckbox = false;

    //Get back to clients page
    props.onClick(0);
  };

  //Function to handle the checkboxes values change
  //in: inputvalues property identifier
  const handleEOCheckbox = () => {
    //First change the checkbox value  
    let value = inputValues;
    //Then change its value
    value.eo = inputValues.eo ? false : true;
    //setInputValues(value);
    inputChangedHandler("eo", value.eo);

  }

  //Function to handle the 
  const handleAdressCheckbox = () => {
    //First change the checkbox value
    let value = inputValues;
    value.addressCheckbox = inputValues.addressCheckbox ? false : true;
    inputChangedHandler("addressCheckbox", value.addressCheckbox);

    //Then change its value
    value.deliveryAddress = value.addressCheckbox ? props.client.address : "";
    inputChangedHandler("deliveryAddress", value.deliveryAddress);
  }

  //Function to get all the clients names 
  const getClientsList = () => {
    let newArr = [];
    props.clientList.map((client) => {
      newArr.push(client.name)
    })
    return newArr;
  }

  //Function to filter clients names from value entered 
  const filterClients = value => {
    let newArr = inputValues;
    newArr.client = value;
    setInputValues(newArr);

    //get all client's name
    let clientlist = getClientsList();
    //Filter options based on valued typed
    let filterData = (clientlist && clientlist?.length > 0) ? clientlist.filter(data =>
      data?.toLowerCase()?.includes(value?.toLowerCase()),
    ) : [];
    //if value is empty, filter should be empty
    if (value === "") filterData = [];
    setFilterClientList(filterData);
  };

  //Function to handle when a client name is selected
  const onClientSelected = value => {
    let newArr = inputValues;
    newArr.client = value;
    //update state
    setInputValues(newArr);

    //update active client
    props.onSelectedClient(fetchClientObject(value));
    //Reset filter list
    setFilterClientList([]);
  };

  //Function to fetch the client Object based on the value selected at the client dropbox
  const fetchClientObject = () => {
    let clientList = props.clientList;
    let newObj = {};
    clientList.map((client) => {
      if (client.name === inputValues.client) {
        newObj = client;
      }
    })
    return newObj;
  }

  //Function to get all the clients names 
  const getProductsList = () => {
    let newArr = [];
    props.products.map((product) => {
      newArr.push(product.name)
    })
    return newArr;
  }

  //Function to filter clients names from value entered 
  const filterProducts = (value, index) => {

    let newArr = inputValues;
    newArr.product[index] = value;
    setInputValues(newArr);
    //get all client's name
    let productslist = getProductsList();
    //Filter options based on valued typed
    let filterData = (productslist && productslist?.length > 0) ? productslist.filter(data =>
      data?.toLowerCase()?.includes(value?.toLowerCase()),
    ) : [];
    //if value is empty, filter should be empty
    if (value === "") filterData = [];
    setFilterProductsList(filterData);
  };

  //Function to handle when a client name is selected
  const onProductSelected = (value, index) => {
    let newArr = inputValues;
    newArr.product[newArr.product.length - 1] = value;

    //update state
    setInputValues(newArr);
    //Reset filter list
    setFilterProductsList([]);
  };
  //Function to handle the plus button.
  //It adds one more element to the product and amount array
  const AddInput = () => {
    let goodData = false;
    let productList = props.products;
    for (let i = 0; i < productList.length; i++) {
      if (inputValues.product[inputValues.product.length - 1] === productList[i].name) {
        goodData = true;
      }
    };
    if (goodData) {
      //Add element to the input array
      let newInput = productInputNumber;
      newInput.push(newInput[newInput.length - 1] + 1);
      //Add space for new input
      let newProductArr = inputValues;
      newProductArr.product.push("");
      newProductArr.amount.push("");
      newProductArr.price.push("");

      //Save states
      setInputValues(newProductArr);
      setProductInputNumber(newInput);
    }
    else {
      Alert.alert("Erro", "É necessario selecionar um dos produtos disponiveis pra adicionar um novo produto")
    }

  }
  //Function to handle the minus button.
  //It removes the last element from the product and amount array
  const RemoveInput = () => {
    //Get states
    let newInput = productInputNumber;
    let newProductArr = inputValues;
    if ((productInputNumber.length !== 1) && (newProductArr.product.length !== 1) && (newProductArr.amount.length !== 1)) {
      //Remove last elements
      newProductArr.product.pop();
      newProductArr.amount.pop();
      newProductArr.price.pop();
      newInput.pop();
      //Remove last element from the input array and Save states
      setInputValues(newProductArr);
      setProductInputNumber(newInput);
    }

  };

  //Function to control where the dropbox filter will appear
  //return false if textinput dont have any string or if the string is any of the productlists products
  const dataHandler = (entry, index) => {
    let bool = true;
    let productList = props.products;
    if (entry === "data") {
      if (inputValues.product[index] !== "") {
        for (let i = 0; i < productList.length; i++) {
          if (productList[i].name === inputValues.product[index]) bool = false;
        }
      }
    }
    else if (entry === "style") {
      if (inputValues.product[index] === "") {
        bool = false;
      };
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].name === inputValues.product[index]) bool = false;
      }
    }

    return bool;
  };

  //Function to handle the amount inputs
  const amountHandler = (text, index) => {
    let newArr = inputValues;

    newArr.amount[index] = text;
    setInputValues(newArr);
  };

  //Function to handle the price inputs
  const priceHandler = (text, index) => {
    let newArr = inputValues;

    newArr.price[index] = text;
    setInputValues(newArr);
  };

  //Function to control where the dropbox filter will appear
  //return false if textinput dont have any string or if the string is any of the productlists products
  const dataHandlerClient = () => {
    let bool = true;
    let clientList = props.clientList;
    if (inputValues.client !== "") {
      for (let i = 0; i < clientList.length; i++) {
        if (clientList[i].name === inputValues.client) bool = false;
      }
    }
    else bool = false;

    return bool;
  }


  return (
    <SafeAreaView>
      {/*view form. Englobes all */}
      <View style={styles.form}>
        {/*each field has its own view row  */}
        <Text style={styles.header}>Novo pedido</Text>

        <View style={[styles.formRow,{marginTop:"3%"}]}>
          <View style={{width:"100%"}}>

            <Text style={styles.label}>Selecione um Cliente</Text>
            <TextInput
              value={inputValues.client}
              style={[styles.inputSearch ,{width:"100%"}]}
              onChangeText={filterClients}
            />
            <SafeAreaView style={dataHandlerClient() ? styles.dropboxSearch : styles.hideComponent}>
              <FlatList
                horizontal={true}
                data={filterClientList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => onClientSelected(item)}
                    key={"Wrapper" + index}
                  >

                    <Text
                      key={index}
                      style={styles.txtDropboxSearch}
                    >
                      {item || ''}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item,index) => { return item+index }}
              />
            </SafeAreaView>
          </View>
        </View>
        <View >
          {productInputNumber?.map((id, index) => (
            <View key={"productAmountCase" + id} style={{ borderTopWidth: 1, marginTop: "3%" }}>
              <View style={[styles.formRow, {marginBottom:0}]}>
                <View style={{width:"100%", marginTop:"3%"}}>

                  <Text style={styles.label}>Selecione um Produto</Text>

                  <TextInput
                    value={inputValues.product[id]}
                    style={[styles.inputSearch ,{width:"100%"}]}
                    onChangeText={(text) => filterProducts(text, id)}
                  />
                  <SafeAreaView style={(dataHandler("style", index)) ?styles.dropboxSearch : styles.hideComponent}>
                    <FlatList
                      horizontal={true}
                      data={(dataHandler("data", index)) ? filterProductsList : []}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          onPress={() => onProductSelected(item, index)}
                          key={"Wrapper" + index}
                        >
                          <Text
                            key={index}
                            style={styles.txtDropboxSearch}
                          >
                            {item || ''}
                          </Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item,index) => { return item+index }}
                      
                    />
                  </SafeAreaView>
                </View>
              </View>
              <View style={[styles.formRow,{gap:"3%"}]}>
                <Input
                  style={{flex: 1}}
                  label="Quantidade"
                  textInputConfig={{
                    onChangeText: (text) => amountHandler(text, index),
                    value: inputValues.amount[index].toString(),
                    keyboardType: 'number'
                  }}
                />
                <Input
                  style={{flex: 1}}
                  label="Preço unitario"
                  textInputConfig={{
                    onChangeText: (text) => priceHandler(text, index),
                    value: inputValues.price[index].toString(),
                    keyboardType: 'number'
                  }}
                />
              </View>
            </View>
          ))}
        </View>
        <View>
          <View style={{ flexDirection: 'row-reverse', gap: "3%", marginBottom: "3%" }}>
            <TouchableOpacity
              key="plusSign"
              style={styles.btnInputs}
              onPress={AddInput}
            ><Text style={styles.txtBtnInputs}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key="minusSign"
              style={productInputNumber.length !== 1 ? styles.btnInputs : styles.hideComponent}
              onPress={RemoveInput}
            ><Text style={styles.txtBtnInputs}>-</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ borderTopWidth: 1 }} >
          <Input
            label="Endereço de entrega"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'deliveryAddress'),
              value: inputValues.deliveryAddress,
            }}
          />
          <View style={[styles.formRow, {marginTop:0}]}>
            <Text style={styles.label}>Inserir endereço cadastrado?</Text>
            <TouchableOpacity
              style={inputValues.addressCheckbox ? styles.btnCheckboxPressed : styles.btnCheckboxNotPressed}
              onPress={handleAdressCheckbox}
              disabled={inputValues.client === ""}
            ><Text  style={styles.txtCheckboxes}>{inputValues.addressCheckbox ? "✓": ""}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View >
          <Input
            label="Data de Entrega"
            textInputConfig={{
              placeholder: 'AAAA-MM-DD',
              onChangeText: inputChangedHandler.bind(this, 'deliveryDate'),
              value: inputValues.deliveryDate,
            }}
          />
          <View style={styles.formRow}>
            <Text style={styles.label}>Pedido Emergencial?</Text>
            <TouchableOpacity
              style={inputValues.eo ? styles.btnCheckboxPressed : styles.btnCheckboxNotPressed}
              onPress={handleEOCheckbox}
            ><Text style={styles.txtCheckboxes}>{inputValues.eo ? "✓": ""}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View >
          <Input
            label="Descrição do pedido"
            textInputConfig={{
              multiline: true,
              maxLength: 150,
              numberOfLines:4,
              placeholder: "Insira alguma nota ou confirme se o pagamento foi realizado",
              onChangeText: inputChangedHandler.bind(this, 'desc'),
              value: inputValues.desc,
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
    </SafeAreaView>
  );
}

export default FormAddOrder;
