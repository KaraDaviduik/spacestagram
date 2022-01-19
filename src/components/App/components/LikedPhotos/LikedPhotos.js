import { Card } from "@shopify/polaris";
import { PhotoList } from "../PhotoList/PhotoList";

export function LikedPhotos({
  likedPhotos,
  handleLikePhoto,
  handleUnlikePhoto,
}) {
  return (
    <Card title="Liked photos" sectioned>
      <PhotoList
        photosToDisplay={likedPhotos}
        likedPhotos={likedPhotos}
        handleLike={handleLikePhoto}
        handleUnlike={handleUnlikePhoto}
      />
    </Card>
  );
}
