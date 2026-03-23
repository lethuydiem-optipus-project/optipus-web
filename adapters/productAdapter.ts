/**
 * Adapter: map product từ Supabase DB
 * sang đúng shape mà UI TemplatesPage đang dùng
 * ❌ KHÔNG đổi UI
 * ❌ KHÔNG fix cứng category dài dòng
 */

type RawProduct = {
  id: string;
  slug: string;
  title: string;
  cover_image: string;
  gallery?: string[];          // ✅ THÊM
  tag?: string;
  short_description?: string;
  description?: string;
  price: number;
  original_price?: number;
  rating?: number;
};



type UITemplate = {
  id: string;      // uuid DB
  slug: string;    // slug để routing
  title: string;
  image: string;
  gallery?: string[];
  category: string;
  description: string;
  features: string[];
  price: number;
  originalPrice: number | null;
  rating: number;
  bestseller: boolean;
  shortDescription?: string;
  additionalInfo?: any;
};


/**
 * Mapping tag kỹ thuật → label UI
 * Chỉ ưu tiên 3 tag chính, còn lại gom Other
 */
const TAG_LABEL_MAP: Record<string, string> = {
  edu: 'Education',
  life: 'Lifestyle',
  work: 'Work',
};

/**
 * Adapter chính
 */
export function adaptProductToTemplate(p: any): UITemplate {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    image: p.cover_image,
    gallery: p.gallery ?? [],
    category: TAG_LABEL_MAP[p.tag ?? ''] || 'Other',

    description: p.description || '',
    shortDescription: p.short_description || '',

    features: p.features ?? extractFeatures(p.description),

    price: p.price,
    originalPrice: p.original_price ?? null,

    rating: p.rating ?? 4.8,
    bestseller: (p.rating ?? 0) >= 4.9,

    additionalInfo: p.additional_info ?? null,
  };
}



/**
 * Extract feature list từ markdown description
 * Quy ước: dòng bắt đầu bằng "- "
 */
function extractFeatures(description?: string): string[] {
  if (!description) return [];

  return description
    .split('\n')
    .filter(line => line.trim().startsWith('- '))
    .map(line => line.replace('- ', '').trim())
    .slice(0, 4); // UI chỉ cần 3–4 feature
}

/**
 * Format giá tiền (đang dùng VND)
 * DB lưu int: 39000 → UI hiển thị "₫39,000"
 */
function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}



