import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const ProductCard = ({ product, onPress }) => {
    if (!product) {
        return null; // No renderiza nada si `product` es undefined
    }

    return (
        <TouchableOpacity 
            style={[styles.card, !product.inStock && styles.disabledCard]}
            activeOpacity={0.9}
            onPress={onPress}
            disabled={!product.inStock}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: product.imageUrl }} 
                    style={styles.image}
                    resizeMode="cover"
                />
                {product.rating && (
                    <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>{product.rating}</Text>
                    </View>
                )}
            </View>
            
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>${product.price}</Text>
                    {!product.inStock && (
                        <Text style={styles.stockText}>AGOTADO</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        width: screenWidth * 0.45 - 10,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    disabledCard: {
        opacity: 0.8,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#F9F9F9',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ratingBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 10,
    },
    ratingText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 3,
    },
    details: {
        padding: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
        minHeight: 40,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: '800',
        color: '#4CAF50',
    },
    stockText: {
        fontSize: 10,
        color: '#F44336',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default ProductCard;