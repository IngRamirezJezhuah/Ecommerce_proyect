import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Colores del tema
const colors = {
  primary: '#4CAF50',
  secondary: '#FF5722',
  white: '#FFFFFF',
  gray: '#9E9E9E',
  danger: '#F44336',
  background: '#F8F9FA',
  text: '#333333'
};

const Cart = () => {
    const [cart, setCart] = useState([
        { 
          id: '1', 
          name: 'Smartphone X Pro', 
          price: 199, 
          imageUrl: 'https://picsum.photos/200/200?random=1',
          quantity: 1 
        },
        { 
          id: '2', 
          name: 'Laptop Elite', 
          price: 999, 
          imageUrl: 'https://picsum.photos/200/200?random=2',
          quantity: 1 
        },
    ]);

    const handleRemoveItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        Alert.alert('Producto Eliminado', 'El producto ha sido eliminado del carrito.');
    };

    const updateQuantity = (id, action) => {
        setCart(cart.map(item => {
            if(item.id === id) {
                return {
                    ...item,
                    quantity: action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1)
                };
            }
            return item;
        }));
    };

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                
                <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                        onPress={() => updateQuantity(item.id, 'decrease')}
                        style={styles.quantityButton}
                    >
                        <Ionicons name="remove" size={16} color={colors.primary} />
                    </TouchableOpacity>
                    
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    
                    <TouchableOpacity 
                        onPress={() => updateQuantity(item.id, 'increase')}
                        style={styles.quantityButton}
                    >
                        <Ionicons name="add" size={16} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <TouchableOpacity 
                onPress={() => handleRemoveItem(item.id)} 
                style={styles.removeButton}
            >
                <MaterialCommunityIcons name="trash-can-outline" size={24} color={colors.danger} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Mi Carrito</Text>

                {cart.length === 0 ? (
                    <View style={styles.emptyCartContainer}>
                        <MaterialCommunityIcons 
                            name="cart-remove" 
                            size={80} 
                            color={colors.gray} 
                            style={styles.emptyIcon}
                        />
                        <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
                        <Text style={styles.emptyCartSubtext}>Explora nuestros productos</Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={cart}
                            renderItem={renderCartItem}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                            contentContainerStyle={styles.listContainer}
                        />
                        
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal:</Text>
                                <Text style={styles.summaryValue}>${calculateTotal()}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Envío:</Text>
                                <Text style={styles.summaryValue}>$5.99</Text>
                            </View>
                            <View style={[styles.summaryRow, styles.totalRow]}>
                                <Text style={styles.totalLabel}>Total:</Text>
                                <Text style={styles.totalValue}>
                                    ${(parseFloat(calculateTotal()) + 5.99).toFixed(2)}
                                </Text>
                            </View>
                            
                            <TouchableOpacity 
                                style={styles.checkoutButton}
                                onPress={() => alert('Procediendo al pago')}
                            >
                                <Text style={styles.checkoutButtonText}>Pagar Ahora</Text>
                                <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.primary,
        marginBottom: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: colors.primary + '20',
        borderRadius: 6,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: '500',
    },
    removeButton: {
        justifyContent: 'center',
        paddingLeft: 10,
    },
    emptyCartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyIcon: {
        marginBottom: 20,
    },
    emptyCartText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.gray,
        marginBottom: 8,
    },
    emptyCartSubtext: {
        fontSize: 14,
        color: colors.gray,
    },
    summaryCard: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: colors.gray,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '500',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: colors.background,
        paddingTop: 12,
        marginTop: 8,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
    },
    checkoutButton: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        padding: 16,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 16,
        marginRight: 8,
    },
    listContainer: {
        paddingBottom: 20,
    },
});

export default Cart;