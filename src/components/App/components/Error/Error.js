import { Banner } from "@shopify/polaris";

export function Error({ setError, setLoading }) {
  function handleError() {
    setError(null);
    setLoading(true);
  }

  function handleErrorDismiss() {
    setError(null);
  }

  return (
    <Banner
      action={{ content: "Try again", onClick: handleError }}
      status="warning"
      title="Failed to fetch photos"
      onDismiss={handleErrorDismiss}
    ></Banner>
  );
}
