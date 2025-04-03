import React, { useState, useRef } from 'react';
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, 
  SafeAreaView, TextInput, Alert, Dimensions, Image, ScrollView, Animated 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import OfferCard from '../components/OfferCard';

// 1. Definir colores primero
const colors = {
  primary: '#4CAF50',
  secondary: '#FF5722',
  white: '#FFFFFF',
  gray: '#757575',
  danger: '#F44336',
  background: '#F8F9FA',
  text: '#212121',
  lightGray: '#E0E0E0'
};

const products = [{ id: '1', name: 'PlayStation 5', price: '12,999', imageUrl: 'https://png.pngtree.com/png-clipart/20250104/original/pngtree-ps-5-or-playstation-set-with-game-controller-png-image_19792765.png', description: 'Consola de última generación con SSD ultrarrápido, soporte para 4K/120fps y tecnología haptic feedback en los mandos.',category: 'Electrónicos',rating: 4.9,inStock: true},
    { id: '2', name: 'Zapatillas Running', price: '1,499', imageUrl: 'https://w7.pngwing.com/pngs/253/472/png-transparent-sneakers-nike-shoe-clothing-blue-running-shoes-blue-white-fashion.png', description: 'Zapatillas deportivas con amortiguación reactiva y diseño ergonómico para máximo confort en tus carreras.',category: 'Deportes',rating: 4.5,inStock: true},
    { id: '3', name: 'Smart TV 55" 4K', price: '9,999', imageUrl: 'https://png.pngtree.com/png-vector/20230902/ourmid/pngtree-realistic-led-tv-png-image_9935632.png', description: 'Televisor inteligente con resolución 4K UHD, HDR10+ y sistema operativo integrado con acceso a todas las plataformas de streaming.',category: 'Electrónicos',rating: 4.7,inStock: false},
    { id: '4', name: 'Set de Cocina Premium', price: '2,499', imageUrl: 'https://img.freepik.com/foto-gratis/coleccion-vajilla-vista-superior_23-2148861770.jpg', description: 'Juego de 12 piezas de acero inoxidable 18/10 con mangos ergonómicos antiadherentes.',category: 'Hogar',rating: 4.8,inStock: true}];

const offers = [{ id: '1', title: '30% OFF EN ELECTRÓNICOS', imageUrl: 'https://png.pngtree.com/element_our/20190524/ourmid/pngtree-2-5d-electronic-device-laptop-vector-element-image_1101889.jpg', cardcolor: '#FF5722'},
    { id: '2', title: 'ENVÍO GRATIS + 10% OFF', imageUrl: 'https://w7.pngwing.com/pngs/877/52/png-transparent-freight-transport-rail-transport-logo-parcel-free-shipping-freight-transport-text-rectangle-thumbnail.png', cardcolor: '#2196F3'},
    { id: '3', title: '2X1 EN HOGAR', imageUrl: 'https://w7.pngwing.com/pngs/86/825/png-transparent-couch-furniture-textile-cushion-chair-home-furniture-angle-fashion-grey-thumbnail.png', cardcolor: '#4CAF50'}];

const categories = ['Todos', 'Electrónicos', 'Deportes', 'Hogar', 'Ropa'];

const ProductList = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    const getFilteredProducts = () => {
        return products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === item && styles.selectedCategoryButton
          ]}
          onPress={() => setSelectedCategory(item)}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === item && styles.selectedCategoryText
          ]}>
            {item}
          </Text>
        </TouchableOpacity>
    );

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true
            })
        ]).start();
    };

    const closeModal = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 150,
                useNativeDriver: true
            })
        ]).start(() => setModalVisible(false));
    };

    const handleAddToCart = (product) => {
        Alert.alert('✅ Añadido', `${product.name} se agregó al carrito`);
        closeModal();
    };

    const filteredProducts = getFilteredProducts();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.user}>Hola, Usuario</Text>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color={colors.gray} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar productos..."
                            placeholderTextColor={colors.gray}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Ofertas especiales</Text>
                <FlatList
                    data={offers}
                    renderItem={({ item }) => <OfferCard details={item} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.offersContainer}
                />

                <Text style={styles.sectionTitle}>Categorías</Text>
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                />

                <View style={styles.productsHeader}>
                    <Text style={styles.sectionTitle}>Productos</Text>
                    <Text style={styles.productCount}>{filteredProducts.length} items</Text>
                </View>

                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => (
                        <ProductCard 
                            product={item} 
                            onPress={() => openModal(item)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.productsGrid}
                    scrollEnabled={false}
                />
            </ScrollView>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                    <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={closeModal}
                        >
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                        
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            {selectedProduct && (
                                <>
                                    <Image 
                                        source={{ uri: selectedProduct.imageUrl }} 
                                        style={styles.modalImage}
                                        resizeMode="contain"
                                    />
                                    
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                                        <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
                                    </View>
                                    
                                    <View style={styles.ratingContainer}>
                                        <Ionicons name="star" size={20} color="#FFD700" />
                                        <Text style={styles.ratingText}>{selectedProduct.rating}</Text>
                                        <Text style={styles.categoryBadge}>{selectedProduct.category}</Text>
                                    </View>
                                    
                                    <Text style={styles.sectionTitleModal}>Descripción</Text>
                                    <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
                                    
                                    <TouchableOpacity
                                        style={[
                                            styles.addToCartButton,
                                            !selectedProduct.inStock && styles.disabledButton
                                        ]}
                                        onPress={() => selectedProduct.inStock && handleAddToCart(selectedProduct)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.buttonText}>
                                            {selectedProduct.inStock ? 'Añadir al carrito' : 'Agotado'}
                                        </Text>
                                        {selectedProduct.inStock && (
                                            <MaterialCommunityIcons 
                                                name="cart-plus" 
                                                size={20} 
                                                color="white" 
                                            />
                                        )}
                                    </TouchableOpacity>
                                </>
                            )}
                        </ScrollView>
                    </Animated.View>
                </Animated.View>
            </Modal>
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
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    user: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: colors.text,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginVertical: 12,
    },
    offersContainer: {
        paddingLeft: 10,
        paddingBottom: 5,
    },
    categoriesContainer: {
        paddingLeft: 10,
        paddingBottom: 15,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.white,
        marginRight: 10,
        elevation: 2,
    },
    selectedCategoryButton: {
        backgroundColor: colors.primary,
    },
    categoryText: {
        fontSize: 14,
        color: colors.text,
    },
    selectedCategoryText: {
        color: colors.white,
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    productCount: {
        fontSize: 14,
        color: colors.gray,
    },
    productsGrid: {
        justifyContent: 'space-between',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        width: '90%',
        maxHeight: '85%',
        overflow: 'hidden',
    },
    modalContent: {
        padding: 25,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        marginBottom: 20,
        backgroundColor: '#F9F9F9',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.text,
        flex: 1,
    },
    modalPrice: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.primary,
        marginLeft: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    ratingText: {
        marginLeft: 5,
        marginRight: 15,
        fontSize: 16,
        color: colors.text,
    },
    categoryBadge: {
        fontSize: 14,
        color: colors.white,
        backgroundColor: colors.gray,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    sectionTitleModal: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray,
        marginTop: 20,
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 15,
        color: colors.text,
        lineHeight: 22,
    },
    addToCartButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 25,
        elevation: 3,
    },
    disabledButton: {
        backgroundColor: colors.lightGray,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
        marginRight: 10,
    },
});

export default ProductList;