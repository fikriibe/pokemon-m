import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackList} from '../../App';
import ArrowRight from '../../assets/icons/ArrowRight';
import colors from '../../assets/themes/colors';
import RowDetailPokemon from '../../components/RowDetailPokemon';
import {useStateMount} from '../../hooks';
import getDataFromUrl from '../../store/actions/getDataFromUrl';
import {getPokemon} from '../../store/selectors';
import {DefaultItem, Pokemon, PokemonStats} from '../../types/api';

const width = Dimensions.get('window').width - 72;

const Detail = () => {
  const {params} = useRoute<RouteProp<RootStackList, 'Detail'>>();
  const pokemon = useSelector(getPokemon(params.id));

  //#region render

  const renderImage = useCallback(
    item => <Image key={item} source={{uri: item}} style={styles.imageOther} />,
    [],
  );

  const renderStat = useCallback((item: PokemonStats) => {
    return (
      <View style={styles.wrapStat} key={item.stat.name}>
        <Text style={styles.statValue}>{item.base_stat}</Text>
        <Text style={styles.statName} numberOfLines={1} ellipsizeMode="tail">
          {item.stat.name}
        </Text>
      </View>
    );
  }, []);

  const renderEvo = useCallback(
    (item, index) => <EvolutionItem item={item} index={index} />,
    [],
  );
  //#endregion

  if (!pokemon) {
    return null;
  }

  const {name, sprites, stats, forms} = pokemon;

  return (
    <View style={styles.bg}>
      <ScrollView>
        <View style={styles.wrap}>
          <Text style={styles.name}>{name}</Text>
          <Image
            source={{uri: sprites.front_default || ''}}
            style={styles.image}
          />
          <RowDetailPokemon pokemon={pokemon} />
          <Title>Other Images :</Title>
          <View style={styles.wrapRow}>
            {Object.values(sprites)
              .filter(url => typeof url === 'string')
              .map(renderImage)}
          </View>
          <Title>Stats :</Title>
          <View style={styles.wrapRow}>{stats.map(renderStat)}</View>
          <Title>Evolution :</Title>
          <View style={styles.wrapRow}>{forms.map(renderEvo)}</View>
        </View>
      </ScrollView>
    </View>
  );
};

const Title: React.FC = ({children}) => (
  <Text style={styles.title}>{children}</Text>
);

const EvolutionItem: React.FC<{item: DefaultItem; index: number}> = ({
  item,
  index,
}) => {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useStateMount<Pokemon | null>(null);

  useEffect(() => {
    dispatch(getDataFromUrl.action({url: item.url, callback: setPokemon}));
  }, [dispatch, item.url, setPokemon]);

  if (!pokemon) {
    return null;
  }
  return (
    <View style={styles.wrapEvo}>
      {Boolean(index) && <ArrowRight />}
      <View>
        <Image
          source={{uri: pokemon.sprites.front_default || ''}}
          style={styles.imageEvo}
        />
        <Text style={styles.nameEvo}>{item.name}</Text>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.neutral[100],
  },
  wrap: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 36,
  },
  name: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.neutral[700],
    marginBottom: 41,
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[600],
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  image: {
    width: 300,
    aspectRatio: 1,
    backgroundColor: colors.neutral[200],
    marginBottom: 16,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 0,
    marginBottom: 40,
    alignSelf: 'stretch',
  },
  imageOther: {
    width: width / 3 - 15,
    height: width / 3 - 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: colors.neutral[200],
  },
  wrapStat: {
    width: width / 3 - 15,
    height: width / 3 - 15,
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: colors.neutral[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statName: {
    fontSize: 14,
    width: '75%',
    textAlign: 'center',
  },
  wrapEvo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageEvo: {
    width: width / 2 - 20,
    height: width / 2 - 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: colors.neutral[500],
  },
  nameEvo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.neutral[700],
    marginTop: 8,
    textTransform: 'capitalize',
  },
});
