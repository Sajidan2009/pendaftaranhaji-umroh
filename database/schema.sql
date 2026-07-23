-- Skema Database untuk Website Travel Haji & Umroh AS-SIDDIQ
-- Gunakan skema ini untuk mengimpor data ke MySQL ketika melakukan migrasi ke PHP/MySQL dinamis

CREATE DATABASE IF NOT EXISTS `as_siddiq_travel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `as_siddiq_travel`;

-- 1. Tabel Admin/Pengguna (Jika di masa depan memerlukan login admin untuk mengelola konten)
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `fullname` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabel Kategori Paket (Haji, Umroh, VIP, dll)
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `slug` VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabel Paket Perjalanan
CREATE TABLE IF NOT EXISTS `packages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `price` DECIMAL(15,2) NOT NULL, -- Menyimpan harga paket (misal: 35000000.00)
  `duration_days` INT NOT NULL,     -- Jumlah hari (misal: 9 atau 12)
  `departure_date` DATE NOT NULL,  -- Perkiraan keberangkatan
  `airline` VARCHAR(100) NOT NULL, -- Maskapai (Saudi Arabian, Garuda, dll)
  `hotel_rating` INT NOT NULL,     -- Bintang hotel (3, 4, 5)
  `hotel_name` VARCHAR(150) NOT NULL, -- Nama hotel di Mekkah/Madinah
  `description` TEXT NOT NULL,     -- Deskripsi lengkap paket
  `facilities_included` TEXT NOT NULL, -- Fasilitas gratis (JSON atau teks berpemisah baris)
  `facilities_excluded` TEXT NOT NULL, -- Yang tidak termasuk biaya (JSON atau teks berpemisah baris)
  `itinerary` TEXT NOT NULL,       -- Jadwal perjalanan per hari (JSON atau teks)
  `thumbnail` VARCHAR(255) NOT NULL, -- URL path gambar utama
  `gallery_images` TEXT DEFAULT NULL, -- Path gambar galeri detail (JSON array)
  `status` ENUM('available', 'sold_out', 'coming_soon') DEFAULT 'available',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabel Galeri Kegiatan
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `category` VARCHAR(50) NOT NULL, -- Haji, Umroh, Syiar, Kegiatan
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tabel Artikel Blog
CREATE TABLE IF NOT EXISTS `articles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(200) NOT NULL UNIQUE,
  `content` TEXT NOT NULL,
  `thumbnail` VARCHAR(255) NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Tabel Logging Pemesanan (Opsional untuk mencatat klik pemesanan ke WhatsApp)
CREATE TABLE IF NOT EXISTS `booking_clicks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `package_id` INT NOT NULL,
  `customer_name` VARCHAR(100) DEFAULT NULL,
  `clicked_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tambahkan dummy data untuk kategori
INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Haji', 'haji'),
(2, 'Umroh', 'umroh');
