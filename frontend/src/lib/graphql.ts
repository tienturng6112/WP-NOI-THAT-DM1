/**
 * GraphQL Client & Data Fetcher for Atelier Sofa Luxury Furniture
 */

export interface FabricOption {
  name: string;
  type: string;
  hex: string;
  desc: string;
  image?: string;
}

export interface DimensionOption {
  size: string;
  dimensions: string;
  priceNum: number;
  priceFormatted: string;
  isPopular?: boolean;
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
  fabrics: FabricOption[];
  dimensions: DimensionOption[];
  model3dUrl?: string;
  has3DModel?: boolean;
  specs: {
    depth: string;
    seatHeight: string;
    frame: string;
    cushion: string;
    warranty: string;
    leadTime: string;
  };
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
  superTitle: "TIÊU CHUẨN NỘI THẤT XA XỈ",
  heading: "Bí quyết kiến tạo những tác phẩm trường tồn.",
  description: "Từ kỹ thuật ghép mộng mộc truyền thống Bắc Ý đến lớp lông vũ tinh tuyển, mỗi chi tiết trên từng bộ sofa đều được trau chuốt chuẩn xác theo tiêu chuẩn nội thất xa xỉ châu Âu.",
  features: [
    {
      icon: "tree-pine",
      tag: "Vật Liệu Khung Xương",
      title: "Khung Gỗ Sồi Nga Sấy Chân Không",
      description: "Gỗ tự nhiên nguyên khối sấy chân không 6 tháng đạt độ ẩm lý tưởng dưới 9%, chịu tải trọng tĩnh 750kg và bảo hành kết cấu 10 năm.",
      gradient: "amber",
    },
    {
      icon: "feather",
      tag: "Độ Êm Tuyệt Đối",
      title: "Lông Vũ Tự Nhiên & Foam HR45",
      description: "Cấu trúc đệm phân 3 tầng: áo ngoài nhồi lông vũ ngỗng 70% êm ái như mây, lõi Memory Foam tỷ trọng cao 45kg/m³ đàn hồi vĩnh cửu.",
      gradient: "neutral",
    },
    {
      icon: "shield-check",
      tag: "Di Sản Da Thuộc",
      title: "Da Bò Ý Full-Grain Tuscany",
      description: "Thuộc thảo mộc tự nhiên tại Florence, Ý. Bề mặt giữ trọn vân da nguyên bản, càng sử dụng theo năm tháng bề mặt càng bóng bẩy, lên nước tuyệt đẹp.",
      gradient: "terracotta",
    },
    {
      icon: "sparkles",
      tag: "Công Nghệ Bề Mặt",
      title: "Vải Bouclé Kháng Nước Nano",
      description: "Sợi Bouclé len cừu tự nhiên phủ lớp bảo vệ Lotus Effect, ngăn chất lỏng thẩm thấu, dễ dàng lau sạch vết cà phê hay rượu vang tức thì.",
      gradient: "olive",
    },
    {
      icon: "scissors",
      tag: "Kỹ Thuật Thượng Thừa",
      title: "Khâu Tay Saddle Stitching",
      description: "Từng đường kim mũi chỉ được thực hiện thủ công bởi nghệ nhân có thâm niên trên 20 năm, tạo điểm nhấn đường viền chuẩn xác từng milimet.",
      gradient: "amber",
    },
    {
      icon: "compass",
      tag: "Cá Nhân Hóa",
      title: "May Đo Bespoke Theo Bản Vẽ",
      description: "Tùy biến chiều dài, góc quay L hoặc đổi chất liệu bọc chuẩn xác theo kích thước phòng khách và bảng màu nội thất của gia chủ.",
      gradient: "terracotta",
    },
  ],
};

export const MILANO_FABRICS: FabricOption[] = [
  {
    name: "Bouclé Kem Tuyết",
    type: "Vải dệt Bouclé len cừu Ý",
    hex: "#F8F2EF",
    desc: "Sợi Bouclé len cừu tự nhiên màu kem tuyết Birch, mềm xốp, ấm áp và chống bám bẩn với công nghệ Lotus Effect.",
    image: "/images/sofas/milano_birch.jpg",
  },
  {
    name: "Nhung Rêu Emerald Ý",
    type: "Nhung dệt xa xỉ Florence",
    hex: "#2E4A3E",
    desc: "Nhung dệt cao cấp màu xanh Emerald rêu quý tộc, bề mặt mướt mịn óng ả bắt sáng cực kỳ sang trọng.",
    image: "/images/sofas/milano_emerald.jpg",
  },
  {
    name: "Da Bò Cognac Tuscany",
    type: "Da Bò Ý Full-Grain thảo mộc",
    hex: "#9A5B42",
    desc: "Da bò Ý nguyên tấm thuộc thảo mộc tự nhiên tại Florence, màu nâu Cognac ấm áp càng dùng càng bóng bẩy.",
    image: "/images/sofas/milano_cognac.jpg",
  },
  {
    name: "Da Bò Nappa Đen Than",
    type: "Da Bò Nappa Italian cao cấp",
    hex: "#1F1F21",
    desc: "Da Nappa thượng hạng màu đen than huyền bí, bề mặt đanh mịn mờ sang trọng chuẩn Italian Modern.",
    image: "/images/sofas/milano_black.jpg",
  },
  {
    name: "Vải Dệt Azure Slate Blue",
    type: "Vải dệt Azure đa tầng",
    hex: "#4C637C",
    desc: "Sắc xanh Azure Slate Blue trầm tĩnh, cấu trúc dệt đa tầng chống nhăn và thoáng khí tối ưu.",
    image: "/images/sofas/milano_azure.jpg",
  },
  {
    name: "Linen Taupe Tối Giản",
    type: "Vải Linen Taupe Ý",
    hex: "#E1D7D2",
    desc: "Màu be Taupe ấm áp chuẩn phong cách tối giản đương đại Minotti, trang nhã và dễ phối hợp không gian.",
    image: "/images/sofas/milano_taupe.jpg",
  },
];

export const NORDIC_FABRICS: FabricOption[] = [
  {
    name: "Bouclé Trắng Kem Tuyết",
    type: "Sợi Bouclé len cừu Bắc Âu",
    hex: "#F8F2EF",
    desc: "Sợi Bouclé len cừu tự nhiên mềm mại như mây tuyết, tôn trọn vẹn những đường cong điêu khắc hữu cơ.",
    image: "/images/sofas/nordic_birch.jpg",
  },
  {
    name: "Linen Taupe Yến Mạch",
    type: "Vải dệt sợi tự nhiên Scandinavia",
    hex: "#E1D7D2",
    desc: "Màu Taupe yến mạch ấm cúng mộc mạc, tạo cảm giác thư thái và an yên cho phòng khách mở hiện đại.",
    image: "/images/sofas/nordic_taupe.jpg",
  },
  {
    name: "Bouclé Sky Mây Trời",
    type: "Vải Bouclé dệt pha sợi Sky",
    hex: "#C8D7E1",
    desc: "Sắc xanh mây trời dịu mát thanh khiết, mang ánh sáng tự nhiên của vùng vịnh Bắc Âu vào tổ ấm.",
    image: "/images/sofas/nordic_sky.jpg",
  },
  {
    name: "Nhung Duck Egg Xanh Băng",
    type: "Nhung mịn Duck Egg cao cấp",
    hex: "#DEE6EC",
    desc: "Sắc xanh trứng vịt nhạt tươi mát, chất nhung mịn màng chống tĩnh điện tạo điểm nhấn tinh tế.",
    image: "/images/sofas/nordic_duckegg.jpg",
  },
  {
    name: "Nhung Gold Champagne",
    type: "Nhung dệt vàng Gold bắt sáng",
    hex: "#CEB88E",
    desc: "Màu vàng Champagne ấm áp, bắt sáng óng ánh làm bừng sáng góc thư giãn nghệ thuật.",
    image: "/images/sofas/nordic_gold.jpg",
  },
  {
    name: "Da Nappa Azure Bắc Âu",
    type: "Da Bò Nappa mềm Scandinavia",
    hex: "#4C637C",
    desc: "Chất da Nappa siêu mềm mịn ôm trọn đường lượn sóng, màu sắc trầm ổn sâu lắng phong cách Bắc Âu.",
    image: "/images/sofas/nordic_duckegg.jpg",
  },
];

export const VERONA_FABRICS: FabricOption[] = [
  {
    name: "Da Bò Cognac Tuscany",
    type: "Full-Grain Italian Tuscan Leather",
    hex: "#8A4726",
    desc: "Da bò đực dãy Alps thuộc thảo mộc tự nhiên tại Tuscany, màu Cognac hổ phách nguyên bản càng dùng càng bóng đẹp.",
    image: "/images/sofas/verona_cognac.jpg",
  },
  {
    name: "Da Bò Gold Camel Hoàng Gia",
    type: "Full-Grain Aniline Leather",
    hex: "#CEB88E",
    desc: "Sắc vàng Gold Camel quý phái của giới quý tộc Ý, giữ trọn vẹn lỗ chân lông thở tự nhiên và độ mềm đỉnh cao.",
    image: "/images/sofas/verona_camel.jpg",
  },
  {
    name: "Da Bò Nappa Đen Than",
    type: "Italian Nappa Leather",
    hex: "#1E1F22",
    desc: "Màu đen than sang trọng quyền lực, công nghệ hoàn thiện mờ chống bám vân tay và chống trầy xước.",
    image: "/images/sofas/verona_black.jpg",
  },
  {
    name: "Da Bò Azure Đại Dương",
    type: "Aniline Pull-up Leather",
    hex: "#4C637C",
    desc: "Sắc xanh đại dương Azure độc bản hiếm có, vân da tự nhiên sống động mang dấu ấn riêng biệt.",
    image: "/images/sofas/verona_azure.jpg",
  },
  {
    name: "Da Bò Taupe Ý Tối Giản",
    type: "Semi-Aniline Florence Leather",
    hex: "#E1D7D2",
    desc: "Màu Taupe thanh lịch ấm áp, bề mặt da láng mịn như nhung hòa hợp hoàn hảo với kiến trúc biệt thự hiện đại.",
    image: "/images/sofas/verona_taupe.jpg",
  },
  {
    name: "Da Bò Birch Trắng Sữa",
    type: "Top-Grain Italian Nappa",
    hex: "#F8F2EF",
    desc: "Sắc Birch tinh khôi trang nhã, công nghệ phủ bảo vệ Nano chống bám bẩn tối ưu cho gia đình hiện đại.",
    image: "/images/sofas/verona_birch.jpg",
  },
];

export const PRETTY_PALETTES: FabricOption[] = MILANO_FABRICS;

export const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: "cG9zdDox",
    databaseId: 1,
    name: "Milano Modular Sofa",
    slug: "milano-modular-sofa",
    tagline: "Kiến trúc mô-đun Ý. Tuyên ngôn của chủ nghĩa tối giản đương đại.",
    description: "Milano Modular Sofa là hiện thân của phong cách Italian Minimalist sang trọng (theo chuẩn Minotti & B&B Italia). Thiết kế các khối đệm sâu 102cm bọc vải dệt hữu cơ kết hợp lông vũ tự nhiên, cho phép biến đổi cấu hình linh hoạt từ văng thẳng 3 chỗ đến tổ hợp chữ L thư giãn tối thượng.",
    shortDescription: "Cấu trúc mô-đun tự do, khung gỗ Sồi Mỹ nguyên khối và lớp đệm lông vũ tỷ lệ vàng.",
    price: "89.000.000 ₫",
    basePriceNum: 89000000,
    featuredImage: "/images/sofas/milano_birch.jpg",
    galleryImages: [
      "/images/sofas/milano_birch.jpg",
      "/images/sofas/milano_emerald.jpg",
      "/images/sofas/milano_cognac.jpg",
      "/images/sofas/milano_black.jpg",
      "/images/sofas/milano_azure.jpg",
      "/images/sofas/milano_taupe.jpg",
    ],
    fabrics: MILANO_FABRICS,
    dimensions: [
      { size: "2.4m — 3 Chỗ ngồi (Văng thẳng)", dimensions: "240 x 102 x 76 cm", priceNum: 89000000, priceFormatted: "89.000.000 ₫", isPopular: false },
      { size: "3.2m — Góc Chữ L Thư Giãn", dimensions: "320 x 175 x 76 cm", priceNum: 118000000, priceFormatted: "118.000.000 ₫", isPopular: true },
      { size: "3.8m — Grand Sectional (Villa)", dimensions: "380 x 210 x 76 cm", priceNum: 145000000, priceFormatted: "145.000.000 ₫", isPopular: false },
    ],
    has3DModel: true,
    specs: {
      depth: "102 cm (Đệm sâu chuẩn thư giãn)",
      seatHeight: "42 cm",
      frame: "Gỗ Sồi Mỹ sấy chân không 6 tháng",
      cushion: "70% Lông vũ ngỗng + Foam HR45 đàn hồi cao",
      warranty: "10 năm kết cấu khung sườn, 3 năm mút & vải",
      leadTime: "Chế tác thủ công từ 3 - 4 tuần",
    },
  },
  {
    id: "cG9zdDoy",
    databaseId: 2,
    name: "Nordic Bouclé Lounge Sofa",
    slug: "nordic-boucle-lounge-sofa",
    tagline: "Đường cong hữu cơ Scandinavia. Ôm trọn cảm xúc thư thái và an yên.",
    description: "Lấy cảm hứng từ những đụn tuyết Bắc Âu, Nordic Bouclé Lounge sở hữu đường cong uốn lượn liên tục không góc cạnh. Bề mặt bọc lớp vải Bouclé len cừu bồng bềnh mang lại xúc giác êm ái tuyệt đối ngay từ lần chạm đầu tiên, thích hợp cho không gian mở hiện đại.",
    shortDescription: "Đường nét hữu cơ mềm mại, bọc vải Bouclé len cừu tự nhiên ấm cúng.",
    price: "64.500.000 ₫",
    basePriceNum: 64500000,
    featuredImage: "/images/sofas/nordic_birch.jpg",
    galleryImages: [
      "/images/sofas/nordic_birch.jpg",
      "/images/sofas/nordic_taupe.jpg",
      "/images/sofas/nordic_sky.jpg",
      "/images/sofas/nordic_gold.jpg",
      "/images/sofas/nordic_duckegg.jpg",
    ],
    fabrics: NORDIC_FABRICS,
    dimensions: [
      { size: "2.2m — 3 Chỗ ngồi (Dáng cong)", dimensions: "220 x 98 x 78 cm", priceNum: 64500000, priceFormatted: "64.500.000 ₫", isPopular: true },
      { size: "2.8m — Dáng Cong Điêu Khắc (Salon)", dimensions: "280 x 120 x 78 cm", priceNum: 86000000, priceFormatted: "86.000.000 ₫", isPopular: false },
      { size: "3.4m — Tổ hợp Vòng Cung (Grand Curved)", dimensions: "340 x 140 x 78 cm", priceNum: 108000000, priceFormatted: "108.000.000 ₫", isPopular: false },
    ],
    has3DModel: false,
    specs: {
      depth: "98 cm",
      seatHeight: "44 cm",
      frame: "Khung gỗ Dẻ Gai (Beechwood) uốn nhiệt",
      cushion: "Đệm cao su thiên nhiên kết hợp Microfiber",
      warranty: "10 năm kết cấu khung sườn",
      leadTime: "Chế tác thủ công từ 2 - 3 tuần",
    },
  },
  {
    id: "cG9zdDoz",
    databaseId: 3,
    name: "Verona Cognac Leather Sofa",
    slug: "verona-cognac-leather-sofa",
    tagline: "Di sản da thuộc vùng Tuscany. Đẳng cấp vượt thời gian càng dùng càng bóng đẹp.",
    description: "Verona là kiệt tác chế tác từ các nghệ nhân vùng Florence. Từng mét da bò Full-Grain được tuyển chọn khắt khe từ bò đực chăn thả tự nhiên tại dãy Alps, thuộc thảo mộc giữ nguyên vẹn vân da sống động và mùi thơm da thuộc quyến rũ đặc trưng.",
    shortDescription: "Da bò Ý Full-Grain nguyên tấm thuộc thảo mộc, chân kim loại đồng thau xước mờ.",
    price: "115.000.000 ₫",
    basePriceNum: 115000000,
    featuredImage: "/images/sofas/verona_cognac.jpg",
    galleryImages: [
      "/images/sofas/verona_cognac.jpg",
      "/images/sofas/verona_camel.jpg",
      "/images/sofas/verona_black.jpg",
      "/images/sofas/verona_azure.jpg",
      "/images/sofas/verona_taupe.jpg",
      "/images/sofas/verona_birch.jpg",
    ],
    fabrics: VERONA_FABRICS,
    dimensions: [
      { size: "2.6m — 3 Chỗ ngồi VIP (Văng da thẳng)", dimensions: "260 x 105 x 75 cm", priceNum: 115000000, priceFormatted: "115.000.000 ₫", isPopular: true },
      { size: "3.3m — Góc L Da Bò Nguyên Khối", dimensions: "330 x 180 x 75 cm", priceNum: 158000000, priceFormatted: "158.000.000 ₫", isPopular: false },
      { size: "4.0m — Bộ Tổng Thống (Presidential Lounge)", dimensions: "400 x 220 x 75 cm", priceNum: 198000000, priceFormatted: "198.000.000 ₫", isPopular: false },
    ],
    has3DModel: true,
    specs: {
      depth: "105 cm (Đệm sâu siêu rộng)",
      seatHeight: "40 cm (Tầm nhìn thấp thư thái)",
      frame: "Khung gỗ Sồi Đỏ kết hợp lò xo túi độc lập",
      cushion: "Lông vũ ngỗng Bắc Cực 100% bọc lõi Foam HR",
      warranty: "15 năm kết cấu khung & 5 năm bề mặt da",
      leadTime: "Chế tác đặt riêng từ 4 - 5 tuần",
    },
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

    // If backend returns products that are sofas, map them; otherwise use our curated master luxury sofas
    if (rawNodes && Array.isArray(rawNodes) && rawNodes.length > 0) {
      const isSofaInWp = rawNodes.some((n: any) => n.name?.toLowerCase().includes("sofa") || n.slug?.toLowerCase().includes("sofa"));
      
      if (isSofaInWp) {
        const mapped = rawNodes.map((node: any, idx: number) => {
          const fb = FALLBACK_PRODUCTS.find((f) => f.slug === node.slug || f.name === node.name) || FALLBACK_PRODUCTS[idx % FALLBACK_PRODUCTS.length];
          return {
            ...fb,
            id: node.id || fb.id,
            databaseId: node.databaseId || fb.databaseId,
            name: node.name || fb.name,
            slug: node.slug || fb.slug,
            description: node.description ? node.description.replace(/<[^>]*>?/gm, "").trim() : fb.description,
            shortDescription: node.shortDescription ? node.shortDescription.replace(/<[^>]*>?/gm, "").trim() : fb.shortDescription,
            featuredImage: node.directFeaturedUrl || node.image?.sourceUrl || fb.featuredImage,
          };
        });

        // Canonical collection order: Milano (#1) -> Nordic (#2) -> Verona (#3)
        const CANONICAL_SLUG_ORDER = [
          "milano-modular-sofa",
          "nordic-boucle-lounge-sofa",
          "verona-cognac-leather-sofa",
        ];
        mapped.sort((a, b) => {
          const idxA = CANONICAL_SLUG_ORDER.indexOf(a.slug);
          const idxB = CANONICAL_SLUG_ORDER.indexOf(b.slug);
          return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
        });

        return { products: mapped, bentoData, isLive: true };
      }
    }

    // Backend is live (HTTP 200 GraphQL responded), displaying curated master luxury sofas
    return { products: FALLBACK_PRODUCTS, bentoData, isLive: true };
  } catch (err: any) {
    return {
      products: FALLBACK_PRODUCTS,
      bentoData: DEFAULT_BENTO_DATA,
      isLive: false,
      error: err?.message,
    };
  }
}
