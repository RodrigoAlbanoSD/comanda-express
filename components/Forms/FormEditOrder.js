import { TouchableOpacity, Text, View, Alert, TextInput, SafeAreaView, FlatList } from 'react-native';
import styles from "../../styles/styles.js";
import * as React from 'react';
import Input from './Inputs/Input';
import { useState, useEffect } from "react";


const FormEditOrder = (props) => {
  //Fetch Client order owner
  const client = props.client;

  //Set up state for all input variables
  const [inputValues, setInputValues] = useState(props.order);
  const [filterProductsList, setFilterProductsList] = useState(getProductsList);

  useEffect(() => {
    setInputValues(props.order);
  }, [props.order])

  //Brakes the component if is not active
  let isActive = props.onActive;
  if (isActive !== 6) return;

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
      props.editOrder(inputValues);

      //Reset Input
      handleCancel();
    }
  }

  //Function to handle the Cancel button 
  //it erases the input fields
  //and set the active component to Clients menu.
  function handleCancel() {
    //reset inputValues values
    /**/
    inputValues.deliveryAddress = '';
    inputValues.product = [""];
    inputValues.amount = [""];
    inputValues.price = [""];
    inputValues.dateReceived = '';
    inputValues.dateDelivery = '';
    inputValues.eo = false;
    inputValues.desc = "";
    inputValues.addressCheckbox = false;

    //Get back to home page
    props.onClick(0);
  };

  //Function to handle the Delete button 
  //it deletes the active order
  function handleDelete() {
    Alert.alert(
      //This is title
      "Deletar pedido",
      //This is body text
      "Deseja deletar o pedido numero" + inputValues.id + "?",
      [
        { text: 'Sim', onPress: () => props.deleteOrder(inputValues.id) },
        { text: 'Nao', style: 'cancel' },
      ],
    );
    //Get back to home page
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

  const handleAdressCheckbox = () => {
    //First change the checkbox value
    let value = inputValues;
    value.addressCheckbox = inputValues.addressCheckbox ? false : true;
    inputChangedHandler("addressCheckbox", value.addressCheckbox);

    //Then change its value
    value.deliveryAddress = value.addressCheckbox ? client.address : "";
    inputChangedHandler("deliveryAddress", value.deliveryAddress);
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
    newArr.product[newArr.product?.length - 1] = value;
    //update state
    setInputValues(newArr);
    //Reset filter list
    setFilterProductsList([]);
  };

  //Function to control where the dropbox filter will appear
  //return false if textinput dont have any string or if the string is any of the productlists products
  const dataHandler = (entry, index) => {
    let bool = true;
    let productList = props.products;
    if (entry === "data") {
      if (inputValues.product[index] !== "") {
        for (let i = 0; i < productList?.length; i++) {
          if (productList[i].name === inputValues.product[index]) bool = false;
        }
      }
    }
    else if (entry === "style") {
      if (inputValues.product[index] === "") {
        bool = false;
      };
      for (let i = 0; i < productList?.length; i++) {
        if (productList[i].name === inputValues.product[index]) {
          bool = false;
        }
      }
    }

    return bool;
  }

  //Function to handle the amount inputs
  const amountHandler = (text, index) => {
    let newArr = inputValues;

    newArr.amount[index] = text;
    setInputValues(newArr);
  }

  //Function to handle the price inputs
  const priceHandler = (text, index) => {
    let newArr = inputValues;

    newArr.price[index] = text;

    setInputValues(newArr);
  }

  //Function to handle the plus button.
  //It adds one more element to the product and amount array
  const AddInput = () => {
    let goodData = false;
    let productList = props.products;
    for (let i = 0; i < productList.length; i++) {
      if (inputValues.product[inputValues.product?.length - 1] === productList[i].name) {
        goodData = true;
      }
    };
    if (goodData) {
      //Add space for new input
      let newProductArr = inputValues;
      newProductArr.product.push("");
      newProductArr.amount.push("");
      newProductArr.price.push("");

      //Save states
      setInputValues(newProductArr);
    }
    else {
      Alert.alert("Erro", "É necessario selecionar um dos produtos disponiveis pra adicionar um novo produto")
    }

  }
  //Function to handle the minus button.
  //It removes the last element from the product and amount array
  const RemoveInput = () => {
    //Get states
    //let newInput = productInputNumber;
    let newProductArr = inputValues;
    if ((newProductArr?.product.length !== 1) && (newProductArr?.amount.length !== 1)) {
      //Remove last elements
      newProductArr.product.pop();
      newProductArr.amount.pop();
      newProductArr.price.pop();
      //Remove last element from the input array and Save states
      setInputValues(newProductArr);
    }

  };
  return (
    <>
      {/*view form. Englobes all */}
      <View style={styles.form}>
        {/*each field has its own view row  */}

        <Text style={styles.title}>Editar pedido {inputValues.id} de {typeof client != "undefined" ? client.name : ''}</Text>

        <View style={[styles.formRow, { marginBottom: "3%" }]}>
          <Text style={styles.label}>Pedido emergencial?</Text>
          <TouchableOpacity
            style={inputValues.eo ? styles.btnCheckboxPressed : styles.btnCheckboxNotPressed}
            onPress={handleEOCheckbox}>
            <Text style={styles.txtCheckboxes}>{inputValues.eo ? "✓" : ""}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Input
            style={styles.inputs}
            label="Endereço de entrega"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'deliveryAddress'),
              value: inputValues.deliveryAddress,
            }}
          />

          <View style={styles.formRow}>
            <Text style={styles.label}>Inserir endereço cadastrado?</Text>
            <TouchableOpacity
              style={inputValues.addressCheckbox ? styles.btnCheckboxPressed : styles.btnCheckboxNotPressed}
              onPress={handleAdressCheckbox}>
              <Text style={styles.txtCheckboxes}>{inputValues.addressCheckbox ? "✓" : ""}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View >
          {inputValues.product?.map((product, index) => (
            <View key={"productAmountCase" + index} style={{ borderTopWidth: 1, marginTop: "3%" }}>
              <View style={[styles.formRow, { marginBottom: 0 }]}>
                <View style={{ width: "100%", marginTop: "3%" }}>

                  <Text style={styles.label}>Selecione um Produto</Text>

                  <TextInput
                    value={product}
                    style={[styles.inputSearch, { width: "100%" }]}
                    onChangeText={(text) => filterProducts(text, index)}
                  />
                  <SafeAreaView style={(dataHandler("style", index)) ? styles.txtDropboxSearch : styles.hideComponent}>
                    <FlatList
                      horizontal={true}
                      data={(dataHandler("data", index)) ? filterProductsList : []}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          onPress={() => onProductSelected(item, index)}
                          key={"EditWrapper" + index}
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
              <View style={[styles.formRow, { gap: "3%" }]}>

                <Input
                  style={{ flex: 1 }}
                  label="Quantidade"
                  textInputConfig={{
                    onChangeText: (text) => amountHandler(text, index),
                    value: inputValues.amount[index]?.toString(),
                    keyboardType: 'number'
                  }}
                />
                <Input
                  style={{ flex: 1 }}
                  label="Preço unitario"
                  textInputConfig={{
                    onChangeText: (text) => priceHandler(text, index),
                    value: inputValues.price[index]?.toString(),
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
              key="plusSignEdit"
              style={styles.btnInputs}
              onPress={AddInput}
            ><Text style={styles.txtBtnInputs}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key="minusSignEdit"
              style={inputValues.product?.length !== 1 ? styles.btnInputs : styles.hideComponent}
              onPress={RemoveInput}
            ><Text style={styles.txtBtnInputs}>-</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ borderTopWidth: 1 }} >
          <Input
            label="Data de Recebimento"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'receiveDate'),
              value: inputValues.receiveDate,
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Input
            label="Data de Entrega"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'deliveryDate'),
              value: inputValues.deliveryDate,
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Input
            label="Descricao"
            textInputConfig={{
              multiline: true,
              maxLength: 150,
              numberOfLines:4,
              onChangeText: inputChangedHandler.bind(this, 'desc'),
              value: inputValues.desc,
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

export default FormEditOrder;
