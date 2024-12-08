CREATE TABLE TravelLog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    TempatWisataId INT NOT NULL,
    Tanggal DATE,
    DeskripsiUser VARCHAR(1000),
    ImagePath VARCHAR(120),
    FOREIGN KEY (TempatWisataId) REFERENCES TempatWisata(id)
);