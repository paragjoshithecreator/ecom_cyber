import {Share, ToastAndroid} from 'react-native';
import {View, Text} from 'react-native';

export const showToast = rating => {
  const toastMainContianer = {
    height: 41,
    paddingLeft: 13.5,
    paddingRight: 18,
    paddingVertical: 11,
    backgroundColor: '#4B5460',
    borderRadius: 10,
  };
  rating = rating.toString();
  if (rating == 5) {
    ToastAndroid.show(` 😊 ${rating} ⭐️ Rating`, ToastAndroid.LONG);
  } else if (rating == 4) {
    ToastAndroid.show(` 🙂 ${rating} ⭐️ Rating`, ToastAndroid.LONG);
  } else if (rating == 3) {
    ToastAndroid.show(` 😌 ${rating} ⭐️ Rating`, ToastAndroid.LONG);
  } else if (rating == 2) {
    ToastAndroid.show(` 🧐 ${rating} ⭐️ Rating`, ToastAndroid.LONG);
  } else if (rating == 1) {
    ToastAndroid.show(` 😢 ${rating} ⭐️ Rating`, ToastAndroid.LONG);
  }
};
export const onShare = async image => {
  console.log(image);
  try {
    const result = await Share.share({
      message: 'Would You Like To Share...',
      url: image,
    });
    if (result.action === Share.sharedAction) {
      console.log('Shared with activity type: ', result.activityType);
      if (result.activityType) {
        // shared with activity type of result.activityType
        console.log('Shared with activity type: ', result.activityType);
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};
