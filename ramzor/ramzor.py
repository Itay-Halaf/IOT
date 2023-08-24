import sys
import paho.mqtt.client as mqtt
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QPushButton, QLineEdit, QLabel, QWidget
from PyQt5.QtGui import QPainter, QColor, QFont
from PyQt5.QtCore import Qt

class CircleWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.color = QColor(Qt.gray)

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setBrush(self.color)
        painter.drawText(20, 25, "State: ")
        painter.drawEllipse(60, 10, 25, 25)
        painter.setFont(QFont("Arial", 12))

class CrossroadStateModifier(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle('Crossroad State')
        self.setGeometry(1800, 900, 300, 300)

        central_widget = QWidget()
        self.setCentralWidget(central_widget)

        layout = QVBoxLayout()

        self.crossroad_name_label = QLabel("Crossroad Name: Name")
        layout.addWidget(self.crossroad_name_label)

        self.search_bar = QLineEdit(self)
        layout.addWidget(self.search_bar)

        self.circle_widget = CircleWidget()
        layout.addWidget(self.circle_widget)

        self.change_color_button = QPushButton('Change State', self)
        self.change_color_button.clicked.connect(self.changeColor)
        layout.addWidget(self.change_color_button)

        central_widget.setLayout(layout)

        # MQTT Initialization
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.on_connect = self.on_connect
        self.mqtt_client.on_message = self.on_message
        self.mqtt_client.connect("localhost", 1883, 60)
        self.mqtt_client.loop_start()

    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker")
            # Subscribe to topics
            # client.subscribe("topic")
        else:
            print("Failed to connect to MQTT Broker")

    def on_message(self, client, userdata, msg):
        # Handle incoming MQTT messages here
        pass

    def mousePressEvent(self, event):
        self.dragPos = event.globalPos()

    def mouseMoveEvent(self, event):
        if hasattr(self, 'dragPos'):
            newPos = self.mapToGlobal(event.pos())
            diff = newPos - self.dragPos
            self.move(self.pos() + diff)
            self.dragPos = newPos

    def changeColor(self):
        if self.circle_widget.color == QColor(Qt.green):
            self.circle_widget.color = QColor(Qt.red)
            # Publish a message when the state changes
            self.mqtt_client.publish("your_topic", "Red")
        else:
            self.circle_widget.color = QColor(Qt.green)
            # Publish a message when the state changes
            self.mqtt_client.publish("your_topic", "Green")
    
        self.circle_widget.update()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = CrossroadStateModifier()
    window.show()
    sys.exit(app.exec_())
