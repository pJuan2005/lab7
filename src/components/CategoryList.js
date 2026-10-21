import React, { useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import CategoryItem from './CategoryItem';
import { CATEGORIES } from '../data/mockData';
import { SPACING, COLORS } from '../theme';

export default function CategoryList({ selectedCategory, onSelectCategory }) {
  const renderItem = useCallback(
    ({ item }) => (
      <CategoryItem
        item={item}
        isSelected={item.id === selectedCategory}
        onSelect={onSelectCategory}
      />
    ),
    [selectedCategory, onSelectCategory]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
  },
});
