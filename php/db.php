<?php
/**
 * AS-SIDDIQ Haji & Umroh Travel - Database Helper Class
 * Class ini menggunakan PDO untuk melakukan koneksi dan operasi database MySQL secara aman.
 */

require_once __DIR__ . '/config.php';

class Database {
    private $host = DB_HOST;
    private $user = DB_USER;
    private $pass = DB_PASS;
    private $dbname = DB_NAME;

    private $dbh;
    private $error;
    private $stmt;

    public function __construct() {
        // Set DSN (Data Source Name)
        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname . ';charset=utf8mb4';
        
        // Set opsi PDO
        $options = [
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        // Buat instance PDO
        try {
            $this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
        } catch (PDOException $e) {
            $this->error = $e->getMessage();
            if (APP_ENV === 'development') {
                die("Koneksi database gagal: " . $this->error);
            } else {
                die("Maaf, terjadi kesalahan koneksi pada server kami.");
            }
        }
    }

    // Persiapkan statement dengan query
    public function query($sql) {
        $this->stmt = $this->dbh->prepare($sql);
    }

    // Bind nilai parameter ke query
    public function bind($param, $value, $type = null) {
        if (is_null($type)) {
            switch (true) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }
        $this->stmt->bindValue($param, $value, $type);
    }

    // Eksekusi statement yang dipersiapkan
    public function execute() {
        return $this->stmt->execute();
    }

    // Ambil hasil query berupa array of objects/assoc arrays
    public function resultSet() {
        $this->execute();
        return $this->stmt->fetchAll();
    }

    // Ambil hasil query berupa satu baris data
    public function single() {
        $this->execute();
        return $this->stmt->fetch();
    }

    // Dapatkan jumlah baris yang terpengaruh
    public function rowCount() {
        return $this->stmt->rowCount();
    }

    // Dapatkan ID terakhir yang di-insert
    public function lastInsertId() {
        return $this->dbh->lastInsertId();
    }
}
