import { de } from '@braid/vue-formulate-i18n'

export default {
  plugins: [de],
  locale: 'de',
  rules: {
    foobar: ({ value }) => ['foo', 'bar'].includes(value)
  }
}
