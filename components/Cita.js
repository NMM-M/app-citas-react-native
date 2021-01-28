import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

const Cita = ({ item, eliminarPaciente }) => {
  const dialogoEliminar = (id) => {
    eliminarPaciente(id);
  };

  return (
    <View style={style.citas}>
      <View style={style.datos}>
        <View>
          <Text style={style.label}>Paciente:</Text>
          <Text style={style.texto}>{item.paciente}</Text>
        </View>
        <View>
          <Text style={style.label}>Propietario:</Text>
          <Text style={style.texto}>{item.propietario}</Text>
        </View>
        <View>
          <Text style={style.label}>Sintomas:</Text>
          <Text style={style.texto}>{item.sintomas}</Text>
        </View>
      </View>
      <View style={style.buttons}>
        <View>
          <TouchableHighlight style={[style.btn, style.btnEditar]}>
            <Text style={style.txtBtn}>Editar</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[style.btn, style.btnEliminar]}
            onPress={() => dialogoEliminar(item.id)}>
            <Text style={style.txtBtn}>Eliminar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  citas: {
    borderRadius: 5,
    backgroundColor: '#da9ff9',
    padding: 8,
    marginBottom: 5,
    flexDirection: 'row',
  },
  datos: {
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
    backgroundColor: '#bedcfa',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  texto: {
    fontSize: 16,
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-evenly',
    borderRadius: 5,
    backgroundColor: '#bedcfa',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btn: {
    width: '100%',
    marginBottom: 5,
    backgroundColor: '#da9ff9',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  btnEliminar: {
    backgroundColor: 'red',
  },
  btnEditar: {
    backgroundColor: '#98acf8',
  },
  txtBtn: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default Cita;
