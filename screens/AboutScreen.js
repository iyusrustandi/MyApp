import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, ImageBackground, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import backgroundImg from '../assets/background.png';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const AboutScreen = () => {
  const [aboutData, setAboutData] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, membersRes] = await Promise.all([axios.get('https://jaktourband.vercel.app/api/about.json'), axios.get('https://jaktourband.vercel.app/api/member.json')]);

        setAboutData(aboutRes.data);
        setMembers(membersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="About Us" />

      <ImageBackground source={backgroundImg} style={styles.background}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            {/* Gambar dari API */}
            {aboutData?.image && <Image source={{uri: aboutData.image}} style={styles.heroImage} />}

            {/* About Description */}
            <Text style={styles.description}>{aboutData?.description}</Text>

            {/* Members Section */}
            <Text style={styles.sectionTitle}>Meet the Band</Text>
            <FlatList
              data={members}
              keyExtractor={(item) => item.name}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.memberList}
              renderItem={({item}) => (
                <View style={styles.memberCard}>
                  <Image source={{uri: item.image}} style={styles.memberImage} />
                  <Text style={styles.memberName}>{item.name}</Text>
                  <Text style={styles.memberRole}>{item.role}</Text>
                  <View style={styles.socialIcons}>
                    {item.facebook && (
                      <TouchableOpacity onPress={() => console.log('Facebook:', item.facebook)}>
                        <Icon name="logo-facebook" size={24} color="#3b5998" style={styles.icon} />
                      </TouchableOpacity>
                    )}
                    {item.instagram && (
                      <TouchableOpacity onPress={() => console.log('Instagram:', item.instagram)}>
                        <Icon name="logo-instagram" size={24} color="#E1306C" style={styles.icon} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            />
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  loader: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  heroImage: {
    width: width * 1,
    height: width * 0.5,
    borderRadius: 4,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 50,
    marginBottom: 10,
  },
  memberList: {
    paddingHorizontal: 10,
  },
  memberCard: {
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    width: width * 0.4,
  },
  memberImage: {
    width: width * 0.4,
    height: width * 0.8,
    borderRadius: 4,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  memberRole: {
    fontSize: 14,
    color: '#aaa',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default AboutScreen;
