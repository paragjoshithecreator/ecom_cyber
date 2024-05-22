import {StyleSheet} from 'react-native';
import {green} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export const globalColor = {
  black: '#000000',
  white: '#ffffff',
  dark: '#396',
  button: '#4682B4',
  gray: 'gray',
  gray700: '#221c30',
  accent500: '#e6b30b',
  orange: '#fb7200',
  green: 'green',
};

export const GlobalStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: globalColor.black,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: globalColor.black,
    textAlign: 'center',
  },
  buttonView: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: globalColor.orange,
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonStyles: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  pressable: {
    width: '90%',
    height: 50,
    marginTop: 5,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: globalColor.orange,
    justifyContent: 'center',
    opacity: 0.6,
  },
  inputView: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderColor: 'orange',
    alignSelf: 'center',
  },
  inputPassView: {
    width: '90%',
    borderRadius: 7,
    marginVertical: 10,
    paddingLeft: 10,
    borderWidth: 1,
    paddingRight: 10,
    borderColor: 'orange',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  inputColor: {
    color: globalColor.black,
  },
  image: {
    height: 20,
    width: 20,
  },
  loginHeading: {
    alignSelf: 'flex-end',
    marginRight: 10,
    color: '#000000',
    marginVertical: 10,
  },
  error: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-end',
  },
});
