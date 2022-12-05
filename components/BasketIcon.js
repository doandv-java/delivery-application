import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectBasketItems, selectBasketTotal} from '../features/basketSlice';
import {useNavigation} from '@react-navigation/native';
import {CurrencyDollarIcon} from 'react-native-heroicons/mini';

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-2">
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <View className="flex-row items-center space-x-1">
          <Text className="text-lg text-white font-extrabold">
            {basketTotal}
          </Text>
          <CurrencyDollarIcon size={15} color="#00CCBB" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;