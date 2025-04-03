import React, { useState } from 'react';
import { View, Text, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView,Platform,Dimensions } from 'react-native';

const colors = {
  primary: '#625dff',
  white: '#FFFFFF',
  background: '#f9f9f9',
  text: '#333333',
  gray: '#656568'
};

const { width } = Dimensions.get('window');

const categories = [
    { id: "1", title: "Electronica", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Laptop_der_Marke_exone_go_20240203_HOF06886_RAW-Export_000276.png/1231px-Laptop_der_Marke_exone_go_20240203_HOF06886_RAW-Export_000276.png?20240312123657"},
    { id: "2", title: "Ropa", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Shirts_of_Salem.jpg/640px-Shirts_of_Salem.jpg"},
    { id: "3", title: "Muebles", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Furniture_exhibits_in_Masfurniture%2C_Hunsur_%286%29.jpg/640px-Furniture_exhibits_in_Masfurniture%2C_Hunsur_%286%29.jpg"},
    { id: "4", title: "Juguetes", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mexican_guitars_and_toys.jpg/640px-Mexican_guitars_and_toys.jpg"},
];

const carouselImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Laptop_der_Marke_exone_go_20240203_HOF06886_RAW-Export_000276.png/1231px-Laptop_der_Marke_exone_go_20240203_HOF06886_RAW-Export_000276.png?20240312123657",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Shirts_of_Salem.jpg/640px-Shirts_of_Salem.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Furniture_exhibits_in_Masfurniture%2C_Hunsur_%286%29.jpg/640px-Furniture_exhibits_in_Masfurniture%2C_Hunsur_%286%29.jpg",
];

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const goToNextImage = () => {
        setCurrentImage((prev) => 
          prev === carouselImages.length - 1 ? 0 : prev + 1
        );
    };

    const goToPrevImage = () => {
        setCurrentImage((prev) => 
          prev === 0 ? carouselImages.length - 1 : prev - 1
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>
                        ¡Bienvenido a nuestro E-commerce!
                    </Text>
                    <Text style={styles.welcomeSubText}>
                        Descubre las mejores ofertas
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Explora nuestras categorías</Text>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.categoryItem}>
                            <Image
                                source={{ uri: item.imageUrl }}
                                style={styles.categoryImage}
                            />
                            <Text style={styles.categoryTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                />

                <Text style={styles.sectionTitle}>Galería de imágenes</Text>
                <View style={styles.carouselContainer}>
                    <Image
                        source={{ uri: carouselImages[currentImage] }} 
                        style={styles.carouselImage}
                    />
                    <TouchableOpacity 
                        onPress={goToPrevImage} 
                        style={styles.carouselButtonLeft}
                    >
                        <Text style={styles.carouselButtonText}>←</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={goToNextImage} 
                        style={styles.carouselButtonRight}
                    >
                        <Text style={styles.carouselButtonText}>→</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    welcomeContainer: {
        backgroundColor: colors.primary,
        borderRadius: 15,
        padding: 20,
        marginBottom: 25,
        marginTop: 15,
        alignItems: "center",
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.white,
        marginBottom: 5,
        textAlign: 'center'
    },
    welcomeSubText: {
        fontSize: 16,
        color: colors.white,
        fontWeight: "500",
        textAlign: 'center'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 15,
        marginTop: 10,
    },
    categoryItem: {
        alignItems: "center",
        marginRight: 15,
    },
    categoryImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#eee",
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.gray,
    },
    categoriesContainer: {
        paddingBottom: 5,
    },
    carouselContainer: {
        height: 180,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25,
        position: 'relative',
    },
    carouselImage: {
        width: width - 40,
        height: '100%',
        borderRadius: 15,
    },
    carouselButtonLeft: {
        position: 'absolute',
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselButtonRight: {
        position: 'absolute',
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselButtonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Home;