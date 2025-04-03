import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const OfferCard = ({ details }) => {
    return (
        <View style={[styles.card, { backgroundColor: details.cardcolor }]}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{details.title}</Text>
                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => alert('Información sobre la promoción')}
                >
                    <Text style={styles.buttonText}>Conocer más</Text>
                    <MaterialIcons name="arrow-forward" size={16} color={details.cardcolor} />
                </TouchableOpacity>
            </View>
            <Image 
                source={{ uri: details.imageUrl }} 
                style={styles.image} 
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.75, 
        height: 150,
        borderRadius: 16,
        marginHorizontal: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 15,
        lineHeight: 22,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 5,
    },
    image: {
        width: 80,
        height: 80,
    },
});

export default OfferCard;