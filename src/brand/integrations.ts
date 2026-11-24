// Third-party hooks the client fills in before launch (client P0 list, 2026-11-20, rows 1 and 2).
// Empty values are safe: no tag loads, and the form falls back to opening the visitor's
// email app, as before.

/** Lead capture: the CRM or AI booking tool's form endpoint. The contact form POSTs JSON
 *  ({ name, email, company, phone, message, topic, page, region }) and shows a thank-you
 *  message on a 2xx response. */
export const LEADS = {
  endpoint: "",
};

/** Google Tag Manager container (GA4 is configured inside GTM). Events pushed to the
 *  dataLayer: generate_lead (form sent), phone_click, email_click, whatsapp_click. */
export const ANALYTICS = {
  gtmId: "",
};

type DataLayerEvent = { event: string } & Record<string, unknown>;

/** Push an analytics event to GTM's dataLayer (a no-op until GTM is installed). */
export function track(e: DataLayerEvent) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: DataLayerEvent[] };
  (w.dataLayer ??= []).push(e);
}
