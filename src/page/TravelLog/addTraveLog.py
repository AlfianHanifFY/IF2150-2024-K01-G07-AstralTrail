from PyQt6.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QLineEdit, QLabel, QStackedWidget, QDateEdit, QTextEdit, QFormLayout, QComboBox
from PyQt6.QtCore import QDate, Qt

class AddTravelLogWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Add TravelLog")
        self.setGeometry(200, 200, 800, 600)

        # Main widget
        main_widget = QWidget(self)
        self.setCentralWidget(main_widget)

        # Layout for the window
        main_layout = QVBoxLayout()


        # Horizontal layout to create two columns
        two_column_layout = QHBoxLayout()

        # Column 1 (Destination and Country)
        column_1_layout = QVBoxLayout()

        # Destination ComboBox (Dropdown)
        destination_label = QLabel("Destination")
        destination_combo = QComboBox(self)
        destination_combo.addItem("Select From TempatWisata List")  # Add more items if needed
        column_1_layout.addWidget(destination_label)
        column_1_layout.addWidget(destination_combo)

        # Country Line Edit
        country_label = QLabel("Country")
        country_input = QLineEdit(self)
        column_1_layout.addWidget(country_label)
        column_1_layout.addWidget(country_input)

        # Column 2 (City and Tanggal)
        column_2_layout = QVBoxLayout()

        # City Line Edit with purple border
        city_label = QLabel("City")
        city_input = QLineEdit(self)
        city_input.setStyleSheet("padding: 5px;")
        column_2_layout.addWidget(city_label)
        column_2_layout.addWidget(city_input)

        # DateEdit (for selecting Date)
        date_label = QLabel("Tanggal (DD/MM/YYYY)")
        date_input = QDateEdit(self)
        date_input.setDate(QDate.currentDate())  # Set current date by default
        date_input.setDisplayFormat("dd/MM/yyyy")
        column_2_layout.addWidget(date_label)
        column_2_layout.addWidget(date_input)

        # Add both columns to the main horizontal layout
        two_column_layout.addLayout(column_1_layout)
        two_column_layout.addLayout(column_2_layout)

        # Add the two-column layout to the main layout
        main_layout.addLayout(two_column_layout)

        # Notes TextEdit
        notes_label = QLabel("Notes")
        notes_input = QTextEdit(self)
        notes_input.setPlaceholderText("Placeholder")
        main_layout.addWidget(notes_label)
        main_layout.addWidget(notes_input)

        # Image Upload Section
        upload_label = QLabel("Click to upload or drag and drop")
        upload_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        upload_label.setStyleSheet("border: 2px dashed #ccc; padding: 20px; margin-top: 20px;")
        main_layout.addWidget(upload_label)

        # Upload button to select an image
        upload_button = QPushButton("Upload Image", self)
        upload_button.clicked.connect(self.upload_image)
        main_layout.addWidget(upload_button)

        # Cancel and Save Buttons at the bottom
        button_layout = QHBoxLayout()

        cancel_button = QPushButton("Cancel", self)
        save_button = QPushButton("Save", self)

        button_layout.addWidget(cancel_button)
        button_layout.addWidget(save_button)

        main_layout.addLayout(button_layout)

        # Set layout to main widget
        main_widget.setLayout(main_layout)

    def upload_image(self):
        file_dialog = QFileDialog(self)
        file_dialog.setFileMode(QFileDialog.FileMode.ExistingFiles)
        file_dialog.setNameFilter("Images (*.png *.jpg *.jpeg)")
        if file_dialog.exec():
            image_paths = file_dialog.selectedFiles()
            if image_paths:
                image_path = image_paths[0]
                print(f"Image selected: {image_path}")
