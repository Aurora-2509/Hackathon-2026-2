# Trained model integration

Recovered from outfit-ai-trained.zip. The fitted checkpoint is exported exactly into model.json; the checkpoint SHA-256 and source are retained in that file. It contains the fitted 6,000-term TF-IDF vocabulary and IDF, 32-dimensional SVD, 96-feature StandardScaler, and 96 → 32 ReLU → 1 logistic neural weights (3,137 trainable parameters). No retraining or image recognition is performed.

inference.mjs reproduces the original text embedding, symmetric pair features, scaling and classifier. The original Python fixture comparison covered 32 pairs including Unicode, unknown vocabulary and empty inputs: maximum embedding difference 0, maximum score difference 8.11e-8. The matches endpoint samples up to 80 saved closet items per target category, ranks pair compatibility with the starting item, and returns three per category. It does not implement the standalone package's full-outfit beam search. Scores are uncalibrated ranking signals.

The training catalog is distinct from the user's selected mvasil/polyvore-outfits closet source. It is not silently imported as a substitute for that gated dataset. Missing closet data returns empty groups.

Original source: https://github.com/xthan/polyvore-dataset at ba8aa71b6589e8920d172a8b5df84746be724d00. Original license preserved as DATASET-LICENSE. Original evaluation and provenance preserved in metrics.json.
