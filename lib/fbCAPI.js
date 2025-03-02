// Facebook Conversion API (CAPI) configuration
const FB_ACCESS_TOKEN =
  "EAAI5Ra4eMrsBOzJPfBPbZAx1hVtvsZB9jA9OmmSS8fVqpLzuQG4ydLcSVg24fbymGSbyZBpHBjf9GCcPv7CiT1blLhyxlqnDGKwpr819sNRwzOXGZCKcARQducvQNZAWs1XZAVSxa5LpES8O1SKcKFvN4MDb20B4t1u1zIJT7fcTslZAFbmqDT67TJX1qMxfeWnZBQZDZD";
const FB_PIXEL_ID = "666027202566639";
const TEST_EVENT_CODE = "TEST52246";

// Function to send events to Facebook CAPI
const sendFBEvent = async (eventName, eventData) => {
  try {
    // Get client IP address from a service
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const clientIP = ipData.ip;

    const url = `https://graph.facebook.com/v17.0/${FB_PIXEL_ID}/events`;
    const timestamp = Math.floor(Date.now() / 1000);

    // Enhanced user data object with better parameter handling
    const userData = {
      client_ip_address: clientIP,
      client_user_agent: navigator.userAgent,
      fbc: document.cookie.match("_fbc=([^;]*)")
        ? document.cookie.match("_fbc=([^;]*)")[1]
        : null,
      fbp: document.cookie.match("_fbp=([^;]*)")
        ? document.cookie.match("_fbp=([^;]*)")[1]
        : null,
    };

    // Add user information if available
    if (eventData.email) userData.em = eventData.email.trim().toLowerCase();
    if (eventData.phone) userData.ph = eventData.phone.replace(/[^0-9]/g, "");
    if (eventData.external_id) userData.external_id = eventData.external_id;
    if (eventData.first_name)
      userData.fn = eventData.first_name.trim().toLowerCase();
    if (eventData.last_name)
      userData.ln = eventData.last_name.trim().toLowerCase();
    if (eventData.city) userData.ct = eventData.city.trim().toLowerCase();
    if (eventData.state) userData.st = eventData.state.trim().toLowerCase();
    if (eventData.country) userData.country = eventData.country;
    if (eventData.zip_code) userData.zp = eventData.zip_code;

    const eventRequest = {
      data: [
        {
          event_name: eventName,
          event_time: timestamp,
          action_source: "website",
          event_source_url: window.location.href,
          user_data: userData,
          custom_data: eventData,
        },
      ],
      test_event_code: TEST_EVENT_CODE,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FB_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(eventRequest),
    });

    const result = await response.json();
    console.log("FB CAPI Event sent:", result);

    return result;
  } catch (error) {
    console.error("Error sending FB CAPI event:", error);
    return null;
  }
};

// Predefined event helpers
export const trackPageView = () => {
  return sendFBEvent("PageView", {});
};

export const trackAddToCart = (
  content_ids,
  content_name,
  value,
  currency = "BDT",
  userInfo = {}
) => {
  return sendFBEvent("AddToCart", {
    content_ids,
    content_name,
    value,
    currency,
    ...userInfo,
  });
};

export const trackPurchase = (
  content_ids,
  value,
  currency = "BDT",
  order_id,
  userInfo = {}
) => {
  return sendFBEvent("Purchase", {
    content_ids,
    value,
    currency,
    order_id,
    ...userInfo,
  });
};

export const trackViewContent = (
  content_ids,
  content_name,
  value,
  currency = "BDT",
  userInfo = {}
) => {
  return sendFBEvent("ViewContent", {
    content_ids,
    content_name,
    value,
    currency,
    ...userInfo,
  });
};
