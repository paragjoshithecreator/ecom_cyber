import {StyleSheet} from 'react-native';

export const globalColor = {
  black: '#000000',
  white: '#ffffff',
  dark: '#396',
  button: '#4682B4',
  gray: 'gray',
  gray700: '#221c30',
  accent500: '#e6b30b',
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
    color: globalColor.black,
    textAlign: 'center',
  },
  buttonView: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: globalColor.button,
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonStyles: {
    color: globalColor.white,
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
    backgroundColor: globalColor.button,
    justifyContent: 'center',
    opacity: 0.6,
  },
  inputView: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
    paddingLeft: 10,
    borderWidth: 1,
  },
  inputPassView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
    paddingLeft: 10,
    borderWidth: 1,
    paddingRight: 10,
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
    marginRight: '8%',
    color: '#000000',
  },
});
