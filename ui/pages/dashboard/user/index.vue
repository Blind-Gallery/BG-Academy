<template>
  <div class="tw-container ">
    <div>
      <span class="tw-text-sm tw-text-gray-500">Hi {{ $auth?.user?.name }}!</span>
      <h4 class="tw-mt-0">
        Sales Dashboard
      </h4>
      <div class="tw-columns-1 lg:tw-columns-5">
        <dashboard-stats-card icon="material-symbols-light:calendar-month-outline-rounded" title="Date of the last sale" :date="formattedDate" />
        <dashboard-stats-card icon="material-symbols-light:credit-card-outline" title="Credit card sales" :sales="total_count_credit_card" />
        <dashboard-stats-card icon="token:xtz" title="Tezos sales" :sales="total_count_tezos" />
        <dashboard-stats-card icon="material-symbols-light:credit-card-outline" title="Total volume credit card" :volume="formattedVolumeDollar" />
        <dashboard-stats-card icon="token:xtz" title="Total volume tezos" :volume="formattedVolumeTezos" />
      </div>
    </div>
  </div>
</template>
<script>
import { gql } from 'graphql-tag'

export default {
  apollo: {
    teachers: {
      query: gql`query ($id: String) {
        teachers(where: {user_id: {_eq: $id}}) {
          id
        }
      }`,
      variables () {
        return {
          id: this.$route.query.user_id ?? (this.$auth.loggedIn ? this.$auth.user.id : '')
        }
      }
    },
    user_course: {
      query: gql`query ($id: String) {
        user_course(order_by: {created_at: desc}, limit: 1,
          where: {course: {teacher: {user_id: {_eq: $id}}}}) {
          created_at
        }
      }`,
      variables () {
        return {
          id: this.$route.query.user_id ?? (this.$auth.loggedIn ? this.$auth.user.id : '')
        }
      }
    },
    payments: {
      query: gql`query ($id: String){
        payments(where: {transaction_type: {_is_null: false}, course_info: {teacher: {user_id: {_eq: $id}}}}) {
          transaction_type
          transaction_info {
            transactions_stripe_transaction_info {
              amount
              created_at
              payment_intent
            }
            transactions_tezos_transaction_info {
              amount
              created_at
            }
          }
        }
      }`,
      variables () {
        return {
          id: this.$route.query.user_id ?? (this.$auth.loggedIn ? this.$auth.user.id : '')
        }
      }
    }
  },
  data () {
    return {
      total_volume_credit_card: 0,
      total_volume_tezos: 0,
      total_count_credit_card: 0,
      total_count_tezos: 0,
      user_id: this.$route.query.user_id ?? (this.$auth.loggedIn ? this.$auth.user.id : '')
    }
  },
  computed: {
    formattedDate () {
      const createdAt = this.user_course[0]?.created_at
      if (createdAt) {
        const date = new Date(createdAt)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
      }
      return 'Date not available'
    },
    formattedVolumeTezos () {
      const decimalPlaces = 2
      const factor = Math.pow(10, decimalPlaces)
      const result = Math.round(this.total_volume_tezos * factor) / factor
      return result.toLocaleString()
    },
    formattedVolumeDollar () {
      return this.total_volume_credit_card.toLocaleString()
    }
  },
  watch: {
    teachers: {
      handler () {
        if (this.teachers.length === 0) {
          this.$router.push('/')
        }
      },
      deep: true
    },
    payments: {
      handler () {
        this.total_volume_credit_card = 0
        this.total_volume_tezos = 0
        this.total_count_credit_card = 0
        this.total_count_tezos = 0
        this.payments.forEach((payment) => {
          if (payment.transaction_type === 'stripe') {
            this.total_volume_credit_card += payment.transaction_info.transactions_stripe_transaction_info.amount / 100
            this.total_count_credit_card++
          } else if (payment.transaction_type === 'tezos') {
            this.total_volume_tezos += payment.transaction_info.transactions_tezos_transaction_info.amount
            this.total_count_tezos++
          }
        })
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
