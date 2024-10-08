/* eslint-disable no-dupe-keys */
/* eslint-disable space-before-function-paren */
import { en } from '@braid/vue-formulate-i18n'

export default {
  plugins: [en],
  locale: 'en',
  rules: {
    foobar: ({ value }) => ['foo', 'bar'].includes(value)
  },
  classes: {
    outer: 'tw-mb-2',
    input(context) {
      switch (context.classification) {
        case 'button':
          return 'tw-bg-cyan-500 hover:tw-bg-cyan-600 tw-ease-in-out tw-duration-200 tw-px-3 tw-py-2 tw-text-white  tw-rounded tw-w-full'
        case 'box':
          return 'tw-flex tw-border tw-p-2 tw-rounded tw-cursor-pointer hover:tw-border-gray-300 tw-ease-in-out tw-duration-200 tw-items-center'
        default:
          return 'tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-border-box tw-rounded tw-leading-none focus:tw-border-cyan-500 tw-text-sm tw-outline-none'
      }
    },

    label(context) {
      switch (context.classification) {
        case 'box':
          return 'tw-text-gray-500 tw-text-sm tw-m-0'
        default:
          return 'tw-text-sm'
      }
    },

    wrapper(context) {
      switch (context.classification) {
        case 'box':
          return 'tw-flex tw-gap-2 tw-items-center'
        default:
          return 'tw-mb-2'
      }
    },

    help: 'tw-text-xs tw-text-gray-500',
    error: 'tw-text-xs tw-text-red-500',
    formErrors: 'tw-text-xs tw-text-red-500 tw-mb-2'

  }
}
