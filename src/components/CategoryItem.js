import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme';

const CategoryItem = React.memo(({ item, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected ? styles.selectedContainer : styles.unselectedContainer,
      ]}
      onPress={() => onSelect(item.id)}
      activeOpacity={0.7}
    >
      <Ionicons
        name={item.icon}
        size={18}
        color={isSelected ? COLORS.white : COLORS.textSecondary}
      />
      <Text
        style={[
          styles.text,
          isSelected ? styles.selectedText : styles.unselectedText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    gap: 6,
  },
  selectedContainer: {
    backgroundColor: COLORS.primary,
  },
  unselectedContainer: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
  selectedText: {
    color: COLORS.white,
  },
  unselectedText: {
    color: COLORS.textSecondary,
  },
});

export default CategoryItem;
