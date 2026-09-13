import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Portfolio: GlobalConfig = {
  slug: 'portfolio',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Portfolio',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            {
              name: 'masthead',
              type: 'text',
              required: true,
              defaultValue: 'The William Hamal Gazette',
            },
            {
              name: 'tagline',
              type: 'text',
              required: true,
              defaultValue: 'Technical SEO · Shopify Development · Web Analytics · AI Integration',
            },
            { name: 'issueLine', type: 'text', required: true },
            { name: 'headline', type: 'text', required: true },
            { name: 'byline', type: 'text', required: true },
            { name: 'introduction', type: 'textarea', required: true },
            { name: 'missionQuote', type: 'textarea', required: true },
            { name: 'profileImage', type: 'upload', relationTo: 'media' },
            { name: 'profileImageAlt', type: 'text', defaultValue: 'William Hamal' },
          ],
        },
        {
          label: 'Facts & skills',
          fields: [
            {
              name: 'stats',
              type: 'array',
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'tools',
              type: 'array',
              fields: [{ name: 'name', type: 'text', required: true }],
            },
            {
              name: 'fastFacts',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text', required: true, maxLength: 8 },
                { name: 'text', type: 'text', required: true },
              ],
            },
            {
              name: 'skills',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text', required: true, maxLength: 8 },
                { name: 'name', type: 'text', required: true },
              ],
            },
            {
              name: 'certifications',
              type: 'array',
              fields: [{ name: 'name', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Contact & availability',
          fields: [
            { name: 'availabilityHeading', type: 'text', required: true },
            { name: 'availabilityText', type: 'textarea', required: true },
            { name: 'email', type: 'email', required: true },
            { name: 'phone', type: 'text', required: true },
            { name: 'location', type: 'text', required: true },
            { name: 'website', type: 'text', required: true },
            { name: 'referenceName', type: 'text' },
            { name: 'referenceRole', type: 'text' },
            { name: 'referenceEmail', type: 'email' },
          ],
        },
      ],
    },
  ],
}
