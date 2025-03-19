import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

function Dropdown({ label, style, textInputConfig }) {

    const inputStyles = [styles.input];
    const [filterClientsList, setFilterClientsList] = useState([]);
    const [client, setClient] = useState('');



    const filterClients = value => {

        let filterData =
            clientList && clientList?.length > 0
                ? clientList?.filter(data =>
                    data?.client?.toLowerCase()?.includes(value?.toLowerCase()),
                )
                : [];
        setFilterClientsList([...filterData]);
    };

    const onClientSelected = value => {
        setClient(value);
        setFilterClientsList([]);
    };

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={inputStyles}
                {...textInputConfig}

                value={client}
                placeholder={strings.selectclient}
                onChangeText={filterClients}
            />
            <FlatList
                data={filterClientsList}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => onClientSelected(item?.client)}>
                        <VariantsBox>
                            <Text >
                                {item?.client || ''}
                            </Text>
                        </VariantsBox>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.client}
            />

        </View>
    );
};

export default Dropdown;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 20,
        color: 'black',
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#e4d9fd',
        color: 'black',
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 80,
        textAlignVertical: 'top'
    }
});
