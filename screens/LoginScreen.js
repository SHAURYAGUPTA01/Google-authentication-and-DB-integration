import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import firebase from 'firebase'
import * as Google from 'expo-google-app-auth';

export default class LoginScreen extends Component {

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: YOUR_CLIENT_ID_HERE,
                iosClientId: "1057660871116-4f332vrjef9b01rc3n3uevago00uo0fo.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.onSignIn(result)
                this.props.navigation.navigate('DashboardScreen')

                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    onSignIn(googleUser) {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.id_token, googleUser.accessToken);

                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential)
                    .then(function (result) {
                        if (result.additionalUserInfo.isNewUser) {
                            firebase
                                .database()
                                .ref('/users/' + result.user.uid)
                                .set({
                                    gmail: result.user.email,
                                    profile_picture: result.additionalUserInfo.profile.picture,
                                    locale: result.additionalUserInfo.profile.locale,
                                    first_name: result.additionalUserInfo.profile.given_name,
                                    last_name: result.additionalUserInfo.profile.family_name,
                                    current_theme: 'dark',
                                })
                                .then(function (snapshot) { });
                        }
                    })

                    .catch((error) => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    });

            } else {
                console.log('User already signed-in Firebase.');
            }
        });
    }
    
    isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
          const providerData = firebaseUser.providerData;
          for (let i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Sign in with Google"
                    onPress={() => this.signInWithGoogleAsync()}></Button>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
