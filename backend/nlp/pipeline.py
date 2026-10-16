"""
NLP Pipeline using scikit-learn TF-IDF and Logistic Regression.
Extracts environmental features, classifies categories, and extracts keywords.
"""

import os
import joblib
import numpy as np
from typing import Dict, List, Tuple, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, f1_score, precision_score, recall_score
from backend.nlp.ner import extract_indian_locations_py

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model_artifacts.pkl")

ENVIRONMENTAL_CATEGORIES_PY = [
    "Air Pollution",
    "Water Pollution",
    "Noise Pollution",
    "Illegal Waste Dumping",
    "Plastic Pollution",
    "Sewage and Drainage Pollution",
    "Industrial Pollution",
    "River and Lake Pollution",
    "Groundwater Contamination",
    "Deforestation and Tree Cutting",
    "Soil Pollution",
    "Agricultural Burning and Crop Residue Burning",
    "Construction Dust Pollution",
    "Solid Waste Management Issues",
    "Hazardous Waste Disposal",
    "Coastal and Marine Pollution",
    "Environmental Damage to Wildlife and Biodiversity",
    "Other Environmental Issues",
]


class EnvironmentalMLModel:
    def __init__(self):
        self.pipeline: Pipeline = None
        self.categories: List[str] = ENVIRONMENTAL_CATEGORIES_PY

    def build_pipeline(self) -> Pipeline:
        return Pipeline([
            ("tfidf", TfidfVectorizer(
                ngram_range=(1, 2),
                max_features=5000,
                sublinear_tf=True,
                stop_words="english"
            )),
            ("clf", LogisticRegression(
                C=2.5,
                class_weight="balanced",
                max_iter=1000,
                solver="lbfgs"
            ))
        ])

    def train_and_evaluate(self, texts: List[str], labels: List[str]) -> Tuple[Pipeline, Dict[str, Any]]:
        from sklearn.model_selection import train_test_split
        
        X_train, X_test, y_train, y_test = train_test_split(
            texts, labels, test_size=0.2, random_state=42, stratify=labels if len(set(labels)) <= len(labels)/2 else None
        )

        pipe = self.build_pipeline()
        pipe.fit(X_train, y_train)
        self.pipeline = pipe

        y_pred = pipe.predict(X_test)
        
        acc = float(accuracy_score(y_test, y_pred))
        macro_prec = float(precision_score(y_test, y_pred, average="macro", zero_division=0))
        macro_rec = float(recall_score(y_test, y_pred, average="macro", zero_division=0))
        macro_f1 = float(f1_score(y_test, y_pred, average="macro", zero_division=0))
        weighted_f1 = float(f1_score(y_test, y_pred, average="weighted", zero_division=0))

        labels_list = sorted(list(set(labels)))
        cm = confusion_matrix(y_test, y_pred, labels=labels_list)

        report = classification_report(y_test, y_pred, output_dict=True, zero_division=0)
        category_metrics = []
        for cat in labels_list:
            if cat in report:
                category_metrics.append({
                    "category": cat,
                    "precision": round(report[cat]["precision"], 3),
                    "recall": round(report[cat]["recall"], 3),
                    "f1": round(report[cat]["f1-score"], 3),
                    "support": int(report[cat]["support"])
                })

        metrics = {
            "accuracy": round(acc, 3),
            "macro_precision": round(macro_prec, 3),
            "macro_recall": round(macro_rec, 3),
            "macro_f1": round(macro_f1, 3),
            "weighted_f1": round(weighted_f1, 3),
            "training_samples": len(X_train),
            "test_samples": len(X_test),
            "vocabulary_size": len(pipe.named_steps["tfidf"].vocabulary_),
            "category_metrics": category_metrics,
            "confusion_matrix": {
                "labels": labels_list,
                "matrix": cm.tolist()
            }
        }

        # Save artifacts
        joblib.dump({"pipeline": pipe, "metrics": metrics}, MODEL_PATH)
        return pipe, metrics

    def predict(self, text: str) -> Dict[str, Any]:
        if not self.pipeline:
            if os.path.exists(MODEL_PATH):
                data = joblib.load(MODEL_PATH)
                self.pipeline = data["pipeline"]
            else:
                raise RuntimeError("Model pipeline has not been trained or loaded.")

        probas = self.pipeline.predict_proba([text])[0]
        classes = self.pipeline.classes_
        
        best_idx = int(np.argmax(probas))
        predicted_category = str(classes[best_idx])
        confidence = float(probas[best_idx])

        # Keyword extraction using tf-idf vectorizer
        tfidf = self.pipeline.named_steps["tfidf"]
        feat_names = tfidf.get_feature_names_out()
        tfidf_vec = tfidf.transform([text]).toarray()[0]
        top_indices = tfidf_vec.argsort()[-6:][::-1]
        keywords = [feat_names[i] for i in top_indices if tfidf_vec[i] > 0]

        # Entity extraction
        locations = extract_indian_locations_py(text)

        prob_dict = {str(classes[i]): round(float(probas[i]), 3) for i in range(len(classes))}

        return {
            "predicted_category": predicted_category,
            "confidence": round(confidence, 2),
            "probabilities": prob_dict,
            "keywords": keywords,
            "locations": locations
        }
