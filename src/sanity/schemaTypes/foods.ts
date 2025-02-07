// schemas/food.js
interface FoodField {
  name: string;
  type: string;
  title: string;
  description?: string;
  options?: any;
  validation?: (Rule: any) => any;
  of?: { type: string }[];
  initialValue?: boolean;
}

interface FoodPermission {
  role: string;
  permission: string[];
}

interface FoodSchema {
  name: string;
  type: string;
  title: string;
  fields: FoodField[];
  permissions: FoodPermission[];
}

const foodSchema: FoodSchema = {
  name: 'food',
  type: 'document',
  title: 'Food',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'number',
      validation: Rule => Rule.required().integer().positive()
    },
    {
      name: 'name',
      type: 'string',
      title: 'Food Name',
      validation: Rule => Rule.required().max(100)
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Category of the food item (e.g., Burger, Sandwich, Drink, etc.)',
      options: {
        list: [
          { title: 'Burger', value: 'burger' },
          { title: 'Sandwich', value: 'sandwich' },
          { title: 'Drink', value: 'drink' },
          { title: 'Pizza', value: 'pizza' },
          { title: 'Dessert', value: 'dessert' },
          { title: 'Main Course', value: 'main-course' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      type: 'number',
      title: 'Current Price',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'originalPrice',
      type: 'number',
      title: 'Original Price',
      description: 'Price before discount (if any)',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.unique()
    },
    {
      name: 'image',
      type: 'image',
      title: 'Food Image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Short description of the food item',
      validation: Rule => Rule.max(500)
    },
    {
      name: 'available',
      type: 'boolean',
      title: 'Available',
      description: 'Availability status of the food item',
      initialValue: true
    }
  ],
  permissions: [
    {
      role: 'administrator',
      permission: ['create', 'read', 'update', 'delete']
    },
    {
      role: 'editor',
      permission: ['read', 'create', 'update']
    }
  ]
};

export default foodSchema;