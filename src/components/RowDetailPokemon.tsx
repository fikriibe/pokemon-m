import {StyleSheet, Text, View} from 'react-native';
import React, {Fragment, ReactNode, useCallback} from 'react';
import colors from '../assets/themes/colors';
import {Pokemon, PokemonAbility} from '../types/api';
import PillType from './PillType';

const RowDetailPokemon: React.FC<{pokemon?: Pokemon}> = ({pokemon}) => {
  const renderItemAbilities = useCallback(
    ({ability: {name}, is_hidden}: PokemonAbility) => (
      <View style={styles.rowAbility} key={name}>
        <View style={styles.dotAbility} />
        <Text style={styles.value}>
          {name}
          {is_hidden && ' (hidden)'}
        </Text>
      </View>
    ),
    [],
  );
  if (!pokemon) {
    return null;
  }
  return (
    <Fragment>
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
    </Fragment>
  );
};

const RenderRow: React.FC<{title: string; value: string | ReactNode}> = ({
  title,
  value,
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}: </Text>
      <View>
        {typeof value === 'string' ? (
          <Text style={styles.value}>{value}</Text>
        ) : (
          value
        )}
      </View>
    </View>
  );
};

export default React.memo(RowDetailPokemon);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[700],
    marginRight: 10,
  },
  value: {
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
