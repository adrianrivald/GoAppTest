export type ProductModelType = {
    total: number;
    offset: number;
    products: ProductDetailModelType[];
}

export type ProductDetailModelType = {
        uid: number;
        key: string;
        name: string;
        variant_name: null;
        product_type: string;
        basic_unit: string;
        shipping_weight: number;
        sku: string;
        primary_image_path: string;
        primary_image_url: string;
        ready_quantity: number;
        total_view: number;
        total_sold: number;
        total_rating: number;
        total_like: number;
        avg_rating: number;
        count: number;
        original_price: OriginalPriceModelType;
    }
    

export type OriginalPriceModelType = {
    min_quantity: number;
    price: number;
    base_price: string;
    currency: string
};