// Opacidad de la cara-mascota del carrito: a pleno cuando está vacío,
// marca de agua casi imperceptible detrás del contenido cuando tiene ítems.
const FACE_OPACITY_FILLED = 0.07;
const FACE_OPACITY_EMPTY = 1;

export const getMascotFaceOpacity = (isEmpty: boolean): number => {
    if (isEmpty) return FACE_OPACITY_EMPTY;
    return FACE_OPACITY_FILLED;
};

export default getMascotFaceOpacity;
