import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['company', 'role', 'period', 'order'],
    useAsTitle: 'role',
  },
  defaultSort: 'order',
  fields: [
    { name: 'company', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'role', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
    { name: 'period', type: 'text', required: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'order', type: 'number', required: true, defaultValue: 0, index: true },
  ],
  timestamps: true,
}
