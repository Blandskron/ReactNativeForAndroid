import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const Login = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Por favor ingresa tu nombre de usuario y contraseña.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login exitoso, token:', data.token);
                navigation.navigate('Home');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.error || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            Alert.alert('Error', 'Hubo un problema al iniciar sesión. Intenta de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, isUsernameFocused && styles.inputFocused]}
                    placeholder="Nombre de usuario"
                    value={username}
                    onChangeText={setUsername}
                    onFocus={() => setIsUsernameFocused(true)}
                    onBlur={() => setIsUsernameFocused(false)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, isPasswordFocused && styles.inputFocused]}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>Desarrollado por Ilis Tecnología</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 16,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
    inputFocused: {
        borderColor: '#007BFF',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        fontSize: 12,
        color: '#999',
    },
});

export default Login;
