// sanity/schema/order.js
export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'customer',
      title: 'Customer Details',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'string'
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string'
        }
      ]
    },
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{type: 'product'}]
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number'
            }
          ]
        }
      ]
    },
    {
      name: 'total',
      title: 'Total Amount',
      type: 'number'
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          'Credit Card', 'JazzCash', 'EasyPesa'
        ]
      }
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          'pending', 'processing', 'completed', 'cancelled'
        ]
      },
      initialValue: 'pending'
    }
  ]
}