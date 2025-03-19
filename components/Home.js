import { useState } from "react";
import { SafeAreaView, Text, View, TouchableWithoutFeedback, Image, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from "../styles/styles.js";
import Button from './Forms/Inputs/Button';

/*
clients={updatedClientsList}
onActive={activeIndex}
onButtonClick={setActiveIndex}
onSelectedOrder={setActiveOrder}
order={activeOrder}
*/
function Home(props) {
  let isActive = props.onActive;
  if (isActive !== 0) return;
  const [inputValues, setInputValues] = useState({
    clientFilter: '',
  });
  const [filterClientList, setFilterClientList] = useState(getClientsList);

  //Function to get all the clients names 
  const getClientsList = () => {
    let newArr = [];
    props.clients.map((client) => {
      newArr.push(client.name)
    })
    return newArr;
  }

  //Function to filter clients names from value entered 
  const filterClients = value => {
    let newArr = inputValues;
    newArr.clientFilter = value;
    setInputValues(newArr);

    //get all client's name
    let clientlist = getClientsList();
    //Filter options based on valued typed
    let filterData = (clientlist && clientlist?.length > 0) ? clientlist.filter(data =>
      data?.toLowerCase()?.includes(value?.toLowerCase()),
    ) : [];
    //if value is empty, filter should be empty
    if (value === "") filterData = [];
    //console.log(inputValues.client);
    setFilterClientList(filterData);
  };

  //Function to handle when a client name is selected
  const onClientSelected = value => {
    let newArr = inputValues;
    newArr.clientFilter = value;
    //update state
    setInputValues(newArr);

    //Reset filter list
    setFilterClientList([]);
  };
  const handleFinishOrder = (orderId) => {
    Alert.alert(
      //This is title
      "Finalizar pedido",
      //This is body text
      "Deseja finalizar o pedido numero " + orderId + "?",
      [
        { text: 'Sim', onPress: () => props.completeOrder() },
        { text: 'Nao', style: 'cancel' },
      ],
      //on clicking out side, Alert will not dismiss
    );
    props.onButtonClick(0);
  }

  //Function to tell if the delivery date is past today's date
  function isPastDate(dateString) {
    // Split the date string into components (DD, MM, YYYY)
    const [day, month, year] = dateString.split('/').map(Number);

    // Create a Date object for the given date
    const inputDate = new Date(year, month - 1, day); // month is 0-indexed in JavaScript

    // Get today's date
    const today = new Date();
    // Set time to 00:00:00 to avoid time comparison issues
    today.setHours(0, 0, 0, 0);

    // Compare the input date with today's date
    return inputDate < today;
  }

  function calculateTotalPrice(order) {
    let price = 0;
    for (let i = 0; i < order.product.length; i++) {
      price += order.price[i] * order.amount[i];
    };

    let string = "Total: " + price;
    return string;
  };

  //Function to control where the dropbox filter will appear
  //return false if textinput dont have any string or if the string is any of the productlists products
  const dataHandler = () => {
    let bool = true;
    let clientList = props.clients;
    if (inputValues.clientFilter !== "") {
      for (let i = 0; i < clientList.length; i++) {
        if (clientList[i].name === inputValues.clientFilter) bool = false;
      }
    }
    else bool = false;

    return bool;
  }

  return (
    <View style={props.onActive === 0 ? "" : "hideComponent"}>
      {/*Buttons Navigation */}
      <View style={styles.navBar}>
        {/*Call form to edit or complete the active order */}
        <Button
          style={styles.btnBar}
          onPress={() => {
            props.onButtonClick(5);
          }}
        >Novo Pedido</Button>

      </View>
      <View style={styles.formRow}>

        <View style={styles.searchContainer}>
          <Text style={styles.txtSearch}>Busque um cliente</Text>
          <View>
            <TextInput
              value={inputValues.clientFilter}
              style={styles.inputSearch}
              onChangeText={filterClients}
            />
            <SafeAreaView style={dataHandler() ? styles.dropboxSearch : styles.hideComponent}
            >
              <FlatList
                horizontal={true}
                data={filterClientList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                  
                    onPress={() => onClientSelected(item)}
                    key={"WrapperHome" + index}
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
      </View>

      {/**Cards */}
      {props.clients?.map((client) => (
        <View key={"HomeCard" + client.email}>
          {(client.hasOwnProperty("orders") && client.orders?.find(o => o.isActive === true) && (inputValues.clientFilter === '' ? true : inputValues.clientFilter === client.name ? true : false)) ?
            //Container for every client          
            <SafeAreaView key={"SafeAreaView" + client.email} style={styles.cardsContainer}>
              {/*client name*/}
              <Text style={[styles.header, { marginLeft: "3.5%", marginTop: "3%" }]}>{client.name}</Text>

              {client.orders?.sort((a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate)).map((order) => (
                order.isActive ?
                  <TouchableWithoutFeedback
                    key={"OrderCardWrapper" + order.id}
                    onPress={(props.order.id === order.id) ? () => {
                      props.onSelectedOrder({});
                      props.onSelectedClient({});
                    } : () => {
                      props.onSelectedOrder(order);
                      props.onSelectedClient(client);
                    }
                    }
                  >

                    <View key={"CardWrapper" + order.id} style={props.order?.id === order.id ? styles.activeCard : styles.card}>

                      <View key={"CardNav" + order.id} style={styles.carNav}>
                        <Text style={[styles.header, { marginTop: "3%" }]}>REF: {order.id}</Text>
                        <View style={{ flexDirection: "row-reverse", gap: "15%" }}>
                          <Button
                            style={props.order?.id === order.id ? styles.btnCardActive : styles.btnCard}
                            onPress={() => {
                              props.onButtonClick(6);
                            }}
                            disabled={props.order?.id === order.id ? false : true}
                          >
                            <Image
                              style={styles.editLogo}
                              source={require('../styles/pencil.png')}
                            />
                          </Button>
                          <Button
                            style={props.order?.id === order.id ? styles.btnCardActive : styles.btnCard}
                            onPress={() => {
                              props.sendOrder();
                            }}
                            disabled={props.order?.id === order.id ? false : true}
                          >
                            <Image
                              style={styles.sendLogo}
                              source={require('../styles/paperPlane2.png')}
                            />
                          </Button>
                        </View>

                      </View>
                      <View key={"OrderCard" + props.order.id}>
                        <View style={[styles.formRow, { marginBottom: "1%" }]}>
                          {order.warehouse ? <Text style={{ fontSize: 20, fontWeight: 500, color: "red" }}>Pedido enviado</Text> : ""}
                        </View>
                        <View style={[styles.formRow, { marginBottom: "1%" }]}>
                          {order.eo ? <Text style={{ fontSize: 20, fontWeight: 500, color: "red" }}>Pedido emergencial</Text> : ""}
                        </View>

                        <View style={[styles.formRow, { borderBottomWidth: 1 }]}>
                          {order.desc ? <Text style={styles.cardText}>{order.desc} </Text> : ""}
                        </View>


                        <View style={[styles.formRow, { marginBottom: 0 }]}>

                          <Text style={[styles.cardLabel, { flex: 3 }]}>Produto </Text>
                          <View style={[styles.formRow, { flex: 2 }]}>
                            <Text style={styles.cardLabel}>Preço</Text>
                            <Text style={styles.cardLabel}>Qtd</Text>
                          </View>

                        </View>

                        <View style={{ borderBottomWidth: 1 }}>
                          {order.product?.map((product, index) => (
                            <View key={"ProductListHome" + index} style={[styles.formRow, { marginBottom: "1%" }]}>

                              <View key={"ProductHome" + index} style={[styles.formRow, { flex: 3, maxWidth: "60%" }]}>
                                <Text style={styles.cardText}>{product}</Text>
                              </View>
                              <View key={"PriceAmountHome" + index} style={[styles.formRow, { flex: 2 }]}>
                                <Text style={styles.cardText}>${order.price[index]}</Text>
                                <Text style={styles.cardText}>{order.amount[index]}</Text>
                              </View>
                            </View>
                          ))}

                          <View style={{ flexDirection: "row-reverse", padding: "2%", marginTop: "3%" }}>
                            <Text style={styles.cardLabel}>{calculateTotalPrice(order)}</Text>
                          </View>

                        </View>



                        <View style={[styles.formRow, { marginTop: '5%', flexWrap: 'wrap' }]}>
                          <Text style={styles.cardLabel}>Entrega: </Text>
                          <Text style={styles.cardText}>{order.deliveryAddress}</Text>
                        </View>

                        <View style={[styles.formRow]}>
                          <Text style={styles.cardLabel}>Recebimento: </Text>
                          <Text style={styles.cardText}>{order.receiveDate.toString()}</Text>
                        </View>
                        <View style={styles.formRow}>
                          <Text style={styles.cardLabel}>Data de Entrega: </Text>
                          <Text style={!isPastDate(order.deliveryDate) ? styles.cardText : [styles.cardText, { color: "red" }]}>{order.deliveryDate.toString()}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row-reverse", marginTop: "5%" }}>
                        <Button
                          style={props.order?.id === order.id ? [styles.btnCardActive, { width: "30%", height: "100%" }] : [styles.btnCard, { borderWidth: 1.3, width: "30%", height: "100%" }]}
                          onPress={() => handleFinishOrder(order.id)}
                          disabled={props.order?.id === order.id ? false : true}
                        >
                          <Text style={{ color: "black" }}>Finalizar</Text>
                        </Button>

                      </View>
                    </View>
                  </TouchableWithoutFeedback> : ""
              ))}
            </SafeAreaView>
            : ""}
        </View>
      ))}





    </View>
  );
}

export default Home;
