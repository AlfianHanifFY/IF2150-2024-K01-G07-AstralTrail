CREATE TABLE BucketList (
    id INT AUTO_INCREMENT PRIMARY KEY,
    TempatWisataId INT NOT NULL,
    Tanggal DATE,
    FOREIGN KEY (TempatWisataId) REFERENCES TempatWisata(id)
);
