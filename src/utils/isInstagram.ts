export function isInstagram() {
  const ua = navigator.userAgent || navigator.vendor ;
  return ua.includes("Instagram");
}