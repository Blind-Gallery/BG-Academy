<template>
  <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
    <h1>Dashboard by teacher</h1>
    <div style="text-align: left;">
      <p>Number of courses: {{ courses_aggregate.aggregate.count }}</p>
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
const userId = "b1c88742-d6a4-4556-8e92-83a7e9374dc5" // this.$auth.loggedIn ? this.$auth.user.id : ''
export default {
  apollo: {
    courses_aggregate: {
      query: gql`query ($id: String) {
        courses_aggregate(where: {teacher: {id: {_eq: $id}}}) {
          aggregate {
            count
          }
        }
      }`,
      variables: {
        id: userId
      }
    },
    users_aggregate: {
      query: gql`query ($id: String) {
        users_aggregate(where: {courses: {course: {teacher_id: {_eq: $id}}}}) {
          aggregate {
            count
          }
        }
      }`,
      variables: {
        id: userId
      }
    },
    user_course: {
      query: gql`query ($id: String) {
        user_course(order_by: {created_at: desc}, limit: 1,
          where: {course: {teacher_id: {_eq: $id}}}) {
          created_at
        }
      }`,
      variables: {
        id: userId
      }
    },
    tezos_aggregate: {
      query: gql`query ($id: String) {
        tezos_aggregate (where: {user_info: {courses: {course_id: {_eq: $id}}}}) {
          aggregate {
            count
          }
        }
      }`,
      variables: {
        id: userId
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
      variables: {
        id: userId
      }
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
