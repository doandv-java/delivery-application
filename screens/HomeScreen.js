import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  TextInput,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../sanity';

function HomeScreen() {
  const navigation = useNavigation();

  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="featured"]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }`,
      )
      .then(data => {
        setFeaturedCategories(data);
      });
  }, []);
  return (
    <SafeAreaView className="bg-white pt-5">
      {/*  Headers*/}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{uri: 'https://links.papareact.com/wru'}}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/*  End Header*/}

      {/*  Search*/}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 items-center">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput placeholder="Search restaurants" keyboardType="default" />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" size={30} />
      </View>
      {/*  End Search*/}

      {/*  Body*/}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{paddingBottom: 100}}>
        {/*  Categories*/}
        <Categories />
        {/*  End Categories*/}

        {/*  Featured rows*/}
        {featuredCategories?.map(category => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
        {/*  End Featured row*/}
      </ScrollView>
      {/*  End Body*/}
    </SafeAreaView>
  );
}

export default HomeScreen;
