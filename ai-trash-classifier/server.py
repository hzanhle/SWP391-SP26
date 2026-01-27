from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import numpy as np
import cv2
import tempfile

app = FastAPI()

model = tf.keras.models.load_model("trash_classifier.h5")

CLASSES = ["Hazardous", "Organic", "Other", "Recyclable"]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Lưu ảnh tạm
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        contents = await file.read()
        tmp.write(contents)
        img_path = tmp.name

    img = cv2.imread(img_path)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    pred = model.predict(img)

    return {
        "suggestedLabel": CLASSES[int(np.argmax(pred))],
        "confidence": float(np.max(pred))
    }
