import { useState } from "react";
import { SafeAreaView, Text, View, TouchableWithoutFeedback, Alert, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styles from "../styles/styles.js";
import Button from './Forms/Inputs/Button';

/*
clients={updatedClientsList}
onActive={activeIndex}
reactivateOrder={ReactivateOrderHandler}
*/

function History(props) {
    let isActive = props.onActive;
    if (isActive !== 2) return;
    const [inputValues, setInputValues] = useState({
        client: '',
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
        //console.log(inputValues.client);
        setFilterClientList(filterData);
    };

    //Function to handle when a client name is selected
    const onClientSelected = value => {
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
        }
        else bool = false;

        return bool;
    }
    return (
        <View style={props.onActive === 2 ? "" : "hideComponent"}>
            <View style={styles.formRow}>

                <View style={styles.searchContainer}>
                    <Text style={styles.txtSearch}>Selecione um cliente</Text>
                    <View>
                        <TextInput
                            value={inputValues.client}
                            style={styles.inputSearch}
                            onChangeText={filterClients}
                        />
                        <SafeAreaView style={dataHandler() ? styles.dropboxSearch : styles.hideComponent}>
                            <FlatList
                                horizontal={true}
                                data={filterClientList}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => onClientSelected(item)}
                                        key={"WrapperHistory" + index}
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


            {props.clients?.map((client) => (
                <SafeAreaView key={"History" + client.email}>
                    {client.orders?.sort((a, b) => a.receiveDate - b.receiveDate).map((order) => ( //.sort((a, b) => a.pedidos[0].date - b.pedidos[0].date)

                        ((order.isActive === false) && (inputValues.client === '' ? true : inputValues.client === client.name ? true : false)) ?
                            <TouchableWithoutFeedback key={"CompletedOrderCardWrapper" + order.id}>
                                <View key={"CompletedOrderCard" + order.id} style={styles.card}>
                                    <Text style={[styles.header, { marginBottom: "5%" }]}>{client.name}</Text>

                                    {order.eo ? <Text style={styles.cardText}>Pedido emergencial</Text> : ""}
                                    {order.desc ? <Text style={styles.cardText}>{order.desc} </Text> : ""}

                                    <View style={{ borderBottomWidth: 1, borderTopWidth: 1, marginTop: "3%", marginBottom: "3%" }}>
                                        {order.product?.map((product, index) => (
                                            <View key={"ProductListHistory" + index} style={[styles.formRow, { marginBottom: "1%" }]}
                                            >
                                                <View key={"ProductHistory" + index} style={[styles.formRow, { gap: '1.5%' }]}>
                                                    <Text style={styles.cardLabel}>Produto: </Text><Text style={styles.cardText}>{product}</Text>
                                                </View>

                                                <View key={"PriceHistory" + index} style={[styles.formRow, { gap: '1.5%' }]}>
                                                    <Text style={styles.cardLabel}>$</Text><Text style={styles.cardText}>{order.price[index]}</Text>
                                                </View>
                                                <View key={"AmountHistory" + index} style={[styles.formRow, { gap: '1.5%' }]}>
                                                    <Text style={styles.cardLabel}>Qtd: </Text><Text style={styles.cardText}>{order.amount[index]}</Text>
                                                </View>

                                                

                                            </View>
                                        ))}
                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 2 }}>
                                        <Text style={styles.cardLabel}>Entrega: </Text>
                                        <Text style={styles.cardText}>{order.deliveryAddress}</Text>
                                    </View>

                                    <View style={[styles.formRow, { marginTop: '3%' }]}>
                                        <Text style={styles.cardText}> {order.receiveDate.toString()}</Text>
                                        <Text style={[styles.cardText, { fontWeight: 500 }]}>{order.deliveryDate.toString()}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: "7%" }}>
                                        <Button
                                            style={{ borderWidth: 1, borderRadius: 25 }}
                                            onPress={() => {
                                                Alert.alert(
                                                    //This is title
                                                    "Reabilitacao de pedido",
                                                    //This is body text
                                                    "Deseja realmente reativar esse pedido?",
                                                    [
                                                        { text: 'Sim', onPress: () => props.reactivateOrder(order.id) },
                                                        { text: 'Nao', onPress: () => order.id = null, style: 'cancel' },
                                                    ],
                                                    //on clicking out side, Alert will not dismiss
                                                );

                                            }}
                                        >
                                            <Text style={{ color: "black" }}>Reativar</Text>
                                        </Button>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback> : ""
                    ))}

                </SafeAreaView>
            ))
            }
        </View >
    );
}

export default History;


{/**
    
return (
                            <SafeAreaView>
                                <Text style={{backgroundColor:'red'}}>Heloooooooooo</Text>
                                <TouchableWithoutFeedback
                                    style={styles.cardsContainer}
                                >
                                    {/*client name}/}
                                    <Text >{order.clientName}</Text>
                                    <View style={styles.card}>
                                        <Text style={styles.cardText}>Produto: {order.product}</Text>
                                        <Text style={styles.cardText}>Quantidade: {order.amount}</Text>
                                        {order.eo ? <Text style={styles.cardText}>"Pedido emergencial"</Text> : ""}
                                        {order.desc ? <Text style={styles.cardText}>{order.desc} </Text> : ""}
                                        <Text style={styles.cardText}>Recebimento: {order.receiveDate}</Text>
                                        <Text style={styles.cardText}>Entrega para: {order.deliveryDate}</Text>
                                        <Text style={styles.cardText}>Entrega em: {order.deliveryAddress}</Text>
                                    </View>
                                    <Button
                                    style={styles.btnBar}
                                        onPress={() => {
                                            Alert.alert("Reabilitacao de pedido", "Deseja realmente reativar esse pedido?");
                                            props.reactivateOrder(order.id)
                                            props.onButtonClick(2);
                                        }}
                                    >
                                        Reativar
                                    </Button>
                                </TouchableWithoutFeedback>
                            </SafeAreaView>

                        )
    
    
    
    */}