import { StyleSheet, StatusBar, Dimensions } from "react-native";
import { GlobalStyles } from "./constants";
//import { GlobalFontsize } from '../components/Settings';
let GlobalFontsize = 20;

//console.log(GlobalFontsize);
const cellWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  /**Containers*/
  mainContainer: {
    paddingTop: StatusBar.currentHeight,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
  container: {
    padding: "1.5%",
    height: "100%",
    width: "100%",
  },
  containerHome: {
    backgroundColor: GlobalStyles.colors.primary700,
  },
  containerClients: {
    backgroundColor: GlobalStyles.colors.primary800,
  },
  containerProducts: {
    backgroundColor: GlobalStyles.colors.primary700,
  },

  /**Navigation Bar*/
  navBar: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2%",
  },
  navMenu: {
    padding: "1.5%",
    gap: "3%",
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.primary800,
    alignItems: "center",
  },
  btnMenu: {
    borderRadius: "5%",
    backgroundColor: GlobalStyles.colors.primary400,
    flex: 1,
  },
  activeButton: {
    borderRadius: "5%",
    backgroundColor: GlobalStyles.colors.primary200,
    flex: 1,
  },

  /**Button bar too add elemets */
  btnBar: {
    width: "100%",
    margin: "2%",
    backgroundColor: GlobalStyles.colors.primary400,
  },

  /**Search Container */
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  txtSearch: {
    fontSize: GlobalFontsize,
    lineHeight: GlobalFontsize * 1.2,
    color: "white",
    width: cellWidth * 0.5,
    textAlign: "center",
  },
  inputSearch: {
    backgroundColor: "#e4d9fd",
    color: "black",
    borderRadius: 6,
    fontSize: GlobalFontsize * 0.8,
    marginBottom: "1%",
    width: cellWidth * 0.45,
  },
  dropboxSearch: {
    borderRadius: 6,
    borderColor: GlobalStyles.colors.primary700,
    borderWidth: 0.5,
    backgroundColor: "#e4d9fd",
    padding: "2%",
    width: cellWidth * 0.45,
  },
  txtDropboxSearch: {
    color: "black",
    fontSize: GlobalFontsize,
    marginRight: "5%",
  },

  /** CARDS */
  cardsContainer: {
    backgroundColor: GlobalStyles.colors.primary200,
    margin: "2%",
    borderRadius: 10,
  },
  card: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 15,
    margin: "3%",
    padding: "3%",
  },
  activeCard: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 15,
    margin: "3%",
    padding: "3%",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary700,
  },
  carNav: {
    flexDirection: "row",
    gap: "5%",
    justifyContent: "space-between",
    margin: "1%",
    marginBottom: "5%",
  },

  btnCard: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: cellWidth / 2,
    borderBottomColor: "black",
    borderWidth: 1,
  },
  btnCardActive: {
    backgroundColor: GlobalStyles.colors.primary200,
    borderRadius: cellWidth / 2,
    borderBottomColor: "black",
    borderWidth: 1,
  },
  editLogo: {
    width: cellWidth * 0.09,
    height: cellWidth * 0.09,
    borderRadius: cellWidth / 2,
  },
  sendLogo: {
    width: cellWidth * 0.09,
    height: cellWidth * 0.09,
    borderRadius: cellWidth / 2,
  },
  settingsLogo: {
    width: cellWidth * 0.05,
    height: cellWidth * 0.05,
    borderRadius: cellWidth / 2,
  },
  cardLabel: {
    fontSize: GlobalFontsize,
    fontWeight: 600,
  },
  cardText: {
    fontSize: GlobalFontsize,
  },
  activeCardText: {
    color: "white",
    fontSize: GlobalFontsize,
  },
  /*Forms desing */
  form: {
    marginTop: "8%",
    backgroundColor: GlobalStyles.colors.primary100,
    padding: "3%",
    borderRadius: 15,
    flex: 1,
  },
  formRow: {
    flexDirection: "row",
    margin: "1%",
    justifyContent: "space-between",
    marginBottom: "3%",
  },
  btnSettings: {
    backgroundColor: GlobalStyles.colors.primary400,
    marginVertical: "10%",
    padding: "5%",
    borderRadius: 15,
    textAlign: "center",
  },
  formButtons: {
    flexDirection: "row",
    margin: "1%",
    marginBottom: "3%",
    justifyContent: "center",
  },

  /**Plus and Minus sign button*/
  btnInputs: {
    borderRadius: cellWidth / 2,
    backgroundColor: "#221c30",
    height: cellWidth * 0.09,
    width: cellWidth * 0.09,
    justifyContent: "center",
    marginTop: "2%",
  },
  txtBtnInputs: {
    color: "white",
    fontSize: GlobalFontsize + 7,
    fontWeight: "bold",
    textAlign: "center",
  },
  /**form nav buttons */
  btnForm: {
    backgroundColor: GlobalStyles.colors.primary400,
    marginHorizontal: "2%",
    padding: "3%",
    borderRadius: 10,
  },
  btnText: {
    fontSize: GlobalFontsize + 2,
    color: "white",
  },
  /**Checkboxes buttons */
  btnCheckboxPressed: {
    color: "black",
    backgroundColor: "#e4d9fd",
    height: cellWidth * 0.06,
    width: cellWidth * 0.06,
    justifyContent: "center",
  },
  btnCheckboxNotPressed: {
    backgroundColor: "#e4d9fd",
    height: cellWidth * 0.06,
    width: cellWidth * 0.06,
  },
  txtCheckboxes: {
    fontSize: GlobalFontsize + 2,
    textAlign: "center",
  },
  title: {
    fontSize: GlobalFontsize + 8,
    fontWeight: "bold",
    marginVertical: 24,
    textAlign: "center",
  },

  hideComponent: {
    display: "none",
  },
  header: {
    fontSize: GlobalFontsize + 2,
    fontWeight: 600,
    marginTop: "2%",
  },
  label: {
    fontSize: GlobalFontsize,
    marginBottom: "2%",
  },
});

export default styles;
