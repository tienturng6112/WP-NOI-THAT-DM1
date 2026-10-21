<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_iphone18' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          ' e#~vKbRBT?TvC vmf_Q=:BN$*^ZTK>-S6|NpAEW71=;sDv<{J!UBU#`y&j}/+}l' );
define( 'SECURE_AUTH_KEY',   ')oGR:Y%(:#r4e0Kmck(D,HRYA9Q#f+oYhY|2jw_`Py*1!Yo1e~~i1+F5OJg-{:WQ' );
define( 'LOGGED_IN_KEY',     'u`jgS?mSc#rs[Hxua1+ft,#+c!Gp~0)R}Mj/DoZ~dh*f`( UT?O-pvCJ#B+2-`:7' );
define( 'NONCE_KEY',         'D$s;` @Zf<[_}[p!QGaj#V=0lTd2vYGhIw81oN-%WVjMd;iqPJ# DfZx~;Z>ANQC' );
define( 'AUTH_SALT',         '#6i)%3xHy1SB{AW) f}@48dGTf3lEJ$$Hc[bj&t12L xUg3]v[s%<<p}C_/0Dmax' );
define( 'SECURE_AUTH_SALT',  'c5dWMn].dmf,^?pXW4qA;Ti-@)O|MsNW?dhP H/2ix8k4++b({mEMD<Ro%%~X-?3' );
define( 'LOGGED_IN_SALT',    'eD}>DZ-ZY(p1hItCU*/,tRGK`<WXbc uf8D:&Dg| wM &ns$*~oA  Q{&-0PTj,u' );
define( 'NONCE_SALT',        'zmIL3^Nei%nHQ7l7q7j%/!50CGYj`9,49>!umKv6<A6D{`qww~;;R_VA-e$DI1^l' );
define( 'WP_CACHE_KEY_SALT', 'gt_j6Qi6{S(#3d(dE5oeRdV7W8+22OQaw|c(ZI<=%YmVBiS&)U.)Nj(]st4<5NFJ' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
