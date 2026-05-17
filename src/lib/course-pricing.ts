type CoursePriceLocale = "vi" | "en" | string

export function formatCoursePrice(price: number, locale: CoursePriceLocale = "vi"): string {
  if (price <= 0) return locale === "en" ? "Contact us" : "Liên hệ"
  return `${price.toLocaleString("vi-VN")} VNĐ`
}

export function getCourseDisplayPrice(priceSale: number | null, priceOriginal: number): number {
  return priceSale ?? priceOriginal
}
