import { StyleSheet, Text, TextInput, View } from 'react-native';

function Input({ label, style, textInputConfig }) {

    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: "3%",
        width:"100%"
    },
    label: {
        fontSize: 20,
        color: 'black',
        marginBottom: "2%",
    },
    input: {
        backgroundColor: '#e4d9fd',
        color: 'black',
        borderRadius: 8,
        fontSize: 20,
    },
    inputMultiline: {
        minHeight: 80,
        textAlignVertical: 'top'
    }
});
