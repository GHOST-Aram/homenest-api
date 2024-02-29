import { Gallery } from "../../data-access/model";

export const postData: Gallery = {
    assetId: '64c9e4f2df7cc072af2ac9e4',
    interior1: 'https://unsplash.com/s/photos/apartment-building',
    interior2: 'https://unsplash.com/s/photos/apartment-building',
    interior3: 'https://unsplash.com/s/photos/apartment-building',
    interior4: 'https://unsplash.com/s/photos/apartment-building',
    exterior1: 'https://unsplash.com/s/photos/apartment-building',
    exterior2: 'https://unsplash.com/s/photos/apartment-building',
    exterior3: 'https://unsplash.com/s/photos/apartment-building',
    exterior4: 'https://unsplash.com/s/photos/apartment-building',
}

export const badData = {
    assetId: '64c9e4f2df7cc0',
    interior2: 'https://unsplash.com/s/photos/apartment-building',
    interior3: 'https://unsplash.com/s/photos/apartment-building',
    exterior1: 4354354
}

export const patchData = {
    exterior2: 'https://unsplash.com/s/photos/apartment-building',
    exterior3: 'https://unsplash.com/s/photos/apartment-building',
    exterior4: 'https://unsplash.com/s/photos/apartment-building',
}

export const galleryProperties = [
    'assetId',
    'interior1',
    'interior2',
    'interior3',
    'interior4',
    'exterior1',
    'exterior2',
    'exterior3',
    'exterior4',
]