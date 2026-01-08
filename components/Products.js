import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/styles.js";
import Button from "./Forms/Inputs/Button";

/*
clients={updatedClientsList}
onActive={activeIndex}
products={updatedProductsList}
onSelectedProduct={setActiveProduct}
productActive={activeProduct}
*/
function Products(props) {
  let isActive = props.onActive;
  if (isActive !== 8) return;
  const [inputValues, setInputValues] = useState({
    productFilter: "",
  });
  const [filterProductsList, setFilterProductsList] = useState(getProductsList);

  //Function to get all the clients names
  const getProductsList = () => {
    let newArr = [];
    props.products.map((product) => {
      newArr.push(product.name);
    });
    return newArr;
  };
  //Function to filter clients names from value entered
  const filterProducts = (value) => {
    let newArr = inputValues;
    newArr.productFilter = value;
    setInputValues(newArr);

    //get all client's name
    let productslist = getProductsList();
    //Filter options based on valued typed
    let filterData =
      productslist && productslist?.length > 0
        ? productslist.filter((data) =>
            data?.toLowerCase()?.includes(value?.toLowerCase())
          )
        : [];
    //if value is empty, filter should be empty
    if (value === "") filterData = [];
    setFilterProductsList(filterData);
  };

  //Function to handle when a client name is selected
  const onProductSelected = (value) => {
    let newArr = inputValues;
    newArr.productFilter = value;
    //update state
    setInputValues(newArr);

    //Reset filter list
    setFilterProductsList([]);
  };

  //Function to control where the dropbox filter will appear
  //return false if textinput dont have any string or if the string is any of the productlists products
  const dataHandler = () => {
    let bool = true;
    let productsList = props.products;
    if (inputValues.productFilter !== "") {
      for (let i = 0; i < productsList.length; i++) {
        if (productsList[i].name === inputValues.productFilter) bool = false;
      }
    } else bool = false;

    return bool;
  };
  return (
    <View style={props.onActive === 8 ? "" : "hideComponent"}>
      {/*Buttons Navigation */}
      <View style={styles.navBar}>
        {/*Call form to edit or complete the active order */}
        <Button
          style={styles.btnBar}
          onPress={() => {
            props.onClick(9);
          }}
        >
          Adicionar Produto
        </Button>
      </View>
      <View style={styles.formRow}>
        <View style={styles.searchContainer}>
          <Text style={styles.txtSearch}>Selecione um produto</Text>
          <View>
            <TextInput
              value={inputValues.productFilter}
              style={styles.inputSearch}
              onChangeText={filterProducts}
            />
            <SafeAreaView
              style={
                dataHandler() ? styles.dropboxSearch : styles.hideComponent
              }
            >
              <FlatList
                horizontal={true}
                data={filterProductsList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => onProductSelected(item)}
                    key={"WrapperProduct" + index}
                  >
                    <Text
                      key={index}
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

      {/**Cards */}
      {props.products?.map((product, index) => (
        <View key={"ProductCard" + product.id + index}>
          {(
            inputValues.productFilter === ""
              ? true
              : inputValues.productFilter === product.name
              ? true
              : false
          ) ? (
            //Container for every client
            <SafeAreaView
              style={styles.cardsContainer}
              key={"ProductsCardWrapperSafeareaView" + product.id + index}
            >
              <TouchableWithoutFeedback
                key={"ProductsCardWrapper" + product.id + index}
                onPress={
                  props.productActive?.name === product.name
                    ? () => props.onSelectedProduct({})
                    : () => props.onSelectedProduct(product)
                }
              >
                <View key={"ProductCard" + product.id}>
                  {/*client name*/}
                  <Text
                    style={[styles.header, { margin: "1%", marginLeft: "3%" }]}
                  >
                    {product.name}
                  </Text>

                  <View
                    style={[
                      styles.card,
                      {
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        padding: "3%",
                        flexWrap: "wrap",
                      },
                    ]}
                  >
                    <View key={"CardNav" + product.name}>
                      <Button
                        style={
                          props.productActive?.name === product.name
                            ? styles.btnCardActive
                            : styles.hideComponent
                        }
                        onPress={() => {
                          props.onClick(10);
                        }}
                        disabled={
                          props.productActive?.name === product.name
                            ? false
                            : true
                        }
                      >
                        <Image
                          style={styles.editLogo}
                          source={require("../styles/pencil.png")}
                        />
                      </Button>
                    </View>
                    <Text
                      style={[
                        styles.cardText,
                        { marginTop: "3%", marginLeft: "2%" },
                      ]}
                    >
                      {product.desc}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </SafeAreaView>
          ) : (
            ""
          )}
        </View>
      ))}
    </View>
  );
}

export default Products;
