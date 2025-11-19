

export interface ProductInterface {
    _id: string,
    name: string;
    description: string;
    sku: string;
    price: number;
    category_id: string;
    product_status: string;
    created_at: string;
    update_at: string;
    stock: number;
    min_stock: number;
    image_url: string;
    gallery_urls: string;
    size: string;
    brand: string;
    barcode: string;
    expiration_date: string;
}