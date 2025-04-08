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
    { id: "1", title: "Anime", imageUrl: "https://i.pinimg.com/736x/0f/e6/49/0fe6495c2f0ffe1b753cc0ab4b4f8de1.jpg"},
    { id: "2", title: "Max Factory", imageUrl: "https://i.pinimg.com/736x/5e/c9/e2/5ec9e2efdd77f0c90126ea1b812762db.jpg"},
    { id: "3", title: "Mecas", imageUrl: "https://i.pinimg.com/736x/98/e2/9c/98e29c200986e4280accf96ddd05a47d.jpg"},
    { id: "4", title: "Juguetes", imageUrl: "https://i.pinimg.com/736x/3d/f7/a1/3df7a1ad76a2bfd7e51e00ffb8b90a13.jpg"},
];

const carouselImages = [
    "https://i.pinimg.com/736x/82/b1/bc/82b1bc7a317a2d366495a52105bd82f1.jpg",
    "https://i.pinimg.com/736x/2b/74/ea/2b74ea0945047f551482731059a8fb1f.jpg",
    "https://i.pinimg.com/736x/76/b1/f7/76b1f7e88a85b1f957ebc5da70e82090.jpg",
    "https://i.pinimg.com/736x/a7/57/59/a75759cdfa03a19f3b6df9eb890418cd.jpg",
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
        padding: 10,
        width: width -40,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25,
        position: 'relative',
    },
    carouselImage: {
        width: width - 30,
        height: '100%',
        borderRadius: 20,
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