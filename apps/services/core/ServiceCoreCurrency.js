export default function ServiceCoreCurrency(num) {
  if (num && typeof num === "number") {
    return "Rp. " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return "0";
}
