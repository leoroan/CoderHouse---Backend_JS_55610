export const generateProductValidationErrorInfo = (product) => {
  const requiredProperties = [
    { name: 'title', type: 'String', received: product.title },
    { name: 'description', type: 'String', received: product.description },
    { name: 'price', type: 'Number', received: product.price },
    { name: 'code', type: 'String', received: product.code }
  ];

  const invalidProperties = requiredProperties
    .filter(property => !property.received)
    .map(property => `-> ${property.name}: type ${property.type}, received: ${property.received}`);

  if (invalidProperties.length > 0) {
    return `Required properties:
        ${invalidProperties.join('\n        ')}`;
  }

  return '';
};