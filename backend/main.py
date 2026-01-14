from fastapi import FastAPI, HTTPException, Request
import base64
from io import BytesIO

import numpy as np
from PIL import Image
import tensorflow as tf
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class_names = [
    'Apple pie', 'Baby back ribs', 'Baklava', 'Beef carpaccio', 'Beef tartare', 'Beet salad',
    'Beignets', 'Bibimbap', 'Bread pudding', 'Breakfast burrito', 'Bruschetta', 'Caesar salad',
    'Cannoli', 'Caprese salad', 'Carrot cake', 'Ceviche', 'Cheesecake', 'Cheese plate',
    'Chicken curry', 'Chicken quesadilla', 'Chicken wings', 'Chocolate cake', 'Chocolate mousse',
    'Churros', 'Clam chowder', 'Club sandwich', 'Crab cakes', 'Creme brulee', 'Croque madame',
    'Cup cakes', 'Deviled eggs', 'Donuts', 'Dumplings', 'Edamame', 'Eggs benedict', 'Escargots',
    'Falafel', 'Filet mignon', 'Fish and chips', 'Foie gras', 'French fries', 'French onion soup',
    'French toast', 'Fried calamari', 'Fried rice', 'Frozen yogurt', 'Garlic bread', 'Gnocchi',
    'Greek salad', 'Grilled cheese sandwich', 'Grilled salmon', 'Guacamole', 'Gyoza',
    'Hamburger', 'Hot and sour soup', 'Hot dog', 'Huevos rancheros', 'Hummus', 'Ice cream',
    'Lasagna', 'Lobster bisque', 'Lobster roll sandwich', 'Macaroni and cheese', 'Macarons',
    'Miso soup', 'Mussels', 'Nachos', 'Omelette', 'Onion rings', 'Oysters', 'Pad thai',
    'Paella', 'Pancakes', 'Panna cotta', 'Peking duck', 'Pho', 'Pizza', 'Pork chop',
    'Poutine', 'Prime rib', 'Pulled pork sandwich', 'Ramen', 'Ravioli', 'Red velvet cake',
    'Risotto', 'Samosa', 'Sashimi', 'Scallops', 'Seaweed salad', 'Shrimp and grits', 'Spaghetti bolognese',
    'Spaghetti carbonara', 'Spring rolls', 'Steak', 'Strawberry shortcake', 'Sushi',
    'Tacos', 'Takoyaki', 'Tiramisu', 'Tuna tartare', 'Waffles'
]

class ImageData(BaseModel):
    image: str # The base64 string of an image

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Loading model")
    # app.state.model = tf.keras.models.load_model("./model/food_vision.keras", compile=False)
    app.state.model = tf.keras.models.load_model("/usr/backend/model/food_vision.keras", compile=False)
    print("Model loaded")
    yield
    print("Fastapi app ending")

app = FastAPI(lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://food-classifier-sage.vercel.app", "https://food-classifier-gpb4xbq2c-kineths-projects.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def root():
	return {
		"Greeting": "This a food vision model!"
	}

@app.post("/predict")
def predict(data: ImageData, request: Request):
    try:
        model = request.app.state.model  # Access model here

        # print("Raw image string length:", len(data.image))
        # Extract the base64 string (remove the data:image/ part)
        img_data = data.image.split(",")[1]  # Removing the "data:image/png;base64," part

        # Decode the base64 string into bytes
        img_bytes = base64.b64decode(img_data)

        # Convert bytes into a file-like object (this is what PIL and TensorFlow expect)
        img = tf.image.decode_image(img_bytes, channels=3)

        # # Use PIL to open the image (this is optional, just for checking if the image is valid)
        # pil_img = Image.open(BytesIO(img_bytes)).convert("RGB") 
        
        # Further image processing...
        # img_array = np.array(img) / 255.0
        img_tensor = tf.cast(img, tf.float32)
        img_tensor = tf.image.resize(img_tensor, [224, 224])  # Resizing image to model input size
        # print(img_tensor.shape)
        # print(img_tensor.dtype)
        # print(img_tensor)

        # Pass image into model to classify it into one of the 101 food classes
        pred_prob = tf.squeeze(model.predict(tf.expand_dims(img_tensor, axis=0)))
        # print(pred_prob)
        pred_class = class_names[tf.argmax(pred_prob)]
        # print(pred_class)
        print(round(float(max(pred_prob)), 4))
        confidence = round(float(max(pred_prob)), 4)
        # print(confidence)
        return {
            "prediction": pred_class,
            "success": True,
            "confidence": confidence,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image")