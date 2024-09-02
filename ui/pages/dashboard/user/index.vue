<template>
  <div class="tw-container ">
    <div>
      <span class="tw-text-sm tw-text-gray-500">Hi {{ $auth.user.name }}!</span>
      <h4 class="tw-mt-0">
        Sales Dashboard
      </h4>
      <div class="tw-columns-1 lg:tw-columns-5">
        <dashboard-stats-card icon="material-symbols-light:calendar-month-outline-rounded" title="Date of the last sale" :date="formattedDate" />
        <dashboard-stats-card icon="material-symbols-light:credit-card-outline" title="Credit card sales" :sales="transactions_stripe_transaction_info[0]?.courses_payments?.length || 0" />
        <dashboard-stats-card icon="token:xtz" title="Tezos sales" :sales="transactions_tezos_transaction_info[0]?.courses_payments?.length || 0" />
        <dashboard-stats-card icon="material-symbols-light:credit-card-outline" title="Total volume credit card" :volume="total_volume_credit_card" />
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
    courses_aggregate: {
      query: gql`query ($id: String) {
        courses_aggregate(where: {teacher: {user_id: {_eq: $id}}}) {
          aggregate {
            count
          }
        }
      }`,
      variables () {
        return {
          id: this.$route.query.user_id ?? (this.$auth.loggedIn ? this.$auth.user.id : '')
        }
      }
    },
    users_aggregate: {
      query: gql`query ($id: String) {
        users_aggregate(where: {courses: {course: {teacher: {user_id: {_eq: $id}}}}}) {
          aggregate {
            count
          }
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
    tezos_aggregate: {
      query: gql`query ($id: String) {
        tezos_aggregate (where: {user_info: {courses: {course: {teacher: {user_id: {_eq: $id}}}}}}) {
          aggregate {
            count
          }
        }
      }`,
      variables () {
        return {
          id: this.$route.query.user_id ?? (this.$auth.loggedIn ? this.$auth.user.id : '')
        }
      }
    },
    emails_aggregate: {
      query: gql`query ($id: String) {
        emails_aggregate(where: {user_info: {courses: {course: {teacher: {user_id: {_eq: $id}}}}}}) {
          aggregate {
            count
          }
        }
      }`,
      variables () {
        return {
          id: this.$route.query.user_id ?? (this.$auth.loggedIn ? this.$auth.user.id : '')
        }
      }
    },
    transactions_stripe_transaction_info: {
      query: gql`query ($id: String) {
        transactions_stripe_transaction_info: courses(where: {teacher: {user_id: {_eq: $id}}}) {
          courses_payments(where: {transaction_info: {transactions_stripe_transaction_info: {amount: {_is_null: false}}}}) {
            transaction_info {
              transactions_stripe_transaction_info {
                amount
                created_at
                id
              }
            }
          }
        }
      }`,
      variables () {
        return {
          id: this.$route.query.user_id ?? (this.$auth.loggedIn ? this.$auth.user.id : '')
        }
      }
    },
    transactions_tezos_transaction_info: {
      query: gql`query ($id: String){
        transactions_tezos_transaction_info: courses(where: {teacher: {user_id: {_eq: $id}}}) {
          courses_payments(where: {transaction_info: {transactions_tezos_transaction_info: {amount: {_is_null: false}}}}) {
            transaction_info {
              transactions_tezos_transaction_info {
                amount
                created_at
                id
              }
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
      user_id: this.$route.query.user_id ?? (this.$auth.loggedIn ? this.$auth.user.id : '')
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
    transactions_stripe_transaction_info: {
      handler () {
        this.total_volume_credit_card = 0
        this.transactions_stripe_transaction_info[0]?.courses_payments?.forEach((transaction) => {
          this.total_volume_credit_card += transaction.transaction_info.transactions_stripe_transaction_info.amount
        })
      },
      deep: true
    },
    transactions_tezos_transaction_info: {
      handler () {
        this.total_volume_tezos = 0
        this.transactions_tezos_transaction_info[0]?.courses_payments?.forEach((transaction) => {
          this.total_volume_tezos += transaction.transaction_info.transactions_tezos_transaction_info.amount
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
