import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
const App = () => {
  //#region States
  //definir citas
  const [citas, setCitas] = useState([]);
  //mostrar y guardar mostrar
  const [mostrarForm, setMostrarForm] = useState(true);

  //#endregion
  //Eliminar pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => citasActuales.filter((cita) => cita.id !== id));
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }
  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <TouchableHighlight
          style={styles.btnMostrarForm}
          onPress={() => { mostrarForm ? setMostrarForm(false) : setMostrarForm(true) }}
        >
          <Text style={styles.txtBtnMostrarForm}>{mostrarForm ? 'Mostrar Citas' : 'Mostrar Formulario'}</Text>
        </TouchableHighlight>
        <View style={styles.contenido}>
          {mostrarForm
            ? (
              <Formulario
                citas={citas}
                setCitas={setCitas}
                setMostrarForm={setMostrarForm}
              />
            )
            : (
              <>
                <Text style={styles.titulo}>
                  {citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}
                </Text>
                <FlatList
                  data={citas}
                  renderItem={({ item }) => (
                    <Cita item={item} eliminarPaciente={eliminarPaciente} />
                  )}
                  keyExtractor={(cita) => cita.id}
                />
              </>
            )
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#b088f9',
    flex: 1,
    padding: 5,
  },
  titulo: {
    paddingTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  contenido: {
    flex: 1,
    marginHorizontal: '1.5%',
  },
  listado: {
    flex: 1
  },
  btnMostrarForm: {
    width: '100%',
    backgroundColor: '#da9ff9',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#98acf8',
    marginVertical: 10,
  },
  txtBtnMostrarForm: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default App;
