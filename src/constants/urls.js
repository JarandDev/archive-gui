export const ARCHIVE_API_BASE_URL = "/storage/archive/v1";

export const getFirebaseImageUrl = (year, imageName) => {
  return `https://firebasestorage.googleapis.com/v0/b/archive-cdn.appspot.com/o/bread-bags%2F${year}%2F${imageName}?alt=media`;
}
