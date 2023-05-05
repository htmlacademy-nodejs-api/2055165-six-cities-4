const goods = [
  'Breakfast',
  'Air conditioning',
  'Laptop',
  'Friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge'
] as const;

export type Good = typeof goods[number];

