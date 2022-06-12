import React, {Fragment, useCallback, useEffect, useRef} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../assets/images';
import colors from '../../assets/themes/colors';
import Button from '../../components/Button';
import ModalPokemon, {
  ModalPokemonHandle,
} from '../../components/modal/ModalPokemon';
import PillType from '../../components/PillType';
import getListPokemon from '../../store/actions/getListPokemon';
import getType from '../../store/actions/getType';
import {getLoadingState, getPokemons} from '../../store/selectors';
import {Pokemon} from '../../types/api';

const Home = () => {
  const dispatch = useDispatch();
  const flatListRef = useRef<FlatList<Pokemon>>(null);
  const modalRef = useRef<ModalPokemonHandle>(null);
  const pokemons = useSelector(getPokemons);
  const loading = useSelector(getLoadingState('getListPokemon'));

  const onLoadmore = useCallback(() => {
    if (!loading) {
      dispatch(getListPokemon.action());
    }
  }, [dispatch, loading]);

  const onClickPoke = useCallback(() => {
    flatListRef.current?.scrollToIndex({
      index: 0,
      animated: true,
      viewPosition: 0.7,
    });
  }, []);

  useEffect(() => {
    onLoadmore();
    dispatch(getType.action());
  }, [dispatch, onLoadmore]);

  const renderItem = useCallback(
    (props: {item: Pokemon; index: number}) => (
      <CardPokemon {...props} onPress={modalRef.current?.show} />
    ),
    [],
  );

  return (
    <ImageBackground source={images.background} resizeMode="repeat">
      <FlatList
        ref={flatListRef}
        ListHeaderComponent={
          <Fragment>
            <View style={styles.wrapHome}>
              <Image
                source={images.image}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.title}>
                All the Pokémon data you'll ever need in one place!
              </Text>
              <Text style={styles.desc}>
                Thousands of data compiled into one place
              </Text>
              <Button color={colors.yellow[700]} onPress={onClickPoke}>
                Check PokèDex
              </Button>
            </View>
            <View style={styles.wrapHeaderPoke}>
              <Text style={styles.titlePoke}>PokèDex</Text>
              <Text style={styles.descPoke}>
                All Generation totaling 999999 Pokemon
              </Text>
            </View>
          </Fragment>
        }
        ListFooterComponent={
          <Fragment>
            {loading && (
              <Text style={[styles.center, styles.descPoke]}>Loading...</Text>
            )}
          </Fragment>
        }
        onEndReached={onLoadmore}
        onEndReachedThreshold={0.1}
        data={pokemons}
        renderItem={renderItem}
      />
      <ModalPokemon ref={modalRef} />
    </ImageBackground>
  );
};

const CardPokemon: React.FC<{
  item: Pokemon;
  index: number;
  onPress?: (id: number) => void;
}> = ({item: {sprites, id, name, types}, onPress}) => {
  const handleClick = useCallback(() => {
    onPress?.(id);
  }, [id, onPress]);

  return (
    <TouchableOpacity
      style={styles.wrapCard}
      activeOpacity={0.8}
      onPress={handleClick}>
      <Image
        source={{uri: sprites.front_default || ''}}
        style={styles.imageCard}
      />
      <Text style={styles.idCard}>#{id}</Text>
      <Text style={styles.nameCard}>{name}</Text>
      <View style={styles.wrapTypeCard}>
        {types.map(({type}) => (
          <PillType type={type} style={styles.pill} />
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapHome: {
    backgroundColor: colors.neutral[100],
    alignItems: 'flex-start',
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  image: {
    width: '90%',
    height: 305,
    marginLeft: 'auto',
    marginBottom: 35,
  },
  title: {
    color: colors.neutral[500],
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 16,
  },
  desc: {
    color: colors.neutral[400],
    fontSize: 20,
    marginBottom: 32,
  },
  wrapHeaderPoke: {
    padding: 24,
  },
  titlePoke: {
    color: colors.neutral[700],
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descPoke: {
    color: colors.neutral[700],
    fontSize: 20,
    textAlign: 'center',
  },
  center: {textAlign: 'center'},

  //#region card pokemon
  wrapCard: {
    backgroundColor: colors.neutral[100],
    borderRadius: 24,
    paddingHorizontal: 35,
    paddingVertical: 25,
    marginHorizontal: 45,
    marginBottom: 25,
  },
  imageCard: {
    width: '100%',
    minWidth: 200,
    aspectRatio: 1,
    marginBottom: 10,
  },
  idCard: {
    color: colors.neutral[400],
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '700',
  },
  nameCard: {
    color: colors.neutral[700],
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  wrapTypeCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    marginRight: 8,
  },
  //#endregion
});
