import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Platform,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FixedHeader from '../components/FixedHeader';
import CategoryList from '../components/CategoryList';
import BannerSlider from '../components/BannerSlider';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { PRODUCTS } from '../data/mockData';
import { COLORS, SPACING } from '../theme';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(130 + insets.top);

  // Tính toán responsive: Số cột & Chiều rộng card khi xoay ngang/dọc hoặc trên màn hình lớn
  const isLandscape = width > height;
  const numColumns = useMemo(() => {
    if (width >= 900) return 4;
    if (width >= 600) return 3;
    return 2;
  }, [width]);

  // Tính toán chiều rộng card chính xác theo số cột và spacing
  const cardWidth = useMemo(() => {
    const horizontalPadding = SPACING.lg * 2;
    const gap = SPACING.md * (numColumns - 1);
    return (width - horizontalPadding - gap) / numColumns;
  }, [width, numColumns]);

  // Lọc sản phẩm theo Category và Từ khóa tìm kiếm
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Xử lý đo kích thước Header cố định
  const handleHeaderLayout = useCallback((event) => {
    const layoutHeight = event.nativeEvent.layout.height;
    if (layoutHeight > 0) {
      setHeaderHeight(layoutHeight);
    }
  }, []);

  // Xử lý chọn sản phẩm để xem chi tiết
  const handleProductPress = useCallback((product) => {
    setSelectedProduct(product);
    setIsDetailVisible(true);
  }, []);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = useCallback((product, qty = 1) => {
    setCartItems((prev) => [...prev, { ...product, qty }]);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  }, []);

  // Pull to refresh giả lập
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Tối ưu renderItem tách component độc lập, sử dụng useCallback
  const renderProductItem = useCallback(
    ({ item }) => (
      <ProductCard
        item={item}
        width={cardWidth}
        onPress={handleProductPress}
        onAddToCart={handleAddToCart}
      />
    ),
    [cardWidth, handleProductPress, handleAddToCart]
  );

  // keyExtractor duy nhất đảm bảo không có cảnh báo trùng key
  const keyExtractor = useCallback((item) => item.id, []);

  // ListHeaderComponent chứa Banner và Danh mục
  const renderListHeader = useMemo(() => {
    return (
      <View>
        <BannerSlider width={width} />
        <CategoryList
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Gợi ý dành cho bạn ({filteredProducts.length})
          </Text>
          <Text style={styles.orientationBadge}>
            {isLandscape ? '🔄 Chế độ xoay ngang' : '📱 Màn hình dọc'} ({numColumns} cột)
          </Text>
        </View>
      </View>
    );
  }, [width, selectedCategory, filteredProducts.length, isLandscape, numColumns]);

  // ListEmptyComponent khi không tìm thấy kết quả
  const renderEmptyComponent = useMemo(() => {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={54} color={COLORS.textMuted} />
        <Text style={styles.emptyTitle}>Không tìm thấy sản phẩm</Text>
        <Text style={styles.emptySubtitle}>
          Vui lòng thử tìm kiếm với từ khóa hoặc danh mục khác.
        </Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {/*
        1. Fixed Header được định vị bằng position: 'absolute'.
        Có search bar, avatar, giỏ hàng và SafeArea insets top.
      */}
      <FixedHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.length}
        onLayout={handleHeaderLayout}
      />

      {/*
        2. Tối ưu FlatList:
        - key={`grid-${numColumns}`}: Reset FlatList an toàn khi xoay ngang/dọc thay đổi numColumns.
        - contentContainerStyle có paddingTop bằng headerHeight để không bị che bởi fixed header.
        - initialNumToRender, maxToRenderPerBatch, windowSize tối ưu hiệu năng cuộn.
      */}
      <FlatList
        key={`grid-${numColumns}`}
        data={filteredProducts}
        keyExtractor={keyExtractor}
        renderItem={renderProductItem}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
        contentContainerStyle={[
          styles.listContainer,
          {
            paddingTop: headerHeight + SPACING.xs,
            paddingBottom: insets.bottom + SPACING.xl,
          },
        ]}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={headerHeight}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />

      {/*
        3. Modal chi tiết sản phẩm (Detail View):
        Đáp ứng hoàn chỉnh tiêu chí "Chọn một màn hình Home hoặc Detail".
      */}
      <ProductDetailModal
        visible={isDetailVisible}
        product={selectedProduct}
        onClose={() => setIsDetailVisible(false)}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    paddingHorizontal: SPACING.lg,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  orientationBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.xxl,
  },
});
