<template>
  <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
    <h1>Dashboard by teacher</h1>
    <div style="text-align: left;">
      <p>Number of courses: {{ courses_aggregate.aggregate.count }}</p>
      <p>Number of users: {{ users_aggregate.aggregate.count }}</p>
      <p>Number of tezos - users: {{ tezos_aggregate.aggregate.count }}</p>
      <p>Number of email - users: {{ emails_aggregate.aggregate.count }}</p>
      <p>Last course bought at: {{ user_course[0]?.created_at }}</p>
      <p>Number of credit card sales: {{ transactions_stripe_transaction_info?.courses[0]?.courses_payments?.length }}</p>
      <p>Number of tezos sales: {{ transactions_tezos_transaction_info?.courses[0]?.courses_payments?.length }}</p>
      <p>Total volume credit card: {{ total_volume_credit_card }}</p>
      <p>Total volume tezos: {{ total_volume_tezos }}</p>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag'

export default {
  apollo: {
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
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      }
    },
    users_aggregate: {
      query: gql`query ($id: String) {
        users_aggregate(where: {courses: {user_id: {_eq: $id}}}) {
          aggregate {
            count
          }
        }
      }`,
      variables () {
        return {
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
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
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
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
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      }
    },
    emails_aggregate: {
      query: gql`query ($id: String) {
        emails_aggregate (where: {user_info: {courses: {course_id: {_eq: $id}}}}) {
          aggregate {
            count
          }
        }
      }`,
      variables () {
        return {
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      }
    },
    transactions_stripe_transaction_info: {
      query: gql`query ($id: String) {
        courses(where: {teacher: {user_id: {_eq: $id}}}) {
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
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      }
    },
    transactions_tezos_transaction_info: {
      query: gql`query ($id: String){
        courses(where: {teacher: {user_id: {_eq: $id}}}) {
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
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      }
    }
  },
  data () {
    return {
      total_volume_credit_card: 0,
      total_volume_tezos: 0
    }
  },
  mounted () {
    console.info('transactions_stripe_transaction_info: ', this.transactions_stripe_transaction_info)
    console.info('transactions_tezos_transaction_info: ', this.transactions_tezos_transaction_info)
    this.transactions_stripe_transaction_info?.courses[0]?.courses_payments.forEach((transaction) => {
      this.total_volume_credit_card += transaction.transaction_info.transactions_stripe_transaction_info.amount
    })
    this.transactions_tezos_transaction_info?.courses[0]?.courses_payments.forEach((transaction) => {
      this.total_volume_tezos += transaction.transaction_info.transactions_tezos_transaction_info.amount
    })
  }
}
</script>
