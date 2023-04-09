export default function ServiceCoreIDGenerator(prefix = "ID") {
  const date = new Date().getTime();
  return `${prefix.toUpperCase()}-${date}`;
}
