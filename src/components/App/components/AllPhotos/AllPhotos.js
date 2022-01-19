import * as React from "react";
import { PhotoList } from "../PhotoList/PhotoList";
import { Card, Spinner, Button, Banner } from "@shopify/polaris";

export function AllPhotos({
  allPhotos,
  likedPhotos,
  handleLikePhoto,
  handleUnlikePhoto,
  setAllPhotos,
}) {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const key = "5gO4vzjXZOXYoz91YqFcIYH6Q6ROVS2ircNrqR87";
  const photoCount = 20;
  const baseUrl = "https://api.nasa.gov/planetary/apod";
  const url = `${baseUrl}?api_key=${key}&count=${photoCount}`;

  React.useEffect(() => {
    fetchPhotosFromUrl();
  }, []);

  function fetchPhotosFromUrl() {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        const newPhotoData = data.filter(
          (p) =>
            p.media_type === "image" &&
            !allPhotos.some((photo) => photo.url === p.url)
        );
        setAllPhotos([...allPhotos, ...newPhotoData]);
      })
      .catch((error) => {
        console.error("Error", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleErrorButtonClick() {
    setError(null);
    setLoading(true);
    fetchPhotosFromUrl();
  }

  function handleErrorDismiss() {
    setError(null);
  }

  function handleLoadPhotosButtonClick() {
    setLoading(true);
    fetchPhotosFromUrl();
  }

  return (
    <Card title="All photos" sectioned>
      <PhotoList
        photosToDisplay={allPhotos}
        likedPhotos={likedPhotos}
        handleLike={handleLikePhoto}
        handleUnlike={handleUnlikePhoto}
      />
      <div className="allPhotosError">
        {error && (
          <Banner
            action={{ content: "Try again", onClick: handleErrorButtonClick }}
            status="warning"
            title="Unable to fetch photos."
            onDismiss={handleErrorDismiss}
          ></Banner>
        )}
      </div>
      <div className="centered">
        {loading && !error && (
          <Spinner
            size="large"
            hasFocusableParent={false}
            accessibilityLabel="Loading photos"
          />
        )}
        {!loading && !error && (
          <Button primary onClick={handleLoadPhotosButtonClick}>
            Load more photos
          </Button>
        )}
      </div>
    </Card>
  );
}
