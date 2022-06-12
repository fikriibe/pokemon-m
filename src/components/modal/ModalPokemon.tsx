import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {useToggle} from '../../hooks';
import Modal from 'react-native-modal';
import {getPokemon} from '../../store/selectors';
import {useSelector} from 'react-redux';
import colors from '../../assets/themes/colors';
import Button from '../Button';
import {push} from '../../App';
import {PokemonAbility} from '../../types/api';
import PillType from '../PillType';

export type ModalPokemonHandle = {
  show: (id: number) => void;
  dismiss: () => void;
};

const ModalPokemon = forwardRef((_, ref) => {
  const [visible, showModal, dismiss] = useToggle();
  const [id, setId] = useState<number>(0);
  const pokemon = useSelector(getPokemon(id));

  const show = useCallback(
    (newId: number) => {
      setId(newId);
      showModal();
    },
    [showModal],
  );

  const onClickMore = useCallback(() => push('Detail', {id}), [id]);

  useImperativeHandle(
    ref,
    () => ({
      show,
      dismiss,
    }),
    [dismiss, show],
  );

  const renderItemAbilities = useCallback(
    ({ability: {name}, is_hidden}: PokemonAbility) => (
      <View style={styles.rowAbility} key={name}>
        <View style={styles.dotAbility} />
        <Text style={styles.val}>
          {name}
          {is_hidden && ' (hidden)'}
        </Text>
      </View>
    ),
    [],
  );

  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackdropPress={dismiss}
      onBackButtonPress={dismiss}
      style={styles.modal}>
      <View style={styles.wrapModal}>
        <ScrollView>
          <View style={styles.contentModal}>
            <View style={styles.dragClose} />
            <Text style={styles.title}>{pokemon?.name}</Text>
            <Image
              source={{uri: pokemon?.sprites.front_default ?? ''}}
              style={styles.image}
            />
            <RenderRow title="Weight" value={String(pokemon?.weight)} />
            <RenderRow title="Height" value={String(pokemon?.height)} />
            <RenderRow
              title="Abilities"
              value={<View>{pokemon?.abilities.map(renderItemAbilities)}</View>}
            />
            <RenderRow
              title="Type"
              value={
                <View style={styles.rowType}>
                  {pokemon?.types.map(({type}) => (
                    <PillType key={type.name} type={type} />
                  ))}
                </View>
              }
            />
            <Button color={colors.yellow[700]} onPress={onClickMore}>
              More Detail
            </Button>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
});

const RenderRow: React.FC<{title: string; value: string | ReactNode}> = ({
  title,
  value,
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.titleRow}>{title}: </Text>
      <View>
        {typeof value === 'string' ? (
          <Text style={styles.val}>{value}</Text>
        ) : (
          value
        )}
      </View>
    </View>
  );
};

export default ModalPokemon;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  wrapModal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.neutral[100],

    height: '80%',
  },
  contentModal: {
    paddingHorizontal: 38,
    paddingVertical: 20,
    alignItems: 'center',
  },
  dragClose: {
    height: 5,
    width: 288,
    marginBottom: 38,
    backgroundColor: colors.grey[300],
    borderRadius: 2,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.neutral[700],
    marginBottom: 30,
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
  },
  image: {
    width: 250,
    aspectRatio: 1,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  titleRow: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[700],
    marginRight: 10,
  },
  val: {
    fontSize: 16,
    color: colors.neutral[600],
    textTransform: 'capitalize',
  },
  rowAbility: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dotAbility: {
    width: 3,
    aspectRatio: 1,
    borderRadius: 3,
    marginRight: 5,
    backgroundColor: colors.neutral[600],
  },
  rowType: {flexDirection: 'row', flexWrap: 'wrap', marginBottom: 40},
});
