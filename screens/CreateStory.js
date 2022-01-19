import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TextInput
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker'

let customFonts = {
    'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class CreateStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            previewImage: 'image_1',
            dropDownHeight: 40
        };
    }
    async loadFontAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this.loadFontAsync();
    }

    render() {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
        } else {
            let preview_image = {
                image_1: require('../assets/story_image_1.png'),
                image_2: require('../assets/story_image_2.png'),
                image_3: require('../assets/story_image_3.png'),
                image_4: require('../assets/story_image_4.png'),
                image_5: require('../assets/story_image_5.png')

            };
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image
                                source={require('../assets/logo.png')}
                                style={styles.iconImage}></Image>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={styles.appTitleText}> New Story </Text>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <ScrollView>
                            <Image style={styles.previewImage}
                                source={preview_image[this.state.previewImage]} />
                            <View style={{ height: RFValue(this.state.dropDownHeight) }}>
                                <DropDownPicker
                                    items={[
                                        { label: 'Image 1', value: 'image_1' },
                                        { label: 'Image 2', value: 'image_2' },
                                        { label: 'Image 3', value: 'image_3' },
                                        { label: 'Image 4', value: 'image_4' },
                                        { label: 'Image 5', value: 'image_5' }
                                    ]}
                                    defaultValue={this.state.previewImage}
                                    containerStyle={{
                                        height: 40,
                                        borderRadius: 20,
                                        marginBottom: 10
                                    }}
                                    onOpen={() => {
                                        this.setState({ dropDownHeight: 170 })
                                    }}

                                    onClose={() => {
                                        this.setState({ dropDownHeight: 40 })
                                    }}

                                    style={{ backgroundColor: "transparent" }}
                                    itemStyle={{
                                        justifyContent: "flex-start"
                                    }}
                                    dropDownStyle={{ backgroundColor: "#2f345d" }}
                                    labelStyle={{
                                        color: "white",
                                        fontFamily: "Bubblegum-Sans"
                                    }}
                                    arrowStyle={{
                                        color: "white",
                                        fontFamily: "Bubblegum-Sans"
                                    }}

                                    onChangeItem={(item) => {
                                        this.setState({ previewImage: item.value })
                                    }}

                                />
                            </View>
                            <TextInput onChangeText={(title) => {
                                this.setState({ title })
                            }}
                                style={styles.inputFont}
                                placeholder={'TITLE'}
                                placeholderTextColor={'white'}
                            />
                            <TextInput onChangeText={(description) => {
                                this.setState({ description })
                            }}
                                style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                placeholder={'DESCRIPTION'}
                                placeholderTextColor={'white'}
                                multiline={true}
                                numberOfLines={4}
                            />
                            <TextInput onChangeText={(story) => {
                                this.setState({ story })
                            }}
                                style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                placeholder={'STORY'}
                                placeholderTextColor={'white'}
                                multiline={true}
                                numberOfLines={20}
                            />
                            <TextInput onChangeText={(moral) => {
                                this.setState({ moral })
                            }}
                                style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                placeholder={'MORAL OF THE STORY'}
                                placeholderTextColor={'white'}
                                multiline={true}
                                numberOfLines={4}
                            />


                        </ScrollView>
                    </View>
                    <View style={{ flex: 0.08 }} />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15193c',
    },
    droidSafeArea: {
        marginTop:
            Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
    },
    appTitle: {
        flex: 0.07,
        flexDirection: 'row',
    },
    appIcon: {
        flex: 0.3,
        justifyContent: 'center',
        // alignItems: "center"
    },
    iconImage: {
        width: '100%',
        height: '100%',
        marginLeft: 10,
        resizeMode: 'contain',
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: 'center',
    },
    appTitleText: {
        color: 'white',
        fontSize: RFValue(28),
        fontFamily: 'Bubblegum-Sans',
    },
    fieldContainer: {
        flex: 0.85,
    },
    previewImage: {
        width: '93%',
        height: RFValue(250),
        alignSelf: 'center',
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: 'contain',
    },
    inputFont: {
        height: RFValue(40),
        borderColor: 'white',
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: 'white',
        fontFamily: 'Bubblegum-Sans',

    },
    inputFontExtra: {
        marginTop: RFValue(25),
    },
    inputTextBig: {
        textAlignVertical: 'top',
        padding: RFValue(5),
    },
});
