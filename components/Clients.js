import { useState } from "react";
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/styles.js";
//eu tenho dois set active client states ai. tenta mudar so para o state que esta no app e tira o presente
import Button from "./Forms/Inputs/Button";
import { setStatusBarBackgroundColor } from "expo-status-bar";

/*
onSelectedClient={setActiveClient}
clients={updatedClientsList}
onActive={activeIndex}
onButtonClick={setActiveIndex}
activeClient={activeClient}
*/
const Clients = (props) => {
  let isActive = props.onActive;
  if (isActive !== 1) return;
  const [inputValues, setInputValues] = useState({
    client: "",
  });
  const [filterClientList, setFilterClientList] = useState(getClientsList);

  //Function to get all the clients names
  const getClientsList = () => {
    let newArr = [];
    props.clients.map((client) => {
      newArr.push(client.name);
    });
    return newArr;
  };

  //Function to filter clients names from value entered
  const filterClients = (value) => {
    let newArr = inputValues;
    newArr.client = value;
    setInputValues(newArr);

    //get all client's name
    let clientlist = getClientsList();
    //Filter options based on valued typed
    let filterData =
      clientlist && clientlist?.length > 0
        ? clientlist.filter((data) =>
            data?.toLowerCase()?.includes(value?.toLowerCase())
          )
        : [];
    //if value is empty, filter should be empty
    if (value === "") filterData = [];
    //console.log(inputValues.client);
    setFilterClientList(filterData);
  };

  //Function to handle when a client name is selected
  const onClientSelected = (value) => {
    let newArr = inputValues;
    newArr.client = value;
    //update state
    setInputValues(newArr);

    //Reset filter list
    setFilterClientList([]);
  };

  //Function to control where the dropbox filter will appear
  //return false if textinput dont have any string or if the string is any of the productlists products
  const dataHandler = () => {
    let bool = true;
    let clientList = props.clients;
    if (inputValues.client !== "") {
      for (let i = 0; i < clientList.length; i++) {
        if (clientList[i].name === inputValues.client) bool = false;
      }
    } else bool = false;

    return bool;
  };
  return (
    <View style={props.onActive === 1 ? "" : "hideComponent"}>
      <View style={styles.navBar}>
        <Button style={styles.btnBar} onPress={() => props.onButtonClick(3)}>
          Adicionar Cliente
        </Button>
      </View>
      <View style={styles.formRow}>
        <View style={styles.searchContainer}>
          <Text style={styles.txtSearch}>Selecione um cliente</Text>
          <View>
            <TextInput
              value={inputValues.client}
              style={styles.inputSearch}
              onChangeText={filterClients}
            />
            <SafeAreaView
              style={
                dataHandler() ? styles.dropboxSearch : styles.hideComponent
              }
            >
              <FlatList
                horizontal={true}
                data={filterClientList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => onClientSelected(item)}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.txtDropboxSearch}
                    >
                      {item || ""}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => {
                  return item + index;
                }}
              />
            </SafeAreaView>
          </View>
        </View>
      </View>

      <View>
        {props.clients?.map((client) =>
          (
            inputValues.client === ""
              ? true
              : inputValues.client === client.name
              ? true
              : false
          ) ? (
            <SafeAreaView
              key={"ClientCardWrapperSafeareaView" + client.email}
              style={styles.cardsContainer}
            >
              <TouchableWithoutFeedback
                key={"ClientCardWrapper" + client.email}
                onPress={
                  props.activeClient.email === client.email
                    ? () => {
                        props.onSelectedClient({});
                      }
                    : () => {
                        props.onSelectedClient(client);
                      }
                }
              >
                <View>
                  <View
                    key={"CardNav" + client.email}
                    style={{
                      flexDirection: "row",
                      margin: "2%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={[styles.header, { marginLeft: "3%" }]}>
                      {client.name}
                    </Text>
                  </View>

                  <View key={"ClientCard" + client.email} style={styles.card}>
                    <View
                      style={{
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <View>
                        <Button
                          style={
                            client.email === props.activeClient?.email
                              ? styles.btnCardActive
                              : styles.btnCard
                          }
                          onPress={() => {
                            props.onButtonClick(4);
                          }}
                          disabled={props.activeClient.email !== client.email}
                        >
                          <Image
                            style={styles.editLogo}
                            source={require("../styles/pencil.png")}
                          />
                        </Button>
                      </View>
                      <View style={{ marginTop: "6%", marginLeft: "2%" }}>
                        <Text style={[styles.cardText, { marginBottom: "5%" }]}>
                          {client.email}
                        </Text>
                        <Text style={[styles.cardText, { marginBottom: "5%" }]}>
                          {client.address}
                        </Text>
                        <Text style={[styles.cardText, { marginBottom: "5%" }]}>
                          {client.tel}
                        </Text>
                        {client.notes !== "" ? (
                          <Text
                            style={[styles.cardText, { marginBottom: "5%" }]}
                          >
                            {client.notes}
                          </Text>
                        ) : (
                          ""
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </SafeAreaView>
          ) : (
            ""
          )
        )}
      </View>
    </View>
  );
};

export default Clients;

/*


const Clients = (props) => {
  const [activeClient, setActiveClient] = useState("");
  const [client, setClient] = useState({});
  return (
    <View style={props.onActive === 1 ? "": "hideComponent"}>
      <View style={styles.navBar}>
        <Button
        style={styles.btnBarActive}
          onPress={() => props.onButtonClick(3)}
        >Novo Cliente</Button>
        <Button
        style={activeClient!==""?styles.btnBarActive:styles.btnBar}
          onPress={() => {
            
            props.onSelectedClient(client, props.onButtonClick(4));
            
          }}
          disabled={activeClient === ""}
        >Editar Cliente</Button>
        <Button
        style={activeClient!==""?styles.btnBarActive:styles.btnBar}
          onPress={() => {
            props.onSelectedClient(client);
            props.onButtonClick(5);
          }}
          disabled={activeClient === ""}
        >Add Pedido</Button>
      </View>
      <View>
        {props.clients.map((client) => (
          <SafeAreaView style={styles.cardsContainer} key={"Clients" + client.email}>
            <TouchableWithoutFeedback
              //key={client.key}
              onPress={(activeClient === client.email) ? () => {
                setClient({});
                setActiveClient("");
              } : () => {
                setClient(client);
                setActiveClient(client.email);
              }}
            >
              <View style={client.email === activeClient ? styles.activeCard : styles.card}>
                {/*<Text>{activeClient}</Text>
                <Text style={client.email === activeClient ? styles.activeCardText : styles.cardText}>{client.name}</Text>
                <Text style={client.email === activeClient ? styles.activeCardText : styles.cardText}>{client.email}</Text>
                <Text style={client.email === activeClient ? styles.activeCardText : styles.cardText}>{client.address}</Text>
                <Text style={client.email === activeClient ? styles.activeCardText : styles.cardText}>{client.tel}</Text>
                {client.notes !== "" ? (<Text style={client.email === activeClient ? styles.activeCardText : styles.cardText}>{client.notas}</Text>) : ("")}
              </View>

            </TouchableWithoutFeedback>
          </SafeAreaView>
        ))}

      </View>
    </View>
  );
}

*/
