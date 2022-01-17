import { Photo } from "./components/Photo/Photo";

export function PhotoList({ photos, likedPhotos, handleLike, handleUnlike }) {
  function isLiked(photoId) {
    return likedPhotos.some((p) => p.url === photoId);
  }

  const listItems = photos.map((p) => (
    <Photo
      key={p.url}
      photo={p}
      isLiked={isLiked}
      handleLike={handleLike}
      handleUnlike={handleUnlike}
    />
  ));
  return <div>{listItems}</div>;
}
