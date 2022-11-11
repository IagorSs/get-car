export default (placa) => {
  return placa
    .match(
      /^[A-Z]{3}[0-9][A-Z][0-9]{2}$|^[A-Z]{3}-[0-9]{4}$/
    ) !== null;
}
