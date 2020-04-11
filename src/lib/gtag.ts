interface Window {
  gtag: Function
}
declare let window: Window

export const GA_TRACKING_ID = '<YOUR_GA_TRACKING_ID>'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    event_category: category,
    // eslint-disable-next-line @typescript-eslint/camelcase
    event_label: label,
    value: value,
  })
}
