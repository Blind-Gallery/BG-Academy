<template>
  <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
    <h1>Dashboard</h1>
    <div style="text-align: left;">
      <p>Number of courses: {{ user_course_aggregate.aggregate.count }}</p>
      <p>Number of users: {{ users_aggregate.aggregate.count }}</p>
      <p>Number of tezos - users: {{ tezos_aggregate.aggregate.count }}</p>
      <p>Number of email - users: {{ emails_aggregate.aggregate.count }}</p>
      <p>Last course bought at: {{ user_course[0].created_at }}</p>
      <p>Number of credit card sales: {{ stripe_transaction_info.length }}</p>
      <p>Number of tezos sales: {{ tezos_transaction_info.length }}</p>
      <p>Total volume credit card: {{ total_volume_credit_card }}</p>
      <p>Total volume tezos: {{ total_volume_tezos }}</p>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag'

export default {
  apollo: {
    user_course_aggregate: {
      query: gql`query {
        user_course_aggregate {
          aggregate {
            count
          }
        }
      }`
    },
    users_aggregate: {
      query: gql`query {
        users_aggregate {
          aggregate {
            count
          }
        }
      }`
    },
    user_course: {
      query: gql`query {
        user_course(order_by: {created_at: desc}, limit: 1) {
          created_at
        }
      }`
    },
    tezos_aggregate: {
      query: gql`query {
        tezos_aggregate {
          aggregate {
            count
          }
        }
      }`
    },
    emails_aggregate: {
      query: gql`query {
        emails_aggregate {
          aggregate {
            count
          }
        }
      }`
    },
    stripe_transaction_info: {
      query: gql`query {
        stripe_transaction_info(where: {amount: {_is_null: false}}) {
          amount
          created_at
          id
        }
      }`
    },
    tezos_transaction_info: {
      query: gql`query {
        tezos_transaction_info(where: {amount: {_is_null: false}}) {
          amount
          created_at
          id
        }
      }`
    }
  },
  data () {
    return {
      total_volume_credit_card: 0,
      total_volume_tezos: 0
    }
  },
  mounted () {
    this.stripe_transaction_info.forEach((transaction) => {
      this.total_volume_credit_card += transaction.amount
    })
    this.tezos_transaction_info.forEach((transaction) => {
      this.total_volume_tezos += transaction.amount
    })
  }
}
</script>
