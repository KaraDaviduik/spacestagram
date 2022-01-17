import * as React from "react";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { useLocalStorageState } from "../../utils";
import { PhotoList } from "./components/PhotoList/PhotoList";
import { PrimaryButton } from "./components/PrimaryButton/PrimaryButton";
import { Error } from "./components/Error/Error";
import { Page, AppProvider, Card, Layout, Spinner } from "@shopify/polaris";

const key = "5gO4vzjXZOXYoz91YqFcIYH6Q6ROVS2ircNrqR87";
const photoCount = 20;
const baseUrl = "https://api.nasa.gov/planetary/apod";
const url = `${baseUrl}?api_key=${key}&thumbs=true&count=${photoCount}`;

function App() {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [likedPhotos, setLikedPhotos] = useLocalStorageState("likedPhotos", []);
  const [photos, setPhotos] = React.useState([]);

  function handleUnlike(photoId) {
    const likedPhotosCopy = likedPhotos.filter((p) => p.url !== photoId);
    setLikedPhotos(likedPhotosCopy);
  }

  function handleLike(photoId) {
    const photosCopy = [...photos];
    const i = photosCopy.findIndex((p) => p.url === photoId);
    setLikedPhotos([{ ...photosCopy[i] }, ...likedPhotos]);
  }

  function handlePrimaryButtonClick() {
    setLoading(true);
  }

  function fetchPhotosFromUrl(url) {
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
            !photos.some((photo) => photo.url === p.url)
        );
        setPhotos([...photos, ...newPhotoData]);
      })
      .catch((error) => {
        console.error("Error", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    if (loading) {
      fetchPhotosFromUrl(url);
    }
  }, [loading]);

  return (
    <AppProvider i18n={enTranslations}>
      <Page
        title="Spacestagram"
        subtitle="Brought to you by NASA's Astronomy Photo of the Day (APOD) API"
        fullWidth={true}
      >
        <Layout>
          <Layout.Section oneHalf>
            <Card title="Photos" sectioned>
              <PhotoList
                photos={photos}
                likedPhotos={likedPhotos}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
              {error && <Error setError={setError} setLoading={setLoading} />}
              {loading && !error && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <Spinner
                    size="large"
                    hasFocusableParent={false}
                    accessibilityLabel="Loading photos"
                  />
                </div>
              )}
              {!loading && !error && (
                <PrimaryButton
                  handlePrimaryButtonClick={handlePrimaryButtonClick}
                  buttonText={"Load more photos"}
                />
              )}
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card title="Liked photos" sectioned>
              <PhotoList
                photos={likedPhotos}
                likedPhotos={likedPhotos}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
