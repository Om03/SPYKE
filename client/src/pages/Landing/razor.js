import { toast } from "react-toastify";

export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const displayRazorpay = async (user, tier) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }
  const options = {
    key: "rzp_test_XP7UbJSdBPFj3P",
    name: "Spyke Finance",
    subscription_id: user.subscription_id[tier.title].id,
    description: "Get your stocks monitored",
    prefill: {
      email: user.email,
    },
    handler: function (resp) {
      toast.success(
        `Your have subscribed to ${tier.title} plan sucessfully! Please Check after 1 minute`
      );
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
