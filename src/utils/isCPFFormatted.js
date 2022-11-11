export default (cpf) => {
  return cpf
    .match(
      /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/
    ) !== null;
}
