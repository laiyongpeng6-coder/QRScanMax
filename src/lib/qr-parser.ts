export function parseQRCodeData(data: string) {
  let type: string = "text";
  let content = data;
  let details: any = {};

  if (/^(http|https):\/\/[^ "]+$/.test(data)) {
    type = "url";
    if (data.includes("instagram.com") || data.includes("forms.gle")) {
      type = "social";
    }
  } else if (data.startsWith("WIFI:")) {
    type = "wifi";
    const sMatch = data.match(/S:([^;]+)/);
    const pMatch = data.match(/P:([^;]+)/);
    details = {
      ssid: sMatch ? sMatch[1] : "Unknown",
      password: pMatch ? pMatch[1] : ""
    };
  } else if (data.toUpperCase().startsWith("BEGIN:VCARD")) {
    type = "vcard";
    const nameMatch = data.match(/FN:(.+)/i);
    const orgMatch = data.match(/ORG:(.+)/i);
    const telMatch = data.match(/TEL.*:(.+)/i);
    details = {
      name: nameMatch ? nameMatch[1].trim() : "Contact",
      org: orgMatch ? orgMatch[1].trim() : "Unknown Org",
      tel: telMatch ? telMatch[1].trim() : ""
    };
  } else if (data.toUpperCase().startsWith("BEGIN:VEVENT")) {
    type = "event";
    const summaryMatch = data.match(/SUMMARY:(.+)/i);
    details = {
       summary: summaryMatch ? summaryMatch[1].trim() : "Event"
    };
  } else if (data.toLowerCase().startsWith("geo:")) {
    type = "geo";
    const parts = data.replace("geo:", "").split(",");
    details = {
      lat: parts[0],
      lng: parts[1]
    }
  } else if (/^(978|979)\d{10}$/.test(data)) {
    type = "isbn";
  } else if (/^\d{12}$/.test(data)) {
    type = "upc";
  } else if (/^\d{13}$/.test(data)) {
    type = "barcode"; // EAN-13
  } else if (/^[\x00-\x7F]+$/.test(data) && data.length > 5 && data.length < 40 && !data.includes(" ")) {
    type = "barcode"; // Generic CODE-128
  }

  return { type, content, details };
}
