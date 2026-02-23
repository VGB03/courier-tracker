// api/track.js
import fetch from 'node-fetch';

const supportedCouriers = [
  "delhivery", "bluedart", "dtdc", "ekart", "xpressbees",
  "dhl", "fedex", "ups", "trackon", "tci_express",
  "tci_freight", "avinash_cargo", "st_courier", "shree_maruti",
  "mark_express", "shree_nandawana", "shadowfax", "allcargo",
  "navata", "agarwal_packers", "vrl", "safexpress", "mahindra", "gati"
];

export default async function handler(req, res) {
  const { courier, tracking } = req.query;

  if (!tracking) {
    return res.status(400).json({ error: "Please provide a tracking number." });
  }

  if (!supportedCouriers.includes(courier)) {
    return res.status(200).json({ error: "Tracking not available for this courier yet." });
  }

  const API_KEY = process.env.AFTERSHIP_API_KEY;

  try {
    const response = await fetch(`https://api.aftership.com/v4/trackings/${courier}/${tracking}`, {
      headers: {
        "aftership-api-key": API_KEY,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tracking data. Try again later." });
  }
}
