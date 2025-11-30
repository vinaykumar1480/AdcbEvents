import ReactNativeBiometrics from "react-native-biometrics";

export const isBiometricAvailable = async () => {
  const rnBiometrics = new ReactNativeBiometrics();
  const { available } = await rnBiometrics.isSensorAvailable();
  return available;
};

export const authenticateBiometric = async () => {
  try {
    const rnBiometrics = new ReactNativeBiometrics();

    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: "Authenticate with biometrics",
      cancelButtonText: "Cancel",
    });

    return success;
  } catch (e) {
    return false;
  }
};
