import * as React from "react";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { useLocalStorageState } from "../../utils";
import { Page, AppProvider, Layout } from "@shopify/polaris";
import { LikedPhotos } from "./components/LikedPhotos/LikedPhotos.js";
import { AllPhotos } from "./components/AllPhotos/AllPhotos.js";

function App() {
  const [allPhotos, setAllPhotos] = React.useState([]);
  const [likedPhotos, setLikedPhotos] = useLocalStorageState("likedPhotos", []);

  function handleUnlikePhoto(photoId) {
    const likedPhotosCopy = likedPhotos.filter((p) => p.url !== photoId);
    setLikedPhotos(likedPhotosCopy);
  }

  function handleLikePhoto(photoId) {
    const photosCopy = [...allPhotos];
    const i = photosCopy.findIndex((p) => p.url === photoId);
    setLikedPhotos([{ ...photosCopy[i] }, ...likedPhotos]);
  }

  return (
    <AppProvider i18n={enTranslations}>
      <Page
        title="Spacestagram"
        subtitle="Brought to you by NASA's Astronomy Photo of the Day (APOD) API"
        fullWidth={true}
      >
        <Layout>
          <Layout.Section oneHalf>
            <AllPhotos
              allPhotos={allPhotos}
              setAllPhotos={setAllPhotos}
              likedPhotos={likedPhotos}
              handleLikePhoto={handleLikePhoto}
              handleUnlikePhoto={handleUnlikePhoto}
            />
          </Layout.Section>
          <Layout.Section oneHalf>
            <LikedPhotos
              likedPhotos={likedPhotos}
              handleLikePhoto={handleLikePhoto}
              handleUnlikePhoto={handleUnlikePhoto}
            />
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
