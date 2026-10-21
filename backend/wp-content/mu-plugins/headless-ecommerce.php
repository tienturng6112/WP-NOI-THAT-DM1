<?php
/**
 * Plugin Name: Headless E-commerce Helper for Next.js & WPGraphQL
 * Description: Enables CORS, allows public GraphQL access to products, Bento Features admin manager, and redirects frontend visitors to Next.js.
 */

// 1. Enable CORS for all GraphQL and REST requests
add_action('init', function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With, Origin, Accept");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
});

// 2. Add CORS to WPGraphQL response headers
add_filter('graphql_response_headers_to_send', function ($headers) {
    $headers['Access-Control-Allow-Origin'] = '*';
    $headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, X-Requested-With, Origin, Accept';
    $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    return $headers;
});

// Helper for default Bento data
function get_default_bento_data() {
    return [
        'super_title' => 'ĐỈNH CAO CÔNG NGHỆ',
        'heading'     => 'Tìm hiểu những điểm chạm vượt bậc.',
        'description' => 'Mỗi chi tiết trên dòng iPhone 18 đều được thiết kế tỉ mỉ để mang đến trải nghiệm đột phá chưa từng có.',
        'features'    => [
            [
                'tag'         => 'Hiệu Năng Vô Song',
                'title'       => 'Chip A20 Pro Bionic',
                'description' => 'Kiến trúc 3nm thế hệ thứ ba hoàn toàn mới. Nhanh hơn 35% và tiết kiệm năng lượng 40% so với thế hệ trước.',
                'icon'        => 'cpu',
                'gradient'    => 'blue'
            ],
            [
                'tag'         => 'Nhiếp Ảnh Điện Toán',
                'title'       => 'Camera 48MP Fusion Pro',
                'description' => 'Ống kính Telephoto 5x và cảm biến Quad-Pixel thế hệ 3 bắt trọn mọi chi tiết trong điều kiện ánh sáng yếu.',
                'icon'        => 'camera',
                'gradient'    => 'amber'
            ],
            [
                'tag'         => 'Vật Liệu Đỉnh Cao',
                'title'       => 'Khung Titan Cấp 5',
                'description' => 'Hợp kim Titan dùng trong ngành hàng không vũ trụ, mang lại tỷ lệ độ bền trên trọng lượng cao nhất từng có trên iPhone.',
                'icon'        => 'shield',
                'gradient'    => 'neutral'
            ],
            [
                'tag'         => 'Trí Tuệ Nhân Tạo',
                'title'       => 'Apple Intelligence',
                'description' => 'Hệ thống trí tuệ cá nhân hóa sâu sắc, tích hợp trực tiếp trên thiết bị bảo vệ tối đa quyền riêng tư của bạn.',
                'icon'        => 'sparkles',
                'gradient'    => 'pink'
            ],
            [
                'tag'         => 'Năng Lượng Bền Bỉ',
                'title'       => 'Thời Lượng Pin 33 Giờ',
                'description' => 'Tận hưởng cả ngày dài sử dụng thoải mái với công nghệ pin xếp chồng tiên tiến và sạc nhanh MagSafe 35W.',
                'icon'        => 'battery-charging',
                'gradient'    => 'emerald'
            ],
            [
                'tag'         => 'Màn Hình Pro',
                'title'       => 'Super Retina XDR 120Hz',
                'description' => 'Độ sáng đỉnh 3000 nits ngoài trời, công nghệ ProMotion 1-120Hz mượt mà và màn hình luôn bật Always-On.',
                'icon'        => 'layers',
                'gradient'    => 'cyan'
            ],
        ]
    ];
}

// 3. Expose custom fields & BentoSection to WPGraphQL
add_action('graphql_register_types', function () {
    // Custom Product fields
    register_graphql_field('Product', 'directFeaturedUrl', [
        'type' => 'String',
        'description' => 'Direct PNG URL for Featured Image',
        'resolve' => function ($product) {
            return get_post_meta($product->databaseId, '_direct_featured_url', true);
        }
    ]);

    register_graphql_field('Product', 'directGalleryUrls', [
        'type' => ['list_of' => 'String'],
        'description' => 'Direct PNG URLs for Gallery',
        'resolve' => function ($product) {
            $urls = get_post_meta($product->databaseId, '_direct_gallery_urls', true);
            return is_array($urls) ? $urls : [];
        }
    ]);

    // Bento Types
    register_graphql_object_type('BentoFeature', [
        'description' => 'A single Bento card feature',
        'fields' => [
            'tag'         => ['type' => 'String'],
            'title'       => ['type' => 'String'],
            'description' => ['type' => 'String'],
            'icon'        => ['type' => 'String'],
            'gradient'    => ['type' => 'String'],
        ]
    ]);

    register_graphql_object_type('BentoSection', [
        'description' => 'Bento Highlights Section on Homepage',
        'fields' => [
            'superTitle'  => ['type' => 'String'],
            'heading'     => ['type' => 'String'],
            'description' => ['type' => 'String'],
            'features'    => ['type' => ['list_of' => 'BentoFeature']],
        ]
    ]);

    register_graphql_field('RootQuery', 'bentoSection', [
        'type' => 'BentoSection',
        'description' => 'Get Bento highlights for homepage',
        'resolve' => function () {
            $data = get_option('apple_bento_features');
            if (empty($data) || !is_array($data)) {
                $data = get_default_bento_data();
            }
            return [
                'superTitle'  => $data['super_title'] ?? 'ĐỈNH CAO CÔNG NGHỆ',
                'heading'     => $data['heading'] ?? 'Tìm hiểu những điểm chạm vượt bậc.',
                'description' => $data['description'] ?? '',
                'features'    => $data['features'] ?? []
            ];
        }
    ]);
});

// 4. Redirect all frontend visitor traffic from WordPress (8080) to Next.js (3000)
add_action('template_redirect', function () {
    if (!is_admin() && !defined('DOING_CRON') && !defined('REST_REQUEST')) {
        $uri = $_SERVER['REQUEST_URI'] ?? '/';
        if (strpos($uri, '/graphql') === false && strpos($uri, '/wp-json') === false) {
            wp_redirect('http://localhost:3000', 302);
            exit();
        }
    }
});

// 5. Admin Menu & Management Page for Bento Features
add_action('admin_menu', function () {
    add_menu_page(
        'Quản lý Bento Features (Next.js)',
        'Bento Features',
        'manage_options',
        'bento-features',
        'render_bento_features_admin_page',
        'dashicons-grid-view',
        26
    );
});

function render_bento_features_admin_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $saved_notice = false;

    // Handle form submit
    if (isset($_POST['save_bento_features_nonce']) && wp_verify_nonce($_POST['save_bento_features_nonce'], 'save_bento_features_action')) {
        $features = [];
        if (!empty($_POST['features']) && is_array($_POST['features'])) {
            foreach ($_POST['features'] as $f) {
                if (!empty($f['title'])) {
                    $features[] = [
                        'tag'         => sanitize_text_field($f['tag'] ?? ''),
                        'title'       => sanitize_text_field($f['title']),
                        'description' => sanitize_textarea_field($f['description'] ?? ''),
                        'icon'        => sanitize_text_field($f['icon'] ?? 'cpu'),
                        'gradient'    => sanitize_text_field($f['gradient'] ?? 'blue'),
                    ];
                }
            }
        }

        $bento_data = [
            'super_title' => sanitize_text_field($_POST['super_title'] ?? ''),
            'heading'     => sanitize_text_field($_POST['heading'] ?? ''),
            'description' => sanitize_textarea_field($_POST['description'] ?? ''),
            'features'    => $features,
        ];

        update_option('apple_bento_features', $bento_data);
        $saved_notice = true;
    }

    $data = get_option('apple_bento_features');
    if (empty($data) || !is_array($data)) {
        $data = get_default_bento_data();
    }

    $icons = [
        'cpu'              => 'Chip / Vi xử lý (Cpu)',
        'camera'           => 'Máy ảnh / Camera Pro',
        'shield'           => 'Khung Titan / Khiên bảo vệ',
        'sparkles'         => 'Trí tuệ nhân tạo (Apple Intelligence)',
        'battery-charging' => 'Pin trâu / Sạc nhanh',
        'layers'           => 'Màn hình hiển thị Pro',
        'zap'              => 'Tia chớp / Hiệu năng',
    ];

    $gradients = [
        'blue'    => 'Xanh Dương Apple (from-blue-600)',
        'amber'   => 'Vàng Titan Sa Mạc (from-amber-600)',
        'neutral' => 'Xám Titan Tự Nhiên (from-neutral-600)',
        'pink'    => 'Hồng Neon Intelligence (from-pink-600)',
        'emerald' => 'Xanh Ngọc Năng Lượng (from-emerald-600)',
        'cyan'    => 'Xanh Lơ Super Retina (from-cyan-600)',
    ];
    ?>
    <div class="wrap" style="max-width: 1000px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h1 style="display: flex; align-items: center; gap: 8px;">
            <span class="dashicons dashicons-grid-view" style="font-size: 28px; width: 28px; height: 28px; color: #0071e3;"></span>
            Quản Lý Thẻ Bento Highlights (Hiển Thị Trên Next.js)
        </h1>
        <p style="color: #666; margin-bottom: 20px;">
            Mọi chỉnh sửa tại đây sẽ được truyền trực tiếp qua <strong>WPGraphQL</strong> đến giao diện Next.js ở cổng <code>localhost:3000</code>.
        </p>

        <?php if ($saved_notice): ?>
            <div class="notice notice-success is-dismissible" style="border-left-color: #0071e3;">
                <p><strong>Thành công!</strong> Đã lưu cài đặt Bento Features. Hãy mở lại <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> và nhấn F5 để xem thay đổi ngay lập tức.</p>
            </div>
        <?php endif; ?>

        <form method="POST" action="">
            <?php wp_nonce_field('save_bento_features_action', 'save_bento_features_nonce'); ?>

            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 20px; margin-bottom: 25px; box-shadow: 0 1px 3px rgba(0,0,0,.04);">
                <h2 style="font-size: 16px; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">1. Tiêu Đề Khu Vực (Section Header)</h2>
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="super_title">Nhãn nhỏ (Tagline)</label></th>
                        <td><input type="text" id="super_title" name="super_title" value="<?php echo esc_attr($data['super_title']); ?>" class="regular-text" style="width: 100%; max-width: 500px;" placeholder="Ví dụ: ĐỈNH CAO CÔNG NGHỆ" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="heading">Tiêu đề lớn (Heading H2)</label></th>
                        <td><input type="text" id="heading" name="heading" value="<?php echo esc_attr($data['heading']); ?>" class="regular-text" style="width: 100%; max-width: 500px;" placeholder="Ví dụ: Tìm hiểu những điểm chạm vượt bậc." /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="description">Mô tả ngắn</label></th>
                        <td><textarea id="description" name="description" rows="2" class="large-text" style="width: 100%; max-width: 500px;"><?php echo esc_textarea($data['description']); ?></textarea></td>
                    </tr>
                </table>
            </div>

            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 20px; margin-bottom: 25px; box-shadow: 0 1px 3px rgba(0,0,0,.04);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">
                    <h2 style="font-size: 16px; margin: 0;">2. Danh Sách Thẻ Tính Năng (Bento Cards)</h2>
                    <button type="button" id="btn-add-feature" class="button button-primary" style="background: #0071e3; border-color: #0071e3;">+ Thêm Thẻ Mới</button>
                </div>

                <div id="features-container" style="display: flex; flex-direction: column; gap: 15px;">
                    <?php foreach ($data['features'] as $idx => $f): ?>
                        <div class="feature-card" style="border: 1px solid #e2e4e7; border-radius: 6px; padding: 15px; background: #fafafa; position: relative;">
                            <button type="button" class="btn-remove-card button-link-delete" style="position: absolute; top: 12px; right: 12px; text-decoration: none; font-size: 13px; color: #dc3232; cursor: pointer;">✕ Xóa thẻ này</button>
                            <h3 style="margin-top: 0; font-size: 14px; color: #0071e3;">Thẻ #<span class="card-num"><?php echo $idx + 1; ?></span>: <span class="card-title-preview"><?php echo esc_html($f['title']); ?></span></h3>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                <div>
                                    <label style="display: block; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Tag danh mục nhỏ</label>
                                    <input type="text" name="features[<?php echo $idx; ?>][tag]" value="<?php echo esc_attr($f['tag']); ?>" style="width: 100%;" placeholder="Ví dụ: HIỆU NĂNG VÔ SONG" />
                                </div>
                                <div>
                                    <label style="display: block; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Tiêu đề thẻ (*)</label>
                                    <input type="text" name="features[<?php echo $idx; ?>][title]" value="<?php echo esc_attr($f['title']); ?>" style="width: 100%; font-weight: bold;" required />
                                </div>
                                <div style="grid-column: span 2;">
                                    <label style="display: block; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Nội dung mô tả</label>
                                    <textarea name="features[<?php echo $idx; ?>][description]" rows="2" style="width: 100%;"><?php echo esc_textarea($f['description']); ?></textarea>
                                </div>
                                <div>
                                    <label style="display: block; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Biểu tượng Icon</label>
                                    <select name="features[<?php echo $idx; ?>][icon]" style="width: 100%;">
                                        <?php foreach ($icons as $ival => $ilabel): ?>
                                            <option value="<?php echo esc_attr($ival); ?>" <?php selected($f['icon'], $ival); ?>><?php echo esc_html($ilabel); ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Tông màu Gradient</label>
                                    <select name="features[<?php echo $idx; ?>][gradient]" style="width: 100%;">
                                        <?php foreach ($gradients as $gval => $glabel): ?>
                                            <option value="<?php echo esc_attr($gval); ?>" <?php selected($f['gradient'], $gval); ?>><?php echo esc_html($glabel); ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <p class="submit" style="margin-top: 20px;">
                <input type="submit" name="submit" id="submit" class="button button-primary button-large" value="Lưu Thay Đổi (Cập Nhật Lên Next.js)" style="background: #0071e3; border-color: #0071e3; font-size: 15px; padding: 6px 24px; height: auto;" />
            </p>
        </form>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        var container = document.getElementById('features-container');
        var addBtn = document.getElementById('btn-add-feature');

        function updateIndices() {
            var cards = container.querySelectorAll('.feature-card');
            cards.forEach(function(card, idx) {
                card.querySelector('.card-num').textContent = idx + 1;
                card.querySelectorAll('input, textarea, select').forEach(function(field) {
                    var name = field.getAttribute('name');
                    if (name) {
                        field.setAttribute('name', name.replace(/features\[\d+\]/, 'features[' + idx + ']'));
                    }
                });
            });
        }

        addBtn.addEventListener('click', function() {
            var currentCards = container.querySelectorAll('.feature-card');
            var newIndex = currentCards.length;
            var template = `
            <div class="feature-card" style="border: 1px solid #0071e3; border-radius: 6px; padding: 15px; background: #fafafa; position: relative; animation: fadeIn 0.3s;">
                <button type="button" class="btn-remove-card button-link-delete" style="position: absolute; top: 12px; right: 12px; text-decoration: none; font-size: 13px; color: #dc3232; cursor: pointer;">✕ Xóa thẻ này</button>
                <h3 style="margin-top: 0; font-size: 14px; color: #0071e3;">Thẻ #<span class="card-num">${newIndex + 1}</span>: Thẻ tính năng mới</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div>
                        <label style="display: block; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Tag danh mục nhỏ</label>
                        <input type="text" name="features[${newIndex}][tag]" value="TÍNH NĂNG MỚI" style="width: 100%;" />
                    </div>
                    <div>
                        <label style="display: block; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Tiêu đề thẻ (*)</label>
                        <input type="text" name="features[${newIndex}][title]" value="Tính năng đột phá 2026" style="width: 100%; font-weight: bold;" required />
                    </div>
                    <div style="grid-column: span 2;">
                        <label style="display: block; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Nội dung mô tả</label>
                        <textarea name="features[${newIndex}][description]" rows="2" style="width: 100%;">Mô tả chi tiết công nghệ tiên phong của dòng iPhone 18.</textarea>
                    </div>
                    <div>
                        <label style="display: block; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Biểu tượng Icon</label>
                        <select name="features[${newIndex}][icon]" style="width: 100%;">
                            <option value="cpu">Chip / Vi xử lý (Cpu)</option>
                            <option value="camera">Máy ảnh / Camera Pro</option>
                            <option value="shield">Khung Titan / Khiên bảo vệ</option>
                            <option value="sparkles">Trí tuệ nhân tạo (Apple Intelligence)</option>
                            <option value="battery-charging">Pin trâu / Sạc nhanh</option>
                            <option value="layers">Màn hình hiển thị Pro</option>
                            <option value="zap">Tia chớp / Hiệu năng</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Tông màu Gradient</label>
                        <select name="features[${newIndex}][gradient]" style="width: 100%;">
                            <option value="blue">Xanh Dương Apple (from-blue-600)</option>
                            <option value="amber">Vàng Titan Sa Mạc (from-amber-600)</option>
                            <option value="neutral">Xám Titan Tự Nhiên (from-neutral-600)</option>
                            <option value="pink">Hồng Neon Intelligence (from-pink-600)</option>
                            <option value="emerald">Xanh Ngọc Năng Lượng (from-emerald-600)</option>
                            <option value="cyan">Xanh Lơ Super Retina (from-cyan-600)</option>
                        </select>
                    </div>
                </div>
            </div>`;
            container.insertAdjacentHTML('beforeend', template);
            updateIndices();
        });

        container.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('btn-remove-card')) {
                var card = e.target.closest('.feature-card');
                if (card) {
                    card.remove();
                    updateIndices();
                }
            }
        });
    });
    </script>
    <?php
}
