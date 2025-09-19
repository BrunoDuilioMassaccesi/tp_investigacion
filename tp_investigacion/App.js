
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';


const PAISES = [
  'Argentina', 'Brasil', 'Uruguay', 'Chile', 'Paraguay', 'Bolivia', 'Perú', 'Ecuador', 'Colombia', 'Venezuela',
  'Estados Unidos', 'Canadá', 'México', 'España', 'Francia', 'Italia', 'Alemania', 'Reino Unido', 'China', 'Japón',
  'Corea del Sur', 'India', 'Australia', 'Sudáfrica', 'Egipto', 'Rusia', 'Turquía', 'Portugal', 'Grecia', 'Suiza',
  'Suecia', 'Noruega', 'Finlandia', 'Dinamarca', 'Polonia', 'Ucrania', 'Irlanda', 'Bélgica', 'Países Bajos', 'Austria',
  'Nueva Zelanda', 'Costa Rica', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Panamá', 'Cuba', 'República Dominicana',
  'Puerto Rico', 'Venezuela', 'Arabia Saudita', 'Israel', 'Indonesia', 'Malasia', 'Singapur', 'Tailandia', 'Vietnam', 'Filipinas',
  'Marruecos', 'Nigeria', 'Kenia', 'Ghana', 'Senegal', 'Argelia', 'Túnez', 'Libia', 'Irak', 'Irán', 'Pakistán', 'Bangladesh',
  'Sri Lanka', 'Nepal', 'Camboya', 'Laos', 'Mongolia', 'Kazajistán', 'Uzbekistán', 'Afganistán', 'Qatar', 'Emiratos Árabes Unidos',
  'Kuwait', 'Omán', 'Yemen', 'Jordania', 'Líbano', 'Siria', 'Palestina', 'Sudán', 'Etiopía', 'Somalia', 'Zimbabue', 'Botsuana',
  'Namibia', 'Mozambique', 'Madagascar', 'Angola', 'Camerún', 'República del Congo', 'República Democrática del Congo', 'Gabón',
  'Chad', 'Níger', 'Malí', 'Burkina Faso', 'Benín', 'Togo', 'Costa de Marfil', 'Guinea', 'Sierra Leona', 'Liberia', 'Gambia',
  'Guinea-Bisáu', 'Guinea Ecuatorial', 'República Centroafricana', 'Ruanda', 'Burundi', 'Tanzania', 'Malaui', 'Zambia', 'Lesoto',
  'Suazilandia', 'Seychelles', 'Comoras', 'Mauricio', 'Cabo Verde', 'Santo Tomé y Príncipe', 'Islas Salomón', 'Fiyi', 'Samoa',
  'Tonga', 'Vanuatu', 'Papúa Nueva Guinea', 'Micronesia', 'Islas Marshall', 'Palaos', 'Nauru', 'Kiribati', 'Tuvalu', 'Timor Oriental'
];

export default function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [pais, setPais] = useState('');
  const [editando, setEditando] = useState(null); 
  const [nombreEdit, setNombreEdit] = useState('');
  const [edadEdit, setEdadEdit] = useState('');
  const [paisEdit, setPaisEdit] = useState('');

  const agregarAlumno = () => {
    if (!nombre || !edad || !pais) {
      alert('Error. Completa todos los campos');
      return;
    }
    // regex para letras
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre.trim())) {
      alert('Error. El nombre solo debe contener letras');
      return;
    }
    // regex num entero
    if (!/^\d+$/.test(edad.trim())) {
      alert('Error. La edad debe ser un número entero');
      return;
    }
    const paisValido = PAISES.some(
      p => p.toLowerCase() === pais.trim().toLowerCase()
    );
    if (!paisValido) {
      alert('Error. El país ingresado no existe o no es válido');
      return;
    }
    setAlumnos([
      ...alumnos,
      {
        id: Date.now().toString(),
        nombre,
        edad,
        pais,
      },
    ]);
    setNombre('');
    setEdad('');
    setPais('');
  };

  const eliminarAlumno = (id) => {
    setAlumnos(alumnos.filter(a => a.id !== id));
  };

  const iniciarEdicion = (alumno) => {
    setEditando(alumno.id);
    setNombreEdit(alumno.nombre);
    setEdadEdit(alumno.edad);
    setPaisEdit(alumno.pais);
  };

  const guardarEdicion = (id) => {
    if (!nombreEdit || !edadEdit || !paisEdit) {
      alert('Error. Completa todos los campos');
      return;
    }
    // regex letras
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombreEdit.trim())) {
      alert('Error. El nombre solo debe contener letras');
      return;
    }
    // regex num entero
    if (!/^\d+$/.test(edadEdit.trim())) {
      alert('Error. La edad debe ser un número entero');
      return;
    }
    const paisValido = PAISES.some(
      p => p.toLowerCase() === paisEdit.trim().toLowerCase()
    );
    if (!paisValido) {
      alert('Error. El país ingresado no existe o no es válido');
      return;
    }
    setAlumnos(
      alumnos.map(a =>
        a.id === id
          ? { ...a, nombre: nombreEdit, edad: edadEdit, pais: paisEdit }
          : a
      )
    );
    setEditando(null);
    setNombreEdit('');
    setEdadEdit('');
    setPaisEdit('');
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setNombreEdit('');
    setEdadEdit('');
    setPaisEdit('');
  };

  const eliminarTodos = () => {
    setAlumnos([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {editando === item.id ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombreEdit}
            onChangeText={setNombreEdit}
          />
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={edadEdit}
            onChangeText={setEdadEdit}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="País de origen"
            value={paisEdit}
            onChangeText={setPaisEdit}
          />
          <View style={styles.row}>
            <Button title="Guardar" onPress={() => guardarEdicion(item.id)} />
            <Button title="Cancelar" color="grey" onPress={cancelarEdicion} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.text}>{item.nombre} - {item.edad} años</Text>
          <Text style={styles.textSecundario}>País: {item.pais}</Text>
          <View style={styles.row}>
            <Button title="Editar" onPress={() => iniciarEdicion(item)} />
            <Button title="Eliminar" color="red" onPress={() => eliminarAlumno(item.id)} />
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Alumnos</Text>
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#aaa"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor="#aaa"
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="País de origen"
          placeholderTextColor="#aaa"
          value={pais}
          onChangeText={setPais}
        />
        <TouchableOpacity style={styles.botonAgregar} onPress={agregarAlumno}>
          <Text style={styles.textoBotonAgregar}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={alumnos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{ width: '100%', marginTop: 20 }}
        ListEmptyComponent={<Text style={styles.textoVacio}>No hay alumnos</Text>}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      {alumnos.length > 0 && (
        <TouchableOpacity style={styles.botonEliminarTodos} onPress={eliminarTodos}>
          <Text style={styles.textoBotonEliminarTodos}>Eliminar todos</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}










const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e7ef',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1e293b',
    letterSpacing: 1,
  },
  formulario: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    color: '#222',
  },
  botonAgregar: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  textoBotonAgregar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  item: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    marginBottom: 14,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 17,
    marginBottom: 2,
    color: '#22223b',
    fontWeight: '500',
  },
  textSecundario: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    gap: 10,
  },
  botonEliminarTodos: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
    width: '100%',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 2,
  },
  textoBotonEliminarTodos: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  textoVacio: {
    textAlign: 'center',
    marginTop: 30,
    color: '#888',
    fontSize: 16,
  },
});
