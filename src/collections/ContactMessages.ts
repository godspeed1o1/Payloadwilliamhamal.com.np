import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  access: {
    create: () => true,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    useAsTitle: 'subject',
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 100 },
    { name: 'email', type: 'email', required: true },
    { name: 'subject', type: 'text', required: true, maxLength: 160 },
    { name: 'message', type: 'textarea', required: true, maxLength: 5000 },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Replied', value: 'replied' },
        { label: 'Archived', value: 'archived' },
      ],
      access: {
        create: () => false,
        update: ({ req }) => Boolean(req.user),
      },
    },
  ],
  timestamps: true,
}
