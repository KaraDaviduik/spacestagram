import { MediaCard } from "@shopify/polaris";

export function Photo({ photo, isLiked, handleLike, handleUnlike }) {
  const photoIsLiked = isLiked(photo.url);

  return (
    <MediaCard
      title={`${photo.title}, taken on ${photo.date}`}
      primaryAction={{
        content: photoIsLiked ? "Unlike photo" : "Like photo",
        onAction: photoIsLiked
          ? () => handleUnlike(photo.url)
          : () => handleLike(photo.url),
      }}
      description={photo.explanation}
      portrait={false}
    >
      <img
        alt=""
        width="100%"
        height="100%"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        src={photo.url}
      />
    </MediaCard>
  );
}
