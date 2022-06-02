import React from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity ,Image} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";

const { width, height } = Dimensions.get("window");

const ALBUM_NAME = "My Pet";

const View = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color:'white';
`;


const Text = styled.Text`
    color: white;
    font-size: 22px;
`;

const IconBar = styled.View`
    margin-top: 40px;
`;

export default class MySettingTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasPermission: null,
            cameraType: Camera.Constants.Type.front,
            
        };

        this.cameraRef = React.createRef();
    }

    componentDidMount = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === "granted") {
            this.setState({ hasPermission: true });
        } else {
            this.setState({ hasPermission: false });
        }
    };

    render() {
        const { hasPermission, cameraType } = this.state;

        if (hasPermission === true) {
            return (
                <View style={styles.container}>
                   
                     <Text style={styles.pet} > <Image
              source={require("../../assets/images/foot.png")}
              style={styles.image}
            />사진찍기
                     <Image
              source={require("../../assets/images/foot.png")}
              style={styles.image}
            /></Text>
                    <Camera
                        style={{
                            top:0,
                            width: width - 40,
                            height: height / 1.7,
                            borderRadius: 10,
                            overflow: "hidden"
                        }}
                        type={cameraType}
                       
                        ref={this.cameraRef}
                    />
                    
                    <IconBar>
                
                        <TouchableOpacity onPress={this.switchCameraType}>
                            <MaterialIcons
                                name={
                                    cameraType === Camera.Constants.Type.front
                                        ? "camera-rear"
                                        : "camera-front"
                                }
                                size={44}
                                color="black"
                                
                            />
                        </TouchableOpacity>
                    </IconBar>
                
                    <TouchableOpacity
                
            activeOpacity={2}
            style={styles.box}
            onPress={ () => this.takePhoto().onclick}
            
          >
              <MaterialIcons name="pets" size={35} color= "black"  />
              <Text style={styles.pet}>찍기</Text>
              </TouchableOpacity> 

                </View>
            );
            
        } else if (hasPermission === false) {
            return (
                <View>
                    <Text>Don't have Permission for this App.</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <ActivityIndicator color="white" size={1} />
                </View>
            );
        }
        
    }

    
    switchCameraType = () => {
        const { cameraType } = this.state;

        if (cameraType === Camera.Constants.Type.front) {
            this.setState({
                cameraType: Camera.Constants.Type.back
            });
        } else {
            this.setState({
                cameraType: Camera.Constants.Type.front
            });
        }
    };
    takePhoto = async () => {
        try {
            if (this.cameraRef.current) {
                let { uri } = await this.cameraRef.current.takePictureAsync({
                    quality: 1
                });

                if (uri) {
                    this.savePhoto(uri);
                }
            }
        } catch (error) {
            alert(error);

            };
        };

    savePhoto = async uri => {
        try {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
            );

            if (status === "granted") {
                const asset = await MediaLibrary.createAssetAsync(uri);
                let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);

                if (album === null) {
                    album = await MediaLibrary.createAlbumAsync(
                        ALBUM_NAME,
                        asset
                    );
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
                }
                setTimeout(
                    () =>
                        this.setState({
                            smileDetected: false
                        }),
                    2000
                );
            } else {
                this.setState({ hasPermission: false });
            }
        } catch (error) {
            console.log(error);
        }
       
    };
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white', 
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10, 
        height: 600,
        top:30,
        borderWidth: 3, borderColor: 'skyblue', borderRadius: 10,
    },

    inputs:{
        fontSize:25, marginTop:5, color: 'skyblue',
    },

    box:{
        height:50,
        marginLeft:0,
        bottom:-20
      },
    pet:{
        fontFamily: 'garam',
        fontSize:30,
        top:-10,
        color:'black'
    },
    
  });