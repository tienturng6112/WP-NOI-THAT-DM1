<?php
/**
 * Setup Script for iPhone 18 WooCommerce Products
 */
require_once __DIR__ . '/wp-load.php';

if (!class_exists('WooCommerce')) {
    echo "WooCommerce is not active.\n";
    exit(1);
}

require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

echo "=== Setting up WooCommerce Apple Store ===\n";

// Function to download image via PHP cURL and create WP attachment
function upload_image_from_url($url, $title) {
    $upload_dir = wp_upload_dir();
    $filename = basename(parse_url($url, PHP_URL_PATH));
    $file_path = $upload_dir['path'] . '/' . $filename;
    $file_url = $upload_dir['url'] . '/' . $filename;

    echo "Downloading {$url} -> {$filename}...\n";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $data = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code !== 200 || empty($data)) {
        echo "Warning: failed to download {$url} (HTTP {$http_code})\n";
        return 0;
    }

    file_put_contents($file_path, $data);

    $filetype = wp_check_filetype($filename, null);
    $attachment = array(
        'post_mime_type' => $filetype['type'] ?: 'image/png',
        'post_title'     => sanitize_text_field($title),
        'post_content'   => '',
        'post_status'    => 'inherit',
        'guid'           => $file_url,
    );

    $attach_id = wp_insert_attachment($attachment, $file_path);
    if (!is_wp_error($attach_id) && $attach_id > 0) {
        $attach_data = wp_generate_attachment_metadata($attach_id, $file_path);
        wp_update_attachment_metadata($attach_id, $attach_data);
        echo "Uploaded attachment ID: {$attach_id} ({$title})\n";
        return $attach_id;
    }

    return 0;
}

// 1. Download and create attachments
$image_urls = [
    'img1' => 'https://pngimg.com/d/iphone_14_PNG2.png',
    'img2' => 'https://pngimg.com/d/iphone_14_PNG21.png',
    'img3' => 'https://pngimg.com/d/iphone_13_PNG28.png',
];

$attach_ids = [];
foreach ($image_urls as $key => $url) {
    $existing = get_posts([
        'post_type' => 'attachment',
        'meta_query' => [
            [
                'key' => '_source_url',
                'value' => $url,
            ]
        ],
        'posts_per_page' => 1
    ]);

    if (!empty($existing)) {
        $attach_ids[$key] = $existing[0]->ID;
        echo "Using existing attachment ID {$attach_ids[$key]} for {$key}\n";
    } else {
        $id = upload_image_from_url($url, "iPhone Asset " . strtoupper($key));
        if ($id) {
            update_post_meta($id, '_source_url', $url);
            $attach_ids[$key] = $id;
        }
    }
}

// 2. Product definitions
$products_data = [
    [
        'name' => 'iPhone 18',
        'slug' => 'iphone-18',
        'price_min' => 28990000,
        'price_max' => 34990000,
        'regular_price' => 28990000,
        'featured_img' => $attach_ids['img1'] ?? 0,
        'featured_url' => $image_urls['img1'],
        'gallery_imgs' => array_filter([$attach_ids['img2'] ?? 0, $attach_ids['img3'] ?? 0]),
        'gallery_urls' => [$image_urls['img2'], $image_urls['img3']],
        'description' => 'iPhone 18 được trang bị chip A20 Bionic đỉnh cao, màn hình Super Retina XDR với tần số quét ProMotion 120Hz mượt mà. Hệ thống camera kép 48MP bắt trọn mọi khoảnh khắc với công nghệ Photonic Engine thế hệ mới.',
        'short_description' => 'Mạnh mẽ vượt trội. Thiết kế nhôm hàng không vũ trụ cùng mặt kính Ceramic Shield bền bỉ bậc nhất.',
        'variations' => [
            ['storage' => '256GB', 'color' => 'Titan Tự Nhiên', 'price' => 28990000],
            ['storage' => '256GB', 'color' => 'Titan Sa Mạc', 'price' => 28990000],
            ['storage' => '256GB', 'color' => 'Đen Nhám', 'price' => 28990000],
            ['storage' => '512GB', 'color' => 'Titan Tự Nhiên', 'price' => 31990000],
            ['storage' => '512GB', 'color' => 'Titan Sa Mạc', 'price' => 31990000],
            ['storage' => '512GB', 'color' => 'Đen Nhám', 'price' => 31990000],
            ['storage' => '1TB',   'color' => 'Titan Tự Nhiên', 'price' => 34990000],
            ['storage' => '1TB',   'color' => 'Titan Sa Mạc', 'price' => 34990000],
            ['storage' => '1TB',   'color' => 'Đen Nhám', 'price' => 34990000],
        ]
    ],
    [
        'name' => 'iPhone 18 Pro',
        'slug' => 'iphone-18-pro',
        'price_min' => 34990000,
        'price_max' => 42990000,
        'regular_price' => 34990000,
        'featured_img' => $attach_ids['img2'] ?? 0,
        'featured_url' => $image_urls['img2'],
        'gallery_imgs' => array_filter([$attach_ids['img1'] ?? 0, $attach_ids['img3'] ?? 0]),
        'gallery_urls' => [$image_urls['img1'], $image_urls['img3']],
        'description' => 'iPhone 18 Pro - Chuẩn mực Pro đích thực với khung viền Titan Cấp 5 siêu nhẹ và bền bỉ. Sức mạnh đột phá từ chip A20 Pro với GPU 6 lõi và phần cứng Ray Tracing, camera Telephoto 5x thế hệ mới.',
        'short_description' => 'Khung Titan chuẩn hàng không vũ trụ. Chip A20 Pro mang lại hiệu năng đồ họa đỉnh cao.',
        'variations' => [
            ['storage' => '256GB', 'color' => 'Titan Tự Nhiên', 'price' => 34990000],
            ['storage' => '256GB', 'color' => 'Titan Sa Mạc', 'price' => 34990000],
            ['storage' => '256GB', 'color' => 'Đen Nhám', 'price' => 34990000],
            ['storage' => '512GB', 'color' => 'Titan Tự Nhiên', 'price' => 38990000],
            ['storage' => '512GB', 'color' => 'Titan Sa Mạc', 'price' => 38990000],
            ['storage' => '512GB', 'color' => 'Đen Nhám', 'price' => 38990000],
            ['storage' => '1TB',   'color' => 'Titan Tự Nhiên', 'price' => 42990000],
            ['storage' => '1TB',   'color' => 'Titan Sa Mạc', 'price' => 42990000],
            ['storage' => '1TB',   'color' => 'Đen Nhám', 'price' => 42990000],
        ]
    ],
    [
        'name' => 'iPhone 18 Pro Max',
        'slug' => 'iphone-18-pro-max',
        'price_min' => 39990000,
        'price_max' => 46990000,
        'regular_price' => 39990000,
        'featured_img' => $attach_ids['img3'] ?? 0,
        'featured_url' => $image_urls['img3'],
        'gallery_imgs' => array_filter([$attach_ids['img1'] ?? 0, $attach_ids['img2'] ?? 0]),
        'gallery_urls' => [$image_urls['img1'], $image_urls['img2']],
        'description' => 'iPhone 18 Pro Max - Đỉnh cao công nghệ Apple. Màn hình lớn 6.9 inch Super Retina XDR viền mỏng nhất từng có. Thời lượng pin dài nhất từ trước đến nay cùng nút Điều Khiển Camera (Camera Control) cảm ứng haptic thế hệ mới.',
        'short_description' => 'Màn hình 6.9 inch siêu đỉnh, thời lượng pin cả ngày dài và camera Pro tối thượng.',
        'variations' => [
            ['storage' => '256GB', 'color' => 'Titan Tự Nhiên', 'price' => 39990000],
            ['storage' => '256GB', 'color' => 'Titan Sa Mạc', 'price' => 39990000],
            ['storage' => '256GB', 'color' => 'Đen Nhám', 'price' => 39990000],
            ['storage' => '512GB', 'color' => 'Titan Tự Nhiên', 'price' => 43990000],
            ['storage' => '512GB', 'color' => 'Titan Sa Mạc', 'price' => 43990000],
            ['storage' => '512GB', 'color' => 'Đen Nhám', 'price' => 43990000],
            ['storage' => '1TB',   'color' => 'Titan Tự Nhiên', 'price' => 46990000],
            ['storage' => '1TB',   'color' => 'Titan Sa Mạc', 'price' => 46990000],
            ['storage' => '1TB',   'color' => 'Đen Nhám', 'price' => 46990000],
        ]
    ],
];

// Clean existing iPhone products if needed
foreach ($products_data as $p) {
    $existing = get_page_by_path($p['slug'], OBJECT, 'product');
    if ($existing) {
        wp_delete_post($existing->ID, true);
        echo "Deleted old product ID {$existing->ID}\n";
    }
}

// 3. Create products with attributes and variations
foreach ($products_data as $p_info) {
    echo "Creating Variable Product: {$p_info['name']}...\n";

    $product = new WC_Product_Variable();
    $product->set_name($p_info['name']);
    $product->set_slug($p_info['slug']);
    $product->set_status('publish');
    $product->set_catalog_visibility('visible');
    $product->set_description($p_info['description']);
    $product->set_short_description($p_info['short_description']);
    $product->set_manage_stock(false);
    $product->set_stock_status('instock');

    // Attachments
    if (!empty($p_info['featured_img'])) {
        $product->set_image_id($p_info['featured_img']);
    }
    if (!empty($p_info['gallery_imgs'])) {
        $product->set_gallery_image_ids($p_info['gallery_imgs']);
    }

    // Set attributes
    $attr_storage = new WC_Product_Attribute();
    $attr_storage->set_id(0);
    $attr_storage->set_name('Dung lượng');
    $attr_storage->set_options(['256GB', '512GB', '1TB']);
    $attr_storage->set_position(0);
    $attr_storage->set_visible(true);
    $attr_storage->set_variation(true);

    $attr_color = new WC_Product_Attribute();
    $attr_color->set_id(0);
    $attr_color->set_name('Màu sắc');
    $attr_color->set_options(['Titan Tự Nhiên', 'Titan Sa Mạc', 'Đen Nhám']);
    $attr_color->set_position(1);
    $attr_color->set_visible(true);
    $attr_color->set_variation(true);

    $product->set_attributes([$attr_storage, $attr_color]);
    $product_id = $product->save();

    echo "Saved Product ID: {$product_id}\n";

    // Set direct URL metadata for external references
    update_post_meta($product_id, '_direct_featured_url', $p_info['featured_url']);
    update_post_meta($product_id, '_direct_gallery_urls', $p_info['gallery_urls']);

    // Create variations
    foreach ($p_info['variations'] as $v) {
        $variation = new WC_Product_Variation();
        $variation->set_parent_id($product_id);
        $variation->set_status('publish');
        $variation->set_regular_price($v['price']);
        $variation->set_price($v['price']);
        $variation->set_attributes([
            'dung-luong' => $v['storage'],
            'mau-sac'    => $v['color']
        ]);
        $variation->set_manage_stock(false);
        $variation->set_stock_status('instock');
        $var_id = $variation->save();
        echo "  - Added Variation ID {$var_id}: {$v['storage']} / {$v['color']} -> " . number_format($v['price']) . "đ\n";
    }

    // Sync variable product prices
    WC_Product_Variable::sync($product_id);
    echo "Completed {$p_info['name']}!\n\n";
}

echo "=== All Products Successfully Created! ===\n";
