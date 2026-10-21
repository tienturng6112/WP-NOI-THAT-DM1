/**
 * GraphQL Client & Data Fetcher for WordPress WooGraphQL
 */

export interface ProductVariation {
  id: string;
  name: string;
  price: string;
  regularPrice?: string;
  storage: string;
  color: string;
}

export interface ProductItem {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  shortDescription: string;
  price: string;
  basePriceNum: number;
  featuredImage: string;
  galleryImages: string[];
  colors: { name: string; hex: string; desc: string }[];
  storages: { size: string; priceNum: number; priceFormatted: string }[];
}

export interface BentoFeatureItem {
  tag: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface BentoSectionData {
  superTitle: string;
  heading: string;
  description: string;
  features: BentoFeatureItem[];
}

export const DEFAULT_BENTO_DATA: BentoSectionData = {
  superTitle: "ĐỈNH CAO CÔNG NGHỆ",
  heading: "Tìm hiểu những điểm chạm vượt bậc.",
  description: "Mỗi chi tiết trên dòng iPhone 18 đều được thiết kế tỉ mỉ để mang đến trải nghiệm đột phá chưa từng có.",
  features: [
    {
      icon: "cpu",
      tag: "Hiệu Năng Vô Song",
      title: "Chip A20 Pro Bionic",
      description: "Kiến trúc 3nm thế hệ thứ ba hoàn toàn mới. Nhanh hơn 35% và tiết kiệm năng lượng 40% so với thế hệ trước.",
      gradient: "blue",
    },
    {
      icon: "camera",
      tag: "Nhiếp Ảnh Điện Toán",
      title: "Camera 48MP Fusion Pro",
      description: "Ống kính Telephoto 5x và cảm biến Quad-Pixel thế hệ 3 bắt trọn mọi chi tiết trong điều kiện ánh sáng yếu.",
      gradient: "amber",
    },
    {
      icon: "shield",
      tag: "Vật Liệu Đỉnh Cao",
      title: "Khung Titan Cấp 5",
      description: "Hợp kim Titan dùng trong ngành hàng không vũ trụ, mang lại tỷ lệ độ bền trên trọng lượng cao nhất từng có trên iPhone.",
      gradient: "neutral",
    },
    {
      icon: "sparkles",
      tag: "Trí Tuệ Nhân Tạo",
      title: "Apple Intelligence",
      description: "Hệ thống trí tuệ cá nhân hóa sâu sắc, tích hợp trực tiếp trên thiết bị bảo vệ tối đa quyền riêng tư của bạn.",
      gradient: "pink",
    },
    {
      icon: "battery-charging",
      tag: "Năng Lượng Bền Bỉ",
      title: "Thời Lượng Pin 33 Giờ",
      description: "Tận hưởng cả ngày dài sử dụng thoải mái với công nghệ pin xếp chồng tiên tiến và sạc nhanh MagSafe 35W.",
      gradient: "emerald",
    },
    {
      icon: "layers",
      tag: "Màn Hình Pro",
      title: "Super Retina XDR 120Hz",
      description: "Độ sáng đỉnh 3000 nits ngoài trời, công nghệ ProMotion 1-120Hz mượt mà và màn hình luôn bật Always-On.",
      gradient: "cyan",
    },
  ],
};

export const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: "cG9zdDoxMw==",
    databaseId: 13,
    name: "iPhone 18",
    slug: "iphone-18",
    tagline: "Sức mạnh phi thường. Màu sắc bứt phá.",
    description: "iPhone 18 sở hữu chip A20 Bionic đột phá, màn hình Super Retina XDR 120Hz mượt mà và camera chính 48MP Photonic Engine sắc nét.",
    shortDescription: "Mạnh mẽ vượt trội. Thiết kế nhôm hàng không vũ trụ cùng mặt kính Ceramic Shield bền bỉ.",
    price: "₫28,990,000",
    basePriceNum: 28990000,
    featuredImage: "https://pngimg.com/d/iphone_14_PNG2.png",
    galleryImages: [
      "https://pngimg.com/d/iphone_14_PNG2.png",
      "https://pngimg.com/d/iphone_14_PNG21.png",
      "https://pngimg.com/d/iphone_13_PNG28.png",
    ],
    colors: [
      { name: "Titan Tự Nhiên", hex: "#a49d94", desc: "Sắc kim loại nguyên bản tinh tế" },
      { name: "Titan Sa Mạc", hex: "#c8ab90", desc: "Ánh kim sa mạc ấm áp quý phái" },
      { name: "Đen Nhám", hex: "#2b2b2d", desc: "Màu đen sâu thẳm huyền bí" },
    ],
    storages: [
      { size: "256GB", priceNum: 28990000, priceFormatted: "28.990.000₫" },
      { size: "512GB", priceNum: 31990000, priceFormatted: "31.990.000₫" },
      { size: "1TB",   priceNum: 34990000, priceFormatted: "34.990.000₫" },
    ],
  },
  {
    id: "cG9zdDoyMw==",
    databaseId: 23,
    name: "iPhone 18 Pro",
    slug: "iphone-18-pro",
    tagline: "Titanium Cấp 5. Chip A20 Pro dẫn đầu mọi giới hạn.",
    description: "iPhone 18 Pro thiết lập chuẩn mực Pro mới với khung viền Titan Cấp 5 siêu nhẹ, chip A20 Pro với GPU 6 lõi Ray Tracing và camera Telephoto 5x thế hệ mới.",
    shortDescription: "Khung Titan chuẩn hàng không vũ trụ. Chip A20 Pro mang lại hiệu năng đồ họa đỉnh cao.",
    price: "₫34,990,000",
    basePriceNum: 34990000,
    featuredImage: "https://pngimg.com/d/iphone_14_PNG21.png",
    galleryImages: [
      "https://pngimg.com/d/iphone_14_PNG21.png",
      "https://pngimg.com/d/iphone_14_PNG2.png",
      "https://pngimg.com/d/iphone_13_PNG28.png",
    ],
    colors: [
      { name: "Titan Tự Nhiên", hex: "#9f978e", desc: "Titanium hoàn thiện mờ đẳng cấp" },
      { name: "Titan Sa Mạc", hex: "#c4a78c", desc: "Sắc vàng cát sa mạc lộng lẫy" },
      { name: "Đen Nhám", hex: "#1f1f21", desc: "Đen không gian mạnh mẽ" },
    ],
    storages: [
      { size: "256GB", priceNum: 34990000, priceFormatted: "34.990.000₫" },
      { size: "512GB", priceNum: 38990000, priceFormatted: "38.990.000₫" },
      { size: "1TB",   priceNum: 42990000, priceFormatted: "42.990.000₫" },
    ],
  },
  {
    id: "cG9zdDozMw==",
    databaseId: 33,
    name: "iPhone 18 Pro Max",
    slug: "iphone-18-pro-max",
    tagline: "Đỉnh cao tuyệt đối. Màn hình 6.9 inch siêu rộng.",
    description: "iPhone 18 Pro Max là đỉnh cao công nghệ di động của Apple: Màn hình lớn nhất 6.9 inch Super Retina XDR, pin trâu nhất lịch sử iPhone và nút Điều Khiển Camera haptic sapphire.",
    shortDescription: "Màn hình 6.9 inch siêu đỉnh, thời lượng pin cả ngày dài và camera Pro tối thượng.",
    price: "₫39,990,000",
    basePriceNum: 39990000,
    featuredImage: "https://pngimg.com/d/iphone_13_PNG28.png",
    galleryImages: [
      "https://pngimg.com/d/iphone_13_PNG28.png",
      "https://pngimg.com/d/iphone_14_PNG2.png",
      "https://pngimg.com/d/iphone_14_PNG21.png",
    ],
    colors: [
      { name: "Titan Tự Nhiên", hex: "#9a9289", desc: "Titanium tự nhiên cao cấp nhất" },
      { name: "Titan Sa Mạc", hex: "#c2a386", desc: "Sắc sa mạc rực rỡ sang trọng" },
      { name: "Đen Nhám", hex: "#18181a", desc: "Đen huyền thoại siêu cuốn hút" },
    ],
    storages: [
      { size: "256GB", priceNum: 39990000, priceFormatted: "39.990.000₫" },
      { size: "512GB", priceNum: 43990000, priceFormatted: "43.990.000₫" },
      { size: "1TB",   priceNum: 46990000, priceFormatted: "46.990.000₫" },
    ],
  },
];

export const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || "http://localhost:8080/graphql";

export const STORE_QUERY = `
query GetStoreData {
  bentoSection {
    superTitle
    heading
    description
    features {
      tag
      title
      description
      icon
      gradient
    }
  }
  products(first: 20) {
    nodes {
      id
      databaseId
      name
      slug
      description
      shortDescription
      directFeaturedUrl
      directGalleryUrls
      image {
        sourceUrl
      }
      galleryImages {
        nodes {
          sourceUrl
        }
      }
      ... on VariableProduct {
        price
        regularPrice
        variations(first: 20) {
          nodes {
            id
            databaseId
            name
            price
            regularPrice
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
    }
  }
}
`;

export async function fetchProductsFromGraphQL(): Promise<{
  products: ProductItem[];
  bentoData: BentoSectionData;
  isLive: boolean;
  error?: string;
}> {
  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: STORE_QUERY }),
      next: { revalidate: 5 },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const json = await res.json();
    if (json.errors && json.errors.length > 0) {
      throw new Error(json.errors[0].message);
    }

    const rawNodes = json?.data?.products?.nodes;
    const bentoRaw = json?.data?.bentoSection;

    const bentoData: BentoSectionData = {
      superTitle: bentoRaw?.superTitle || DEFAULT_BENTO_DATA.superTitle,
      heading: bentoRaw?.heading || DEFAULT_BENTO_DATA.heading,
      description: bentoRaw?.description || DEFAULT_BENTO_DATA.description,
      features: (bentoRaw?.features && bentoRaw.features.length > 0)
        ? bentoRaw.features
        : DEFAULT_BENTO_DATA.features,
    };

    if (!rawNodes || !Array.isArray(rawNodes) || rawNodes.length === 0) {
      return { products: FALLBACK_PRODUCTS, bentoData, isLive: false };
    }

    // Map GraphQL response to structured ProductItem
    const mapped: ProductItem[] = rawNodes.map((node: any) => {
      const fb = FALLBACK_PRODUCTS.find((f) => f.slug === node.slug || f.name === node.name) || FALLBACK_PRODUCTS[0];

      const featuredImage = node.directFeaturedUrl || node.image?.sourceUrl || fb.featuredImage;
      const galleryImages = (node.directGalleryUrls && node.directGalleryUrls.length > 0)
        ? node.directGalleryUrls
        : (node.galleryImages?.nodes?.map((g: any) => g.sourceUrl) || fb.galleryImages);

      return {
        id: node.id,
        databaseId: node.databaseId,
        name: node.name,
        slug: node.slug,
        tagline: fb.tagline,
        description: node.description ? node.description.replace(/<[^>]*>?/gm, "").trim() : fb.description,
        shortDescription: node.shortDescription ? node.shortDescription.replace(/<[^>]*>?/gm, "").trim() : fb.shortDescription,
        price: node.price || fb.price,
        basePriceNum: fb.basePriceNum,
        featuredImage,
        galleryImages: [featuredImage, ...galleryImages.filter((u: string) => u !== featuredImage)],
        colors: fb.colors,
        storages: fb.storages,
      };
    });

    // Sort logically from iPhone 18 -> iPhone 18 Pro -> iPhone 18 Pro Max
    mapped.sort((a, b) => (a.basePriceNum - b.basePriceNum) || (a.databaseId - b.databaseId));

    return { products: mapped, bentoData, isLive: true };
  } catch (err: any) {
    console.warn("GraphQL Fetch failed, using fallback data:", err?.message);
    return {
      products: FALLBACK_PRODUCTS,
      bentoData: DEFAULT_BENTO_DATA,
      isLive: false,
      error: err?.message,
    };
  }
}
