**Readme.md**

# Severstal Steel Defect Detection

## Overview

This repository provides a complete workflow for the Severstal Steel Defect Detection challenge using the U-Net architecture in Keras. The code is designed for extensibility, allowing experimentation with different model architectures. The workflow is divided into the following sections:

### 1. Preprocessing

```python
train_df = pd.read_csv('train.csv')
train_df['ImageId'] = train_df['ImageId_ClassId'].apply(lambda x: x.split('_')[0])
train_df['ClassId'] = train_df['ImageId_ClassId'].apply(lambda x: x.split('_')[1])
train_df['hasMask'] = ~ train_df['EncodedPixels'].isna()

mask_count_df = train_df.groupby('ImageId').agg(np.sum).reset_index()
```

### 2. Utility Functions

```python
def mask2rle(img):
    # ... (as provided in the code)
    
def rle2mask(mask_rle, shape=(256,1600)):
    # ... (as provided in the code)
```

### 3. Sample Test

```python
sample_filename = 'db4867ee8.jpg'
sample_image_df = train_df[train_df['ImageId'] == sample_filename]
sample_path = f"train_images/{sample_image_df['ImageId'].iloc[0]}"
sample_img = cv2.imread(sample_path)
sample_rles = sample_image_df['EncodedPixels'].values
sample_masks = build_masks(sample_rles, input_shape=(256, 1600))
```

### 4. Data Generator

```python
class DataGenerator(keras.utils.Sequence):
    # ... (as provided in the code)
```

### 5. Model Architecture

```python
def build_model(input_shape):
    # ... (as provided in the code)
```

### 6. Training

```python
model = build_model((256, 1600, 1))

history = model.fit_generator(
    train_generator,
    validation_data=val_generator,
    # ... (as provided in the code)
)
```

### 7. Evaluation and Submission

```python
model.load_weights('model.h5')

test_df = []

for i in range(0, test_imgs.shape[0], 500):
    batch_idx = list(range(i, min(test_imgs.shape[0], i + 500)))

    # ... (as provided in the code)
```

## Changelog

- **V15:** Added BCE-Dice loss for more accurate loss measurement.

## References

- Data generator: [Keras Blog](https://stanford.edu/~shervine/blog/keras-how-to-generate-data-on-the-fly)
- RLE encoding and decoding: [Paul's Kernel](https://www.kaggle.com/paulorzp/rle-functions-run-lenght-encode-decode)
- Architecture inspiration: [Jesper Dramsch's Kernel](https://www.kaggle.com/jesperdramsch/intro-chest-xray-dicom-viz-u-nets-full-data)
- Mask encoding: [SIIM ACR Pneumothorax Segmentation](https://www.kaggle.com/c/siim-acr-pneumothorax-segmentation/data)
- Source for BCE-Dice loss: [Losses for Segmentation](https://lars76.github.io/neural-networks/object-detection/losses-for-segmentation/)

## Usage

1. **Preparation:** Download the Severstal Steel Defect Detection dataset and place the files in the appropriate directories.

2. **Training:** Execute the provided code to train the U-Net model. Adjust hyperparameters and the model architecture as needed.

3. **Evaluation:** Evaluate the model on the validation set to check its performance.

4. **Submission:** Generate predictions for the test set and create a submission file.

## Contributors

- [Your Name]
- [Contributor 1]
- [Contributor 2]

Feel free to contribute by creating issues, suggesting improvements, or sending pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
