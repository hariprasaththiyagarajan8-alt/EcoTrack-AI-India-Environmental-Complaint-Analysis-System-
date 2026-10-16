"""
Training script for EcoTrack AI NLP Model.
Run: python -m backend.nlp.train
"""

import os
import pandas as pd
from backend.nlp.pipeline import EnvironmentalMLModel

DATASET_PATH = os.path.join(os.path.dirname(__file__), "..", "dataset", "india_environmental_complaints.csv")


def train_model():
    print(f"Loading labeled Indian environmental complaint dataset from {DATASET_PATH}...")
    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(f"Dataset not found at {DATASET_PATH}")

    df = pd.read_csv(DATASET_PATH)
    print(f"Loaded {len(df)} records. Training scikit-learn Logistic Regression model with TF-IDF features...")

    texts = df["description"].tolist()
    labels = df["category"].tolist()

    model = EnvironmentalMLModel()
    _, metrics = model.train_and_evaluate(texts, labels)

    print("\n=== Model Training and Evaluation Completed ===")
    print(f"Accuracy: {metrics['accuracy'] * 100:.1f}%")
    print(f"Macro F1-Score: {metrics['macro_f1']:.3f}")
    print(f"Weighted F1-Score: {metrics['weighted_f1']:.3f}")
    print(f"Macro Precision: {metrics['macro_precision']:.3f}")
    print(f"Macro Recall: {metrics['macro_recall']:.3f}")
    print(f"Vocabulary Size: {metrics['vocabulary_size']} terms")
    print(f"Training Samples: {metrics['training_samples']}, Test Samples: {metrics['test_samples']}")
    print("Model artifacts successfully saved.")


if __name__ == "__main__":
    train_model()
