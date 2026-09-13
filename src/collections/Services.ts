import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['icon', 'title', 'order'],
    useAsTitle: 'title',
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'icon', type: 'text', required: true, maxLength: 8 },
    { name: 'description', type: 'textarea', required: true },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Get a quote' },
    { name: 'order', type: 'number', required: true, defaultValue: 0, index: true },
  ],
  timestamps: true,
}
