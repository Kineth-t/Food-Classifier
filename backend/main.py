from fastapi import FastAPI
import tensorflow as tf
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
	print("Loading model")
	model = tf.keras.models.load_model("")
	yield
	print("Fastapi app ending")

app = FastAPI(lifespan=lifespan)

@app.get("/")
def root():
	return {
		"Hello":"World"
	}
