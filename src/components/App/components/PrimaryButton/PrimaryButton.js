import { Button } from "@shopify/polaris";

export function PrimaryButton({ handlePrimaryButtonClick, buttonText }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Button primary onClick={handlePrimaryButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
}
