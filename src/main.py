import sys
from PyQt6.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QLineEdit, QLabel, QStackedWidget, QDateEdit, QTextEdit, QFormLayout, QComboBox
from PyQt6.QtCore import QDate, Qt

from page.TravelLog.addTraveLog import AddTravelLogWindow
from page.home.home import HomeMainWindow



class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Navbar with AddTravelLog Example")
        
        # Central widget and layout
        self.central_widget = QWidget(self)
        self.setCentralWidget(self.central_widget)
        self.layout = QVBoxLayout(self.central_widget)

        # Navbar layout
        self.navbar = QHBoxLayout()
        self.layout.addLayout(self.navbar)

        # Create buttons for the navbar
        self.home_button = QPushButton("Home")
        self.tempat_wisata_button = QPushButton("Tempat Wisata")
        self.travel_log_button = QPushButton("Travel Log")
        self.bucket_list_button = QPushButton("Bucket List")
        self.statistik_button = QPushButton("Statistik")

        # Add buttons to navbar
        self.navbar.addWidget(self.home_button)
        self.navbar.addWidget(self.tempat_wisata_button)
        self.navbar.addWidget(self.travel_log_button)
        self.navbar.addWidget(self.bucket_list_button)
        self.navbar.addWidget(self.statistik_button)

        # Stacked widget for dynamic content
        self.stacked_widget = QStackedWidget(self.central_widget)
        self.layout.addWidget(self.stacked_widget)

        # Example pages for each section
        self.home_page = HomeMainWindow()
        self.tempat_wisata_page = QWidget()
        self.travel_log_page = AddTravelLogWindow()
        self.bucket_list_page = QWidget()
        self.statistik_page = QWidget()

        self.stacked_widget.addWidget(self.home_page)
        self.stacked_widget.addWidget(self.tempat_wisata_page)
        self.stacked_widget.addWidget(self.travel_log_page)
        self.stacked_widget.addWidget(self.bucket_list_page)
        self.stacked_widget.addWidget(self.statistik_page)

        # Button actions to change pages
        self.home_button.clicked.connect(lambda: self.stacked_widget.setCurrentWidget(self.home_page))
        self.tempat_wisata_button.clicked.connect(lambda: self.stacked_widget.setCurrentWidget(self.tempat_wisata_page))
        self.travel_log_button.clicked.connect(lambda: self.stacked_widget.setCurrentWidget(self.travel_log_page))
        self.bucket_list_button.clicked.connect(lambda: self.stacked_widget.setCurrentWidget(self.bucket_list_page))
        self.statistik_button.clicked.connect(lambda: self.stacked_widget.setCurrentWidget(self.statistik_page))

        self.show()

# Main function to run the application
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    sys.exit(app.exec())
