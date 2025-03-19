import { SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from "../styles/styles.js";
import React from 'react';
import { useState } from "react";
//import RNFS from 'react-native-fs';
//import DocumentPicker from 'react-native-document-picker';
import { setItem, getItem } from "../localStorage.js";
import Input from './Forms/Inputs/Input.js';
/*import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';*/
import { Linking } from 'react-native';



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
            price: [1.95, 3.2],
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
            price: [6.2, 12.5],
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

function Settings(props) {
    //console.log(JSON.stringify(clientList));
    //console.log(JSON.stringify(productList))
    let isActive = props.onActive;
    if (isActive !== 7) return;
    const [showImportForm, setshowImportForm] = useState(false);
    const [list, setList] = useState([])

    function handleRequest(entry, db) {
        if (entry === "importar") {
            if (db === "Produtos") {
                //backup data
                getItem("productList").then(data => exportFile(data, db)).then(() => importFile(db))
                //importFile(db)
            }
            else if (db === "Clientes") {
                //backup data
                getItem("clientList").then(data => exportFile(data, db)).then(() => importFile(db))
                //importFile(db);
            }
        }
        else if (entry === "exportar") {
            if (db === "Produtos") {

                getItem("productList").then(data => exportFile(data, db));

            }
            else if (db === "Clientes") {
                getItem("clientList").then(data => exportFile(data, db));
            }
        }
    }

    const transfertData = (entry, key) => {
        if (entry === "importar") {
            if (key) {
                Alert.alert(
                    //This is title
                    "Transferir dados",
                    //This is body text
                    "Qual dados voce deseja " + entry + "?",
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Produtos', onPress: () => handleRequest(entry, "Produtos") },
                        { text: 'Clientes', onPress: () => handleRequest(entry, "Clientes") },

                    ],
                );
            }
            else {
                setshowImportForm(true);
            }
        }
        else if (entry === "exportar")
            Alert.alert(
                //This is title
                "Transferir dados",
                //This is body text
                "Qual dados voce deseja " + entry + "?",
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Produtos', onPress: () => handleRequest(entry, "Produtos") },
                    { text: 'Clientes', onPress: () => handleRequest(entry, "Clientes") },

                ],
            );

    }

    // Function to export array to a file in the local folder
    const exportFile = async (array, db) => {
        Linking.openURL('mailto:rodrigogg1996@hotmail.com?subject="Lista de ' + db + '"&body=' + JSON.stringify(array));
    }
    const importFile = async (db) => {
        if (db === "Produtos") {
            try {
                // Parse the JSON string into an array
                const parsedArray = JSON.parse(list);

                // Check if the parsed result is an array
                if (Array.isArray(parsedArray)) {
                    setItem("productList", parsedArray).then(props.onClick(0));
                } else {
                    throw new Error("Problema com o formata da lista");
                }
            } catch (error) {
                console.error("Error parsing string to array:", error);
                Alert.alert("Erro", "erro")
            }
        }
        else if (db === "Clientes") {
            try {

                // Parse the JSON string into an array
                const parsedArray = JSON.parse(list);
                // Check if the parsed result is an array
                if (Array.isArray(parsedArray)) {
                    setItem("clientList", parsedArray).then(props.onClick(0));
                } else {
                    throw new Error("Problema com o formata da lista");
                }
            } catch (error) {
                console.error("Error parsing string to array:", error);
                Alert.alert("Erro", "erro")
            }
        }

    };


    function handleCancel() {
        //Reset Inputs
        setshowImportForm(false);
        //Set active index
        props.onClick(0);
    };

    return (
        <SafeAreaView style={props.onActive === 7 ? styles.form : styles.hideComponent}>
            <View>
                <Text style={styles.title}>Configuracoes</Text>
                <View style={styles.formButtons}>
                    <View>
                        <TouchableOpacity
                            style={styles.btnSettings}
                            onPress={() => props.onClick(2)}
                        >
                            <Text style={styles.btnText}>Historico</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnSettings}
                            onPress={() => transfertData("importar", false)}
                        >
                            <Text style={styles.btnText}>Importar Dados</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnSettings}
                            onPress={() => transfertData("exportar")}
                        >
                            <Text style={styles.btnText}>Exportar Dados</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={showImportForm ? styles.hideComponent : styles.btnSettings}
                            onPress={handleCancel}
                        >
                            <Text style={styles.btnText}>Sair</Text>
                        </TouchableOpacity>
                    </View>



                </View>
                <View style={showImportForm ? styles.form : styles.hideComponent}>
                    <View style={styles.formRow}>
                        <Input
                            //style={{flex: 1}}
                            label="Importe uma nova lista"
                            textInputConfig={{
                                value: list,
                                onChangeText: (text) => setList(text),
                                multiline: true,
                                numberOfLines: 4,
                            }}
                        />

                    </View>
                    <View style={styles.formButtons}>
                        <TouchableOpacity
                            style={styles.btnForm}
                            onPress={() => setshowImportForm(false)}
                        >
                            <Text style={styles.btnText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnForm}
                            onPress={() => transfertData("importar", true)}
                        >
                            <Text style={styles.btnText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Settings;



/*

EXPORT FILE


const exportFile = async (array) => {

        Linking.openURL('mailto:rodrigogg1996@hotmail.com?subject=Novo Pedido&body=' + array.toString());
        /*try {
            // Convert the array to a JSON string
            const jsonString = JSON.stringify(array);

            // Define the file path where the array will be saved
            const fileUri = FileSystem.documentDirectory + filename + new Date(Date.now('pt-BR', { timeZone: 'UTC' })) + '.json';
            console.log(FileSystem.documentDirectory);
            console.log(filename);
            // Write the JSON string to a file
            await FileSystem.writeAsStringAsync(fileUri, jsonString);

            Alert.alert('Arquivo Salvo', `Arquivo salvo em: \n` + fileUri);
            //return fileUri;  // Return the file path for further use if needed
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar arquivo:\n' + error);

            throw error;  // Rethrow error for handling outside
        }

        try {
            // Converte o array para uma string JSON
            const jsonString = JSON.stringify(array);
        
            // Caminho do arquivo no diretório de documentos
            const fileUri = FileSystem.documentDirectory +  filename + new Date(Date.now('pt-BR', { timeZone: 'UTC' })) + '.json';
        
            // Grava a string JSON no arquivo
            await FileSystem.writeAsStringAsync(fileUri, jsonString);
        
            console.log('Arquivo salvo com sucesso no diretório de documentos:', fileUri);
        
            // Agora, compartilhe o arquivo (permitindo ao usuário escolher o destino)
            if (await Sharing.isAvailableAsync()) {
              await Sharing.shareAsync(fileUri);
              console.log('O arquivo foi compartilhado.');
            } else {
              console.log('O compartilhamento não está disponível neste dispositivo.');
            }
        
            // Retorna o URI do arquivo para uso posterior
            return fileUri;
          } catch (error) {
            console.error('Erro ao salvar o arquivo:', error);
            throw error;  // Relança o erro para ser tratado fora da função
          }

        };


        IMPORT FILE







        const importData = async () => {
        try {
            // Permite que o usuário escolha um arquivo
            const result = await DocumentPicker.getDocumentAsync({
              type: 'application/json', // Opcional: Restringe para arquivos JSON
            });
        
            /*const result = await FileSystem.downloadAsync({
                type: 'application/json', // Opcional: Restringe para arquivos JSON
              });
            // Verifica se o usuário cancelou o seletor de documentos
            if (result.type === 'cancel') {
                console.log('Usuário cancelou a escolha do arquivo');
                return null;
              }
          
              // Obtém o URI do arquivo escolhido
              const fileUri = result.uri;
          
              // Lê o conteúdo do arquivo como uma string
              const fileContents = await FileSystem.readAsStringAsync(fileUri);
          
              // Converte a string JSON de volta para um array
              const importedArray = JSON.parse(fileContents);
          
              console.log('Arquivo importado com sucesso:\n', importedArray);
              Alert.alert("array", importedArray);
              return importedArray;  // Retorna o array
            } catch (error) {
              console.error('Erro ao importar o arquivo:', error);
              Alert.alert('Erro', 'Erro ao importar o arquivo:\n', error);
              throw error;  // Relança o erro para ser tratado fora da função
            }
        };
  
  
  
  font functions
  
        const fontHandler = () => {
        if (fontSize <= 40) {

            Alert.alert(
                //This is title
                "Mudança de tamanho de fonte",
                //This is body text
                "Deseja alterar a fonte para " + fontSize + "?",
                [
                    { text: 'Sim', onPress: () => saveFontsize(fontSize) },
                    { text: 'Não', style: 'cancel' },
                ],
            );
            handleCancel();
        }
        else if (fontSize < 5) {
            Alert.alert('Erro', 'O numero escolhido é menor que o minimo permitido (5)');
        }
        else {
            Alert.alert('Erro', 'O numero escolhido está incorreto ou execede o maximo permitido (40)');
        }

    };

    function saveFontsize(fontSize) {
        GlobalFontsize = fontSize;
        console.log("globalfz: " + GlobalFontsize);
        setItem("fontsize", fontSize);
    }
 */