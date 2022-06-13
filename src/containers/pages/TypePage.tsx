import {RouteProp, useRoute} from '@react-navigation/native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {push, RootStackList} from '../../App';
import BgTypes from '../../assets/icons/BgTypes';
import colors from '../../assets/themes/colors';
import PillType from '../../components/PillType';
import {useStateMount} from '../../hooks';
import getDataFromUrl from '../../store/actions/getDataFromUrl';
import getDetailPokemon from '../../store/actions/getDetailPokemon';
import {getPokemonByName} from '../../store/selectors';
import {DefaultItem} from '../../types/api';
import {generateColorsType, generateDigit} from '../../utils/generateColors';

const TypePage = () => {
  const dispatch = useDispatch();
  const [list, setList] = useStateMount<DefaultItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const perPage = 5;
  const {
    params: {
      data: {name, url},
    },
  } = useRoute<RouteProp<RootStackList, 'Type'>>();

  useEffect(() => {
    dispatch(
      getDataFromUrl.action({
        url,
        callback: data => setList(data.pokemon.map(({pokemon}) => pokemon)),
      }),
    );
  }, [dispatch, setList, url]);

  const renderRow = useCallback(
    (item, index) => <RowItem {...{item, index}} />,
    [],
  );

  const getListPage = useCallback((_, i) => i < 15, []);

  const renderPagination = useCallback(
    (_, index: number) => {
      const active = page === index + 1;
      console.log(active);
      return (
        <TouchableOpacity
          onPress={() => setPage(index + 1)}
          key={index}
          activeOpacity={0.8}
          style={styles.itemPagination}>
          <Text style={active && styles.activePage}>{index + 1}</Text>
        </TouchableOpacity>
      );
    },
    [page],
  );

  return (
    <Fragment>
      <View style={styles.bg}>
        <BgTypes fill={generateColorsType(name)} />
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Pokemon with {name}</Text>
          <View style={styles.wrapList}>
            {list
              .filter(
                (_, index) =>
                  index >= perPage * page && index < perPage * (page + 1),
              )
              .map(renderRow)}
            <View style={[styles.row, styles.space, styles.pagination]}>
              <View>
                <Text>Per Page {perPage}</Text>
              </View>
              <View>
                <Text>Total Data: {list.length}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.pagination]}>
              {Boolean(list.length) &&
                Array(Math.ceil(list.length / 5))
                  .fill('')
                  .filter(getListPage)
                  .map(renderPagination)}
            </View>
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
};

const RowItem: React.FC<{item: DefaultItem}> = ({item}) => {
  const dispatch = useDispatch();
  const pokemon = useSelector(getPokemonByName(item.name));
  const [loading, setLoading] = useStateMount<boolean>(false);

  useEffect(() => {
    if (!pokemon) {
      setLoading(true);
      dispatch(
        getDetailPokemon.action({
          name: item.name,
          callback: () => setLoading(false),
        }),
      );
    }
  }, [dispatch, item.name, pokemon, setLoading]);

  const handlePress = useCallback(
    () => push('Detail', {id: pokemon?.id}),
    [pokemon?.id],
  );
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={styles.wrapRow}
      key={item.name}>
      <Image
        source={{
          uri:
            pokemon?.sprites.front_default ??
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png',
        }}
        style={styles.imageRow}
      />
      <View style={styles.contentRow}>
        <Text style={styles.idRow}>#{generateDigit(pokemon?.id ?? 0)}</Text>
        <Text style={styles.nameRow}>{item.name}</Text>
        {loading && <ActivityIndicator style={styles.loadingRow} />}
        <View style={styles.row}>
          {pokemon?.types
            .filter((_, index) => index < 2)
            .map(({type}) => (
              <PillType type={type} />
            ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TypePage;

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    left: 0,
  },
  content: {
    zIndex: 1,
    paddingHorizontal: 24,
    marginVertical: 40,
  },
  title: {
    color: colors.neutral[700],
    fontSize: 36,
    fontWeight: '700',
  },
  wrapList: {
    backgroundColor: '#ffffff88',
    padding: 20,
    borderRadius: 24,
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  space: {
    justifyContent: 'space-between',
  },
  itemPagination: {
    marginLeft: 5,
  },
  pagination: {
    marginTop: 20,
  },
  wrapRow: {
    borderBottomColor: colors.neutral[300],
    borderBottomWidth: 1,
    padding: 6,
    flexDirection: 'row',
    marginBottom: 10,
  },
  contentRow: {
    borderLeftColor: colors.neutral[300],
    borderLeftWidth: 1,
    paddingLeft: 10,
    marginLeft: 10,
  },
  idRow: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.neutral[600],
  },
  nameRow: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[700],
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  imageRow: {
    width: 75,
    height: 75,
    backgroundColor: colors.neutral[300],
  },
  loadingRow: {
    position: 'absolute',
    left: 40,
    bottom: 0,
  },
  activePage: {
    color: colors.yellow[600],
    fontWeight: '700',
  },
});
