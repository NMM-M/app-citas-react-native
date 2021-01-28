import React, { useState } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button, Alert, ScrollView
} from 'react-native';
import shortid from 'shortid';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Formulario = ({ citas, setCitas, setMostrarForm }) => {

  //#region definicion de states
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  //#endregion

  //#region  Muestra u oculta el datePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateConfirm = (date) => {
    let opciones = { year: 'numeric', month: 'long', day: '2-digit' };
    setFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };
  //#endregion

  //#region Muestra o oculta el timePicker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (Time) => {
    let opciones = { hour: 'numeric', minute: '2-digit' }
    setHora(Time.toLocaleTimeString('es-ES', opciones))
    hideTimePicker();
  };
  //#endregion

  //Funcion crear nueva cita

  const crearNuevaCita = () => {
    //Validar campos
    if (paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || sintomas.trim() === '' ||
      fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
      mostrarAlerta();
      return;
    }
    //crear nueva Cita
    const cita = { paciente, propietario, telefono, fecha, hora, sintomas };
    cita.id = shortid.generate();
    //enviar cita al state de formulario principal

    const citasNuevas = [...citas, cita];
    setCitas(citasNuevas);
    //ocultar Formulario
    setMostrarForm(false);

  }
  //Aparece al fallar la validacion
  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //titulo
      'Todos los campos son obligatorios', // cuerpo de la alerta
      [{
        text: 'OK' //opciones
      }]

    )
  }


  return (
    <>
      <ScrollView style={style.formulario}>
        <Text style={style.titulo}>Crear nueva cita</Text>
        <View>
          <Text style={style.label}>Nombre Paciente:</Text>
          <TextInput
            style={style.input}
            onChangeText={texto => setPaciente(texto)}
          />
        </View>
        <View>
          <Text style={style.label}>Nombre dueño:</Text>
          <TextInput
            style={style.input}
            onChangeText={(texto) => setPropietario(texto)}
          />
        </View>
        <View>
          <Text style={style.label}>Telefono contacto:</Text>
          <TextInput
            style={style.input}
            keyboardType="numeric"
            onChangeText={texto => setTelefono(texto)}
          />
        </View>
        <View>
          <Text style={style.label}>Fecha:</Text>
          <Button title={fecha ? `${fecha}` : 'Seleccionar Calendario'} onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
            locale='es_ES'
            headerTextIOS="Elige una fecha"
          />
        </View>
        <View>
          <Text style={style.label}>Hora:</Text>
          <Button title={hora ? `${hora}` : 'Seleccionar Horario'} onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
            locale='es_ES'
            headerTextIOS="Elige una hora"
          />
        </View>
        <View>
          <Text style={style.label}>Sintomas:</Text>
          <TextInput
            style={style.input}
            autoCorrect
            multiline
            onChangeText={texto => setSintomas(texto)}
          />
        </View>
        <TouchableHighlight
          style={[style.btnSubmit]}
          onPress={() => crearNuevaCita()}
        >
          <Text style={style.txtBtn}>Aceptar</Text>
        </TouchableHighlight>
      </ScrollView>
    </>
  );
};
//#region estilos
const style = StyleSheet.create({
  formulario: {
    backgroundColor: '#da9ff9',
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 5,
    backgroundColor: '#fcf8ec',
    paddingHorizontal: 10,
    borderRadius: 6,
    fontSize: 18,
  },
  btnSubmit: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#da9ff9',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#98acf8'
  },
  txtBtn: {
    fontSize: 20,
    color: '#FFF',
  },
  titulo: {
    paddingTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
});
//#endregion estilos
export default Formulario;
