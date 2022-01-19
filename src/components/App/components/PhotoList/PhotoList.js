import { Photo } from "./components/Photo/Photo";

export function PhotoList({
  photosToDisplay,
  likedPhotos,
  handleLike,
  handleUnlike,
}) {
  function isLiked(photoId) {
    return likedPhotos.some((p) => p.url === photoId);
  }

  const listItems = photosToDisplay.map((p) => (
    <Photo
      key={p.url}
      photo={p}
      photoIsLiked={isLiked(p.url)}
      handleLike={handleLike}
      handleUnlike={handleUnlike}
    />
  ));
  return <div>{listItems}</div>;
}
