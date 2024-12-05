import sys
from PyQt6.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QStackedWidget, QGridLayout, QLabel, QSpacerItem, QSizePolicy
from PyQt6.QtCore import Qt
from PyQt6.QtGui import QIcon, QColor


class HomeMainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        
        self.setWindowTitle("Tempat Wisata Example")
        self.setFixedSize(800, 600)  # Set a fixed window size
        
        # Central widget and layout
        self.central_widget = QWidget(self)
        self.setCentralWidget(self.central_widget)
        self.layout = QVBoxLayout(self.central_widget)
        
# Main function to run the application
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = HomeMainWindow()
    sys.exit(app.exec())
