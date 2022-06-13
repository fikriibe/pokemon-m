import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {push} from '../../App';
import colors from '../../assets/themes/colors';
import {useToggle} from '../../hooks';
import {getPokemon} from '../../store/selectors';
import Button from '../Button';
import RowDetailPokemon from '../RowDetailPokemon';

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

  const onClickMore = useCallback(() => {
    dismiss();
    push('Detail', {id});
  }, [dismiss, id]);

  useImperativeHandle(
    ref,
    () => ({
      show,
      dismiss,
    }),
    [dismiss, show],
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
            <RowDetailPokemon pokemon={pokemon} />
            <Button color={colors.yellow[700]} onPress={onClickMore}>
              More Detail
            </Button>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
});

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
    backgroundColor: colors.neutral[200],
  },
});
