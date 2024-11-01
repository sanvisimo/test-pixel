import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useCallback } from "react";
import { captureOrder, createOrder } from "@/lib/actions";

type PaymentButtonProps = {
  pixels: number;
  onSuccess: () => void;
};

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export const PaymentButton = ({ pixels, onSuccess }: PaymentButtonProps) => {
  const initialOptions = {
    "client-id": clientId ?? "",
    clientId: clientId ?? "",
    "enable-funding": "venmo",
    "disable-funding": "",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const handleOrder = useCallback(async () => {
    try {
      const orderData = await createOrder(pixels);

      if (orderData.id) {
        return orderData.id;
      } else {
        console.log("non ho loridine");
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("create", error);
      // setMessage(
      //     `Could not initiate PayPal Checkout...${error}`
      // );
    }
  }, [pixels]);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{
          shape: "pill",
          layout: "vertical",
          color: "blue",
          label: "paypal",
        }}
        createOrder={handleOrder}
        onApprove={async (data, actions) => {
          try {
            const orderData = await captureOrder(data);
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message

            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
              // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
              return actions.restart();
            } else if (errorDetail) {
              // (2) Other non-recoverable errors -> Show a failure message
              throw new Error(
                `${errorDetail.description} (${orderData.debug_id})`,
              );
            } else {
              // (3) Successful transaction -> Show confirmation or thank you message
              // Or go to another URL:  actions.redirect('thank_you.html');
              // const transaction =
              //     orderData.purchase_units[0].payments
              //         .captures[0];
              // setMessage(
              //     `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
              // );
              console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2),
              );
              onSuccess();
            }
          } catch (error) {
            console.error("approve", error);
            // setMessage(
            //     `Sorry, your transaction could not be processed...${error}`
            // );
          }
        }}
      />
    </PayPalScriptProvider>
  );
};
