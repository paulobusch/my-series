import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Picker,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import { connect } from 'react-redux';

import { RNCamera } from 'react-native-camera';
import CameraRollPicker from 'react-native-camera-roll-picker';
import ImgToBase64 from 'react-native-image-base64';

import FormRow from '../components/form-row';
import { setField, saveSerie, setSerie, resetForm } from '../actions/new-serie-form';
import Slider from '@react-native-community/slider';

class NewSerieScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isCamera: false,
      isCameraRoll: false,
    }
  }

  componentDidMount() {

    const { navigation, setSerie, resetForm } = this.props;
    const { params } = navigation.state;

    if (params && params.serieToEdit) {
      setSerie(params.serieToEdit)
    } else {
      resetForm();
    }
  }

  takePicture = async() => {

    if (this.camera) {
      const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true};
      const data = await this.camera.takePictureAsync(options);

      if(data) {

        this.props.setField('img', data.base64);        

        this.setState({
          isCamera:false
        });
      }

      console.log(data.uri);
    }
  };

  viewGallery() {
    this.requestExternalStorageAccess();

    return(
      <CameraRollPicker
        maximum={1}
        selectSingleItem={true}
        
        callback={ (volta) => {
            if(volta.length > 0) {
              console.log(volta);
              ImgToBase64.getBase64String(volta[0].uri)
              .then(stringConvertida => {
                this.props.setField('img', stringConvertida)
              })
              .catch( err => {
                console.log(err)
              })
            }

            this.setState({
              isCameraRoll: false,
            })
        }}
      />
    );
  }

  async requestExternalStorageAccess() {
    try {
      const permission = await PermissionsAndroid
        .request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

      if(permission !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permissão negada');
      }

    } catch(err) {
      console.log(err);
    }
  }

  viewCamera() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'Nós precisamos de sua permissão para usar a câmera',
            buttonPositive: 'Aceito',
            buttonNegative: 'Cancelar'
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to record audio',
            message: 'Nós precisamos de sua permissão para gravar áudio',
            buttonPositive: 'Aceito',
            buttonNegative: 'Cancelar'
          }}
        />
        <View>
          <TouchableOpacity
            style={styles.capture}
            onPress={this.takePicture.bind(this)}>
            <Text>Tirar foto!</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  takePicture = async() => {
    if(this.camera) {
      const options = {quality: 0.5, base64:true, forceUpOrientation: true, fixOrientation: true };
      const data = await this.camera.takePictureAsync(options);

      if(data) {
        this.props.setField('img', data.base64);

        this.setState({
          isCamera: false,
        })
      }
    }
  }


  viewForm() {
    const { serieForm, setField, saveSerie, navigation } = this.props;

    return (
      <ScrollView>
        <FormRow>
          <TextInput
            style={styles.textinput}
            placeholder="Título"
            value={serieForm.title}
            onChangeText={value => setField('title', value)}
          />
        </FormRow>
        <FormRow>
          {
            serieForm.img ?
              <Image
                source={{ uri: `data:image/jpeg;base64,${serieForm.img}` }}
                style={styles.img}
              />
              : null
          }
          <View style={{paddingTop: 5}}>
            <Button
              title='Capturar imagem'
              onPress={() => {
                Alert.alert(
                  'Captura de imagem',
                  'De onde você quer pegar a imagem?',
                  [
                    {
                      text: 'Camera',
                      onPress: () => {
                        this.setState({
                          isCamera: true,
                        })
                      }
                    },
                    {
                      text: 'Galeria',
                      onPress: () => {
                        this.setState({
                          isCameraRoll: true,
                        })
                      }
                    }
                  ]
                )
              }} />
          </View>
        </FormRow>
        <FormRow>
          <Picker
            selectedValue={serieForm.gender}
            onValueChange={itemValue => {
              setField('gender', itemValue);
            }
            }>
            <Picker.Item label="Ação" value="Ação" />
            <Picker.Item label="Comédia" value="Comédia" />
            <Picker.Item label="Drama" value="Drama" />
            <Picker.Item label="Ficção Científica" value="Ficção Científica" />
            <Picker.Item label="Infatil" value="Infantil" />
            <Picker.Item label="Terror" value="Terror" />
          </Picker>
        </FormRow>
        <FormRow>
          <View style={styles.rate}>
            <Text>Nota: </Text>
            <Text>{serieForm.rate}</Text>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={100}
            step={5}
            value={serieForm.rate}
            onValueChange={value => {
              setField('rate', value);
            }}
          />
        </FormRow>
        <FormRow>
          <TextInput
            style={styles.textinput}
            placeholder="Descrição"
            value={serieForm.description}
            onChangeText={value => setField('description', value)}
            numberOfLines={5}
            multiline={true}
          />
        </FormRow>

        {
          this.state.isLoading ?
            <ActivityIndicator />
            :
            <Button
              title="Salvar"
              onPress={async () => {
                this.setState({ isLoading: true })

                try {
                  await saveSerie(serieForm);
                  navigation.goBack();
                } catch (error) {
                  Alert.alert('Erro', error.message);
                } finally {
                  this.setState({ isLoading: false })
                }

              }} />
        }

      </ScrollView>
    );
  }

  render() {

    if(this.state.isCameraRoll) {
      return(this.viewGallery())
    }

    if(this.state.isCamera) {
      return(this.viewCamera())
    }

    return (this.viewForm())
  }
}

const styles = StyleSheet.create({
  textinput: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  rate: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  img: {
    aspectRatio: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

const mapStateToProps = (state) => {
  return ({
    serieForm: state.serieForm
  })
}

const mapDispatchToProps = {
  setField,
  saveSerie,
  setSerie,
  resetForm
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSerieScreen);