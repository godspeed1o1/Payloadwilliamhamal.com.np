import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['number', 'title', 'category', 'featured'],
    useAsTitle: 'title',
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'number', type: 'text', required: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'category', type: 'text', required: true },
    {
      name: 'stack',
      type: 'array',
      fields: [{ name: 'tool', type: 'text', required: true }],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', required: true, defaultValue: 0, index: true },
  ],
  timestamps: true,
}
