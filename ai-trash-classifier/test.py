import tensorflow as tf
import numpy as np
import cv2

model = tf.keras.models.load_model("trash_classifier.h5")

img = cv2.imread("test.jpg")
img = cv2.resize(img, (224, 224))
img = img / 255.0
img = np.expand_dims(img, axis=0)

pred = model.predict(img)

classes = ["Hazardous", "Organic", "Other", "Recyclable"]

label = classes[np.argmax(pred)]
confidence = np.max(pred)

print("AI gợi ý:", label)
print("Độ tin cậy:", round(confidence * 100, 2), "%")
