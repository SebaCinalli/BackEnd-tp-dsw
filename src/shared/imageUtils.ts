import fs from 'fs';
import path from 'path';

/**
 * Elimina un archivo de imagen del sistema de archivos
 * @param folder - Carpeta donde está la imagen (usuarios, djs, barras, etc.)
 * @param filename - Nombre del archivo a eliminar
 * @returns boolean - true si se eliminó correctamente, false si no existía
 */
export const deleteImageFile = (folder: string, filename: string): boolean => {
  if (!filename) return false;

  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'uploads',
      folder,
      filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ Imagen eliminada: ${filePath}`);
      return true;
    } else {
      console.log(`⚠️ Imagen no encontrada: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error eliminando imagen ${folder}/${filename}:`, error);
    return false;
  }
};

/**
 * Elimina la imagen anterior cuando se actualiza con una nueva
 * @param folder - Carpeta de imágenes
 * @param oldFilename - Nombre del archivo anterior
 * @param newFilename - Nombre del archivo nuevo
 */
export const replaceImageFile = (
  folder: string,
  oldFilename: string,
  newFilename: string
): void => {
  if (oldFilename && oldFilename !== newFilename) {
    deleteImageFile(folder, oldFilename);
  }
};
