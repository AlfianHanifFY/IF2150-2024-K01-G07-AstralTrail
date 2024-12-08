CREATE TABLE TempatWisata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NamaTempatWisata VARCHAR(100) NOT NULL,
    NamaNegara VARCHAR(120) NOT NULL,
    NamaKota VARCHAR(120) NOT NULL,
    Deskripsi VARCHAR(1000),
    ImagePath VARCHAR(120)
);