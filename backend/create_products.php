<?php
/**
 * Setup Script for Atelier Sofa Luxury Furniture (WooCommerce)
 */
require_once __DIR__ . '/wp-load.php';

if (!class_exists('WooCommerce')) {
    echo "WooCommerce is not active.\n";
    exit(1);
}

require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

echo "=== Setting up Atelier Sofa Luxury Furniture Store ===\n";

// Function to download image via PHP cURL and create WP attachment
function upload_image_from_url($url, $title) {
    $upload_dir = wp_upload_dir();
    $filename = 'sofa_' . md5($url) . '.jpg';
    $file_path = $upload_dir['path'] . '/' . $filename;
    $file_url = $upload_dir['url'] . '/' . $filename;

    echo "Downloading {$url} -> {$filename}...\n";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
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
        'post_mime_type' => $filetype['type'] ?: 'image/jpeg',
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

// 1. Image URLs
$image_urls = [
    'sofa1' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85',
    'sofa2' => 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=85',
    'sofa3' => 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1400&q=85',
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
        $id = upload_image_from_url($url, "Atelier Sofa " . strtoupper($key));
        if ($id) {
            update_post_meta($id, '_source_url', $url);
            $attach_ids[$key] = $id;
        }
    }
}

// 2. Sofa definitions
$products_data = [
    [
        'name' => 'Milano Modular Sofa',
        'slug' => 'milano-modular-sofa',
        'price_min' => 89000000,
        'price_max' => 145000000,
        'regular_price' => 89000000,
        'featured_img' => $attach_ids['sofa1'] ?? 0,
        'featured_url' => $image_urls['sofa1'],
        'gallery_imgs' => array_filter([$attach_ids['sofa2'] ?? 0, $attach_ids['sofa3'] ?? 0]),
        'gallery_urls' => [$image_urls['sofa2'], $image_urls['sofa3']],
        'description' => 'Milano Modular Sofa là hiện thân của phong cách Italian Minimalist sang trọng. Cấu trúc mô-đun tự do, khung gỗ Sồi Mỹ nguyên khối và lớp đệm lông vũ tỷ lệ vàng.',
        'short_description' => 'Kiến trúc mô-đun Ý. Sự giao thoa giữa điêu khắc và tiện nghi sống đỉnh cao.',
        'variations' => [
            ['size' => '2.4m - 3 Chỗ ngồi', 'fabric' => 'Bouclé Kem Tuyết', 'price' => 89000000],
            ['size' => '2.4m - 3 Chỗ ngồi', 'fabric' => 'Da Semi-Aniline Cognac', 'price' => 98000000],
            ['size' => '3.2m - Góc Chữ L', 'fabric' => 'Bouclé Kem Tuyết', 'price' => 118000000],
            ['size' => '3.2m - Góc Chữ L', 'fabric' => 'Da Semi-Aniline Cognac', 'price' => 128000000],
            ['size' => '3.8m - Grand Sectional', 'fabric' => 'Bouclé Kem Tuyết', 'price' => 145000000],
            ['size' => '3.8m - Grand Sectional', 'fabric' => 'Da Semi-Aniline Cognac', 'price' => 158000000],
        ]
    ],
    [
        'name' => 'Nordic Bouclé Lounge Sofa',
        'slug' => 'nordic-boucle-lounge-sofa',
        'price_min' => 64500000,
        'price_max' => 108000000,
        'regular_price' => 64500000,
        'featured_img' => $attach_ids['sofa2'] ?? 0,
        'featured_url' => $image_urls['sofa2'],
        'gallery_imgs' => array_filter([$attach_ids['sofa1'] ?? 0, $attach_ids['sofa3'] ?? 0]),
        'gallery_urls' => [$image_urls['sofa1'], $image_urls['sofa3']],
        'description' => 'Nordic Bouclé Lounge sở hữu đường cong uốn lượn liên tục không góc cạnh. Bề mặt bọc lớp vải Bouclé len cừu bồng bềnh mang lại xúc giác êm ái tuyệt đối.',
        'short_description' => 'Đường nét hữu cơ Scandinavia mềm mại, bọc vải Bouclé len cừu tự nhiên ấm cúng.',
        'variations' => [
            ['size' => '2.2m - Dáng Cong Nhẹ', 'fabric' => 'Bouclé Kem Yến Mạch', 'price' => 64500000],
            ['size' => '2.8m - Dáng Cong Điêu Khắc', 'fabric' => 'Bouclé Kem Yến Mạch', 'price' => 86000000],
            ['size' => '3.4m - Tổ Hợp Vòng Cung', 'fabric' => 'Bouclé Kem Yến Mạch', 'price' => 108000000],
        ]
    ],
    [
        'name' => 'Verona Cognac Leather Sofa',
        'slug' => 'verona-cognac-leather-sofa',
        'price_min' => 115000000,
        'price_max' => 198000000,
        'regular_price' => 115000000,
        'featured_img' => $attach_ids['sofa3'] ?? 0,
        'featured_url' => $image_urls['sofa3'],
        'gallery_imgs' => array_filter([$attach_ids['sofa1'] ?? 0, $attach_ids['sofa2'] ?? 0]),
        'gallery_urls' => [$image_urls['sofa1'], $image_urls['sofa2']],
        'description' => 'Verona là kiệt tác chế tác từ các nghệ nhân vùng Florence. Từng mét da bò Full-Grain được tuyển chọn khắt khe, thuộc thảo mộc tự nhiên tại vùng Tuscany.',
        'short_description' => 'Da bò Ý Full-Grain nguyên tấm thuộc thảo mộc, chân kim loại đồng thau xước mờ.',
        'variations' => [
            ['size' => '2.6m - 3 Chỗ ngồi VIP', 'fabric' => 'Da Bò Cognac Tuscany', 'price' => 115000000],
            ['size' => '3.3m - Góc L Da Bò', 'fabric' => 'Da Bò Cognac Tuscany', 'price' => 158000000],
            ['size' => '4.0m - Bộ Tổng Thống', 'fabric' => 'Da Bò Cognac Tuscany', 'price' => 198000000],
        ]
    ],
];

// Clean old products if any
foreach ($products_data as $p) {
    $existing = get_page_by_path($p['slug'], OBJECT, 'product');
    if ($existing) {
        wp_delete_post($existing->ID, true);
        echo "Deleted old product ID {$existing->ID}\n";
    }
}

// 3. Create products with attributes and variations
foreach ($products_data as $p_info) {
    echo "Creating Variable Sofa: {$p_info['name']}...\n";

    $product = new WC_Product_Variable();
    $product->set_name($p_info['name']);
    $product->set_slug($p_info['slug']);
    $product->set_status('publish');
    $product->set_catalog_visibility('visible');
    $product->set_description($p_info['description']);
    $product->set_short_description($p_info['short_description']);
    $product->set_manage_stock(false);
    $product->set_stock_status('instock');

    if (!empty($p_info['featured_img'])) {
        $product->set_image_id($p_info['featured_img']);
    }
    if (!empty($p_info['gallery_imgs'])) {
        $product->set_gallery_image_ids($p_info['gallery_imgs']);
    }

    $product_id = $product->save();
    echo "Saved Product ID: {$product_id}\n";

    update_post_meta($product_id, '_direct_featured_url', $p_info['featured_url']);
    update_post_meta($product_id, '_direct_gallery_urls', $p_info['gallery_urls']);

    echo "Completed {$p_info['name']}!\n\n";
}

echo "=== All Atelier Sofas Successfully Created! ===\n";
