import { Button } from "@shopify/polaris";

export function PrimaryButton({ handlePrimaryButtonClick, buttonText }) {
  return (
    <div className="centered">
      <Button primary onClick={handlePrimaryButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
}
