import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Shipments = () => {
  const [selectedOption, setSelectedOption] = useState('fedex');
  const [address, setAddress] = useState('Durango - Mezquital, 34308 Gabino Santillán, Dgo.');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [tempAddress, setTempAddress] = useState('');

  const products = [
    {
      id: '1',
      name: 'PlayStation 5',
      weight: '4.5 kg',
      dimensions: '39cm x 26cm x 10cm',
      fragile: true,
      specialInstructions: 'Manejar con cuidado - electrónico delicado'
    },
    {
      id: '2',
      name: 'Jarrón de cerámica',
      weight: '2.1 kg',
      dimensions: '30cm x 30cm x 40cm',
      fragile: true,
      specialInstructions: 'Empaque especial requerido - extremadamente frágil'
    }
  ];

  const carriers = [
    {
      id: 'fedex',
      name: 'FedEx Express',
      price: '$99',
      deliveryTime: '1-2 días',
      icon: 'rocket-outline',
    },
    {
      id: 'dhl',
      name: 'DHL Estándar',
      price: '$59',
      deliveryTime: '3-5 días',
      icon: 'boat-outline',
    },
    {
      id: 'correos',
      name: 'Correos Económico',
      price: 'Gratis',
      deliveryTime: '7-10 días',
      icon: 'mail-outline',
    },
  ];

  const handleConfirm = () => {
    const selected = carriers.find(item => item.id === selectedOption);
    alert(`¡Envío confirmado!\n\nTransportista: ${selected.name}\nDirección: ${address}`);
  };

  const handleChangeAddress = () => {
    if (showAddressForm) {
      if (tempAddress) {
        setAddress(tempAddress);
      }
      setShowAddressForm(false);
    } else {
      setTempAddress(address);
      setShowAddressForm(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Opciones de Envío</Text>
          
          {/* Sección de dirección */}
          <View style={styles.addressCard}>
            <Ionicons name="location" size={20} color="#4CAF50" />
            {showAddressForm ? (
              <TextInput
                style={styles.addressInput}
                value={tempAddress}
                onChangeText={setTempAddress}
                placeholder="Nueva dirección"
              />
            ) : (
              <Text style={styles.addressText}>{address}</Text>
            )}
            <TouchableOpacity onPress={handleChangeAddress}>
              <Text style={styles.changeText}>
                {showAddressForm ? 'Guardar' : 'Cambiar'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Productos a enviar</Text>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Peso:</Text>
                <Text>{product.weight}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Dimensiones:</Text>
                <Text>{product.dimensions}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Frágil:</Text>
                <Text>{product.fragile ? 'Sí' : 'No'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Instrucciones:</Text>
                <Text>{product.specialInstructions}</Text>
              </View>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Método de envío</Text>
          {carriers.map((carrier) => (
            <TouchableOpacity
              key={carrier.id}
              style={[
                styles.carrierCard,
                selectedOption === carrier.id && styles.selectedCarrier,
              ]}
              onPress={() => setSelectedOption(carrier.id)}
            >
              <Ionicons 
                name={carrier.icon} 
                size={32} 
                color={selectedOption === carrier.id ? '#4CAF50' : '#666'} 
                style={styles.carrierIcon}
              />
              <View style={styles.carrierInfo}>
                <Text style={styles.carrierName}>{carrier.name}</Text>
                <Text style={styles.carrierTime}>⏱️ {carrier.deliveryTime}</Text>
              </View>
              <Text style={styles.carrierPrice}>{carrier.price}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumen</Text>
            <View style={styles.summaryRow}>
              <Text>Subtotal:</Text>
              <Text>$3,499</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Envío:</Text>
              <Text>{carriers.find(c => c.id === selectedOption)?.price}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalText}>
                ${selectedOption === 'correos' ? '3,499' : '3,598'}
              </Text>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmar Envío</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  addressText: {
    flex: 1,
    marginLeft: 10,
    color: '#555',
  },
  addressInput: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  changeText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
    color: '#444',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  specRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  specLabel: {
    fontWeight: '600',
    width: 100,
  },
  carrierCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedCarrier: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0F9F0',
  },
  carrierIcon: {
    marginRight: 12,
  },
  carrierInfo: {
    flex: 1,
  },
  carrierName: {
    fontWeight: '600',
    color: '#333',
  },
  carrierTime: {
    fontSize: 12,
    color: '#888',
  },
  carrierPrice: {
    fontWeight: 'bold',
    color: '#4CAF50',
    fontSize: 16,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Shipments;