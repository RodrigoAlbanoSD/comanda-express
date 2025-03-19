import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, SafeAreaView, Alert, Image } from 'react-native';
import { useState } from "react";
import styles from "./styles/styles.js";
import FormAddClient from "./components/Forms/FormAddClient.js";
import FormEditClient from "./components/Forms/FormEditClient.js";
import FormAddOrder from "./components/Forms/FormAddOrder.js";
import FormEditOrder from "./components/Forms/FormEditOrder.js";
import FormAddProduct from "./components/Forms/FormAddProduct.js";
import FormEditProduct from "./components/Forms/FormEditProduct.js";
import Home from "./components/Home.js";
import History from "./components/History.js";
import Clients from "./components/Clients.js";
import Products from "./components/Products.js";
import Settings from "./components/Settings.js";
import { setItem, getItem } from "./localStorage.js";
import Button from './components/Forms/Inputs/Button';
import { Linking } from 'react-native'

/*
let clientList = [{
  name: "Hideraldo",
  email: "exemplo@mail.com",
  address: "999 Rua tal, cidade tal",
  tel: "(99) 9999-9999",
  notes: "Alguma nota",
  orders: [
    {
      id: 0,
      product: ["Lavabo Comum", "Lavabo Transfer"],
      amount: [10, 20],
      price:[1.95, 3.2],
      eo: false,
      desc: "Pagamento nao realizado. Passar semana que vem para cobrar ",
      receiveDate: new Date("2022-03-25").toLocaleDateString(),
      deliveryDate: new Date('2024-05-05').toLocaleDateString(),
      deliveryAddress: "999 Rua tal, cidade tal",
      isActive: true,
      warehouse: false
    },
    {
      id: 1,
      product: ["Copa Nova", "Tapete Metrao"],
      amount: [150, 33],
      price:[6.2, 12.5],
      eo: false,
      desc: "Pagamento realizado",
      receiveDate: new Date("2022-03-25").toLocaleDateString(),
      deliveryDate: new Date('2026-01-01').toLocaleDateString(),
      deliveryAddress: "999 Rua tal, cidade tal",
      isActive: true,
      warehouse: false
    },
  ],
}];

let clientList = [
  {
    name: "Hideraldo",
    email: "exemplo@mail.com",
    address: "999 Rua tal, cidade tal",
    tel: "(99) 9999-9999",
    notes: "Alguma nota",
    orders: [
      {
        id: 3,
        product: ["Tapete grande", "Toalha media"],
        amount: [11, 12],
        price:[50.0, 70.5],
        eo: false,
        desc: "Passar semana que vem para cobrar ",
        receiveDate: new Date("2022-03-25").toLocaleDateString(),
        deliveryDate: new Date('2024-05-05').toLocaleDateString(),
        deliveryAddress: "999 Rua tal, cidade tal",
        isActive: true,
        warehouse: false
      },
      {
        id: 4,
        product: ["Tapete pequeno"],
        amount: [100],
        price:[500.0],
        eo: false,
        desc: "Passar semana que vem para cobrar ",
        receiveDate: new Date("2022-03-25").toLocaleDateString(),
        deliveryDate: new Date('2026-01-01').toLocaleDateString(),
        deliveryAddress: "999 Rua tal, cidade tal",
        isActive: true,
        warehouse: false
      },
    ],
  },
  {
    name: "Kauaw",
    email: "exemplo2@mail.com",
    address: "899 Rua tal, cidade tal",
    tel: "(99) 9999-9999",
    notes: "Alguma nota",
    orders: [
      {
        id: 1,
        product: ["Tapete grande"],
        amount: [10],
        price:[50.0],
        eo: false,
        desc: "Pagamento realizado ",
        receiveDate: new Date("2023-01-01").toLocaleDateString(),
        deliveryDate: new Date("2034-01-01").toLocaleDateString(),
        deliveryAddress: "899 Rua tal, cidade tal",
        isActive: true,
        warehouse: false
      },
      {
        id: 2,
        product: ["Toalha media"],
        amount: [30],
        price:[70.0],
        eo: false,
        desc: "Pagamento realizado ",
        receiveDate: new Date("2022-07-03").toLocaleDateString(),
        deliveryDate: new Date("2022-07-09").toLocaleDateString(),
        deliveryAddress: "899 Rua tal, cidade tal",
        isActive: true,
        warehouse: false
      },
    ],
  }
];

let productList = [
  {
    id: 1,
    name: "Lavabo Comum",
    desc: ""
  },
  {
    id: 2,
    name: "Lavabo Transfer",
    desc: ""
  },
  {
    id: 3,
    name: "Copa Nova",
    desc: ""
  },
  {
    id: 4,
    name: "Tapete Metrao",
    desc: "200cm x 50cm"
  },
  {
    id: 5,
    name: "Tapete medio",
    desc: "80cm x 50cm"
  },
  {
    id: 6,
    name: "Tapete pequeno",
    desc: "50cm x 20cm"
  },

]

*/


export default function App() {
  /*let clientList =[];
  let productList =[];*/
  //setItem("clientList", clientList);
  //setItem("productList", productList);


  //Variable with the  updatedclient list
  const [updatedClientsList, setClientsList] = useState([]);
  const [updatedProductsList, setProductsList] = useState([]);
  //State to hide or Highlight components
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeClient, setActiveClient] = useState({});
  const [activeOrder, setActiveOrder] = useState(0);
  const [activeProduct, setActiveProduct] = useState({});
  //Get Storage
  getItem("clientList").then(data => setClientsList(data));
  getItem("productList").then(data => setProductsList(data));

  //console.log(clientList);

  //Function to send an email to provider with the active order details
  function sendOrder() {
    if (!activeOrder.warehouse) {
      let clientList = updatedClientsList;
      clientList?.map((client) => {
        client.orders?.map((order) => {
          if (order.id === activeOrder.id) {
            order.warehouse = true;
          }
        })
      })

      let productString = "";
      for (let i = 0; i < activeOrder.product.length; i++) {
        productString += activeOrder.amount[i] + " fardos de " + activeOrder.product[i] + " no valor unitário de " + activeOrder.price[i] + "\n";
      }
      let bodyString = "Bom dia,\nSegue abaixo os detalhes do novo pedido.\n" + productString + "\n" + "Este pedido deve ser entregue ate " + activeOrder.deliveryDate;
      //Linking.openURL('mailto:rodrigogg1996@hotmail.com?subject=Novo Pedido&body=' + bodyString).then(setClientsList(clientList));
      //Linking.openURL('whatsapp://send?text=' + bodyString + '&phone='+'xxxxxxxxxxxxx');
      Linking.openURL('whatsapp://send?text=' + bodyString);
    }
    else {
      Alert.alert(
        //This is title
        "Alerta",
        //This is body text
        "Este pedido ja foi enviado. Caso queira re-envia-lo, pressione Sim e clique no botao de enviar pedido novamente",
        [
          {
            text: 'Sim', onPress: () => {
              let clientList = updatedClientsList;
              clientList?.map((client) => {
                client.orders?.map((order) => {
                  if (order.id === activeOrder.id) {
                    order.warehouse = false;
                  }
                })
              })
            }
          },
          { text: 'Nao', style: 'cancel' },
        ],
        //on clicking out side, Alert will not dismiss
      );
    }
  }


  ///
  ///   BASIC CRUD Client
  ///

  //Function to build client
  //In: client object
  function BuildClientHandler(data) {
    //Get client list
    let clients = updatedClientsList;
    if (clients === null) {
      clients = [{
        name: data.name,
        email: data.email,
        address: data.address,
        tel: data.tel,
        notes: data.note
      }]
    }
    else {
      clients.push({
        name: data.name,
        email: data.email,
        address: data.address,
        tel: data.tel,
        notes: data.note
      });
    }

    //update client list
    setClientsList(clients);
    //save client in db and then hide form
    setItem("clientList", clients);
  };

  //Function to edit a client
  //In: client object
  //I could use the function in the form to replace the data
  function EditClientHandler(data) {
    //get clientList
    let clients = updatedClientsList;

    for (let i = 0; i < clients.length; i++) {
      if (clients[i].email === activeClient.email) {
        clients[i].name = data.name;
        clients[i].email = data.email;
        clients[i].address = data.address;
        clients[i].tel = data.tel;
        clients[i].notes = data.notes;

      }
    }
    //update client list
    setClientsList(clients);
    //save client in db and then hide form
    setItem("clientList", clients).then(setActiveIndex(1));

  }

  //Function to delete a client from the clientList
  function DeleteClient(clientEmail) {
    //delete client
    let clients = updatedClientsList;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].email === clientEmail) {
        clients.splice(i, 1);
      }
    }
    setClientsList(clients);
    //save client in db
    setItem("clientList", clients);
  }


  ///
  ///   BASIC CRUD Order
  ///

  //Function to add a order for the active client
  function AddOrderHandler(data) {
    //get clients list
    let clients = updatedClientsList;
    let neworder = {
      id: getOrderID(),
      deliveryAddress: data.deliveryAddress,
      product: data.product,
      amount: data.amount,
      price: data.price,
      receiveDate: new Date(Date.now('pt-BR', { timeZone: 'UTC' })).toLocaleDateString(),
      deliveryDate: new Date(data.deliveryDate.replace(/\//g, "-")).toLocaleDateString('pt-BR', { timeZone: "America/Sao_Paulo" }),
      eo: data.eo,
      desc: data.desc,
      isActive: true,
      warehouse: false
    };

    clients.map((client) => {
      if (client.email === activeClient.email) {
        if (client.hasOwnProperty("orders")) {
          client.orders.push(neworder);
        } else client.orders = [neworder];
      }

    })

    //update client list
    setClientsList(clients);
    //save client in db
    setItem("clientList", clients);
    //Hide form
    setActiveIndex(0);
  }

  //Function to edit order
  function EditOrderHandler(data) {
    //get clients list
    let clients = updatedClientsList;
    // Split the input date by '/'
    let parts = data.receiveDate.split('/');

    // Rearrange the parts and return the new format
    data.receiveDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    // Split the input date by '/'
    parts = data.deliveryDate.split('/');

    // Rearrange the parts and return the new format
    data.deliveryDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    clients.map((client) => {
      client.orders?.map((order) => {
        if (order.id === activeOrder.id) {
          order.deliveryAddress = data.deliveryAddress;
          order.product = data.product;
          order.amount = data.amount;
          order.price = data.price;
          order.receiveDate = new Date(data.receiveDate.replace(/\//g, "-")).toLocaleDateString('pt-BR', { timeZone: "America/Sao_Paulo" });
          order.deliveryDate = new Date(data.deliveryDate.replace(/\//g, "-")).toLocaleDateString('pt-BR', { timeZone: "America/Sao_Paulo" });
          order.eo = data.eo;
          order.desc = data.desc;
          order.isActive = true;
          order.warehouse = false;
        }
      })
    })
    //update client list
    setClientsList(clients);
    //save client in db
    setItem("clientList", clients);

  }
  //Function to send a HTTP request to the distributor
  function CompleteOrderHandler() {
    let clients = updatedClientsList;

    clients.map((client) => {
      if (client.email === activeClient.email) {
        for (let i = 0; i < client.orders.length; i++) {
          if (client.orders[i].id === activeOrder.id) {
            client.orders[i].isActive = false;
          }
        }
      }
    })
    //Update client state
    setClientsList(clients);
    //save client in db
    setItem("clientList", clients);

  }
  //Function to delete the selected order
  function DeleteOrderHandler(orderId) {
    //deleter client
    let clients = updatedClientsList;

    clients.maps((client) => {
      if (client.email === activeClient.email) {
        for (let i = 0; i < client.orders.length; i++) {
          if (client.orders[i].id === orderId) {
            client.orders.splice(i, 1);
          }
        }
      }
    })
    //Update client state
    setClientsList(clients);
    //save client in db
    setItem("clientList", clients);

    //Set index to Home page
    setActiveIndex(0);
  }
  //Function to reactived the order and bring it back to the homne page
  function ReactivateOrderHandler(orderId) {


    let clients = updatedClientsList;

    clients.map((client) => {
      client.orders?.map((order) => {
        if (order.id === orderId) {
          order.isActive = true;
        }
      })
    })
    //Update client state
    setClientsList(clients);
    //save client in db
    setItem("clientList", clients);

    //Set index to Home page
    setActiveIndex(0);
  }

  //Funciton to fecth the order ID
  function getOrderID() {
    let id = 0;
    let clients = updatedClientsList;
    clients.map((client) => {
      if (client.hasOwnProperty("orders")) {
        for (let i = 0; i < client.orders.length; i++) {
          if (client.orders[i].id >= id) {
            id = client.orders[i].id + 1;
          }
        }
      }
    });
    return id;
  }


  ///
  ///   BASIC CRUD Product
  ///
  function addProductHandler(data) {
    //get product list
    let productList = updatedProductsList;
    let newproduct = {
      id: getProductID(),
      name: data.name,
      desc: data.desc,
    };

    if (productList === null) {
      productList = [newproduct];
    } else {
      productList.push(newproduct);
    }

    //update product list
    setProductsList(productList);
    //save product in db
    setItem("productList", productList);
  }

  //Function to edit Product
  function EditProductHandler(data) {
    //get product list
    let productList = updatedProductsList;

    productList.map((product) => {
      if (product.id === activeProduct.id) {
        product.name = data.name;
        product.desc = data.desc;
      }
    })
    //update product list
    setProductsList(productList);
    //save product in db
    setItem("productList", productList);

  }

  //Function to delete the selected product
  function DeleteProductHandler(productID) {
    //get product list
    let productList = updatedProductsList;

    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id === productID) {
        productList.splice(i, 1);
      }
    };
    //update product list
    setProductsList(productList);
    //save product in db
    setItem("productList", productList);
  }

  //Funciton to fecth the product ID
  function getProductID() {
    let id = 0;
    let productList = updatedProductsList;
    productList?.map((product) => {
      if (product.id >= id) {
        id = product.id + 1;
      }
    });
    return id;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.navMenu} >
        <View style={[styles.navMenu, {flex:9, flexDirection:"row-reverse"}]}>
          <Button
            style={activeIndex === 8 ? styles.activeButton : styles.btnMenu}
            onPress={() => setActiveIndex(8)}
          >Produtos</Button>
          <Button
            style={activeIndex === 1 ? styles.activeButton : styles.btnMenu}
            onPress={() => setActiveIndex(1)}
          >Clientes</Button>
          <Button
            style={activeIndex === 0 ? styles.activeButton : styles.btnMenu}
            onPress={() => setActiveIndex(0)}
          >Pedidos</Button>
        </View>
        <View style={[styles.navMenu, {flexDirection:"row-reverse", flex:1}]}>
          <Button
            style={activeIndex === 7 ? [styles.activeButton] : [styles.btnMenu]}
            onPress={() => setActiveIndex(7)}
          >
            <Image
              style={styles.settingsLogo}
              source={require('./styles/gear.png')}
            />
          </Button>
        </View>

        {/*activeIndex number 3 is dedicated to the form Add Cliente */}
        {/*activeIndex number 4 is dedicated to the form Edit Client */}
        {/*activeIndex number 5 is dedicated to the form Add Order */}
        {/*activeIndex number 6 is dedicated to the form Edit Order */}
        {/*activeIndex number 7 is dedicated to the Settings */}
        {/*activeIndex number 8 is dedicated to the Product */}
        {/*activeIndex number 9 is dedicated to the form Add Product */}
        {/*activeIndex number 10 is dedicated to the form Edit Product */}
      </View>

      <ScrollView style={styles.container}>

        <View //id="home" 
          style={activeIndex === 0 ? "" : styles.hideComponent}
        >
          {/*Home Operator*/}
          <Home
            clients={updatedClientsList}
            onActive={activeIndex}
            onButtonClick={setActiveIndex}
            onSelectedOrder={setActiveOrder}
            order={activeOrder}
            completeOrder={CompleteOrderHandler}
            onSelectedClient={setActiveClient}
            sendOrder={sendOrder}
          />
        </View>

        <View //id="client" 
          style={activeIndex === 1 ? "" : styles.hideComponent}
        >
          {/*Clients Operator*/}
          <Clients
            onSelectedClient={setActiveClient}
            activeClient={activeClient}
            clients={updatedClientsList}
            onActive={activeIndex}
            onButtonClick={setActiveIndex}

          />
        </View>
        <View //id="Historico"
          style={activeIndex === 2 ? "" : styles.hideComponent}
        >
          {/*History Operator*/}
          <History
            clients={updatedClientsList}
            onActive={activeIndex}
            reactivateOrder={ReactivateOrderHandler}
            order={activeOrder}
          />
        </View>

        <View //id="Products"
          style={activeIndex === 8 ? "" : styles.hideComponent}
        >
          {/*Product Operator*/}
          <Products
            clients={updatedClientsList}
            onActive={activeIndex}
            products={updatedProductsList}
            onSelectedProduct={setActiveProduct}
            productActive={activeProduct}
            onClick={setActiveIndex}
          />
        </View>
        <View //id="Products"
          style={activeIndex === 7 ? "" : styles.hideComponent}
        >
          {/*Product Operator*/}
          <Settings
            onActive={activeIndex}
            onClick={setActiveIndex}
          />
        </View>

        <View //id="formAddClient"
          style={activeIndex === 3 ? "" : styles.hideComponent}
        >
          {/*Form Add client Operator*/}
          <FormAddClient

            onActive={activeIndex}
            buildClient={BuildClientHandler}
            onClick={setActiveIndex}
            clientList={updatedClientsList}
          />
        </View>
        <View //id="formEditClient"
          style={activeIndex === 4 ? "" : styles.hideComponent}
        >
          {/*Form EDIT client Operator*/}
          <FormEditClient
            products={updatedProductsList}
            onSelectedProduct={setProductsList}
            onActive={activeIndex}
            client={activeClient}
            editClient={EditClientHandler}
            onClick={setActiveIndex}
            deleteClient={DeleteClient}
            setActiveOrder={setActiveOrder}
          />
        </View>
        <View
          //id="FormAddOrder"
          style={activeIndex === 5 ? "" : styles.hideComponent}
        >
          {/*Form Add Order Operator*/}
          <FormAddOrder
            products={updatedProductsList}
            onSelectedProduct={setProductsList}
            onActive={activeIndex}
            clientList={updatedClientsList}
            client={activeClient}
            onSelectedClient={setActiveClient}
            addOrder={AddOrderHandler}
            onClick={setActiveIndex}
          />
        </View>
        <View
          //id="FormEditOrder"
          style={activeIndex === 6 ? "" : styles.hideComponent}
        >
          {/*Form edit Order Operator*/}
          <FormEditOrder

            onActive={activeIndex}
            order={activeOrder}
            clients={updatedClientsList}
            client={activeClient}
            products={updatedProductsList}
            editOrder={EditOrderHandler}
            onClick={setActiveIndex}
            deleteOrder={DeleteOrderHandler}

          />
        </View>
        <View
          //id="FormEditOrder"
          style={activeIndex === 9 ? "" : styles.hideComponent}
        >
          {/*Form add Product Operator*/}
          <FormAddProduct
            onActive={activeIndex}
            onClick={setActiveIndex}
            addProduct={addProductHandler}
            onButtonClick={setActiveIndex}
            productList={updatedProductsList}
          />
        </View>
        <View
          //id="FormEditOrder"
          style={activeIndex === 10 ? "" : styles.hideComponent}
        >
          {/*Form edit Product Operator*/}
          <FormEditProduct
            onActive={activeIndex}
            onClick={setActiveIndex}
            editProduct={EditProductHandler}
            deleteProduct={DeleteProductHandler}
            productActive={activeProduct}
            clientList={updatedClientsList}
          />
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}
