<template>
  <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
    <h1>Dashboard by teacher</h1>
    <div style="text-align: left;">
      <p>Number of courses: {{ user_course_aggregate }}</p>
      <p>Number of users: {{ users_aggregate }}</p>
      <p>Number of tezos - users: {{ tezos_aggregate }}</p>
      <p>Number of email - users: {{ emails_aggregate }}</p>
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

const apolloQueries = {
  courses_aggregate: {
    query: gql`query ($id: String = "") {
      courses_aggregate(where: {teacher: {id: {_eq: $id}}}) {
        aggregate {
          count
        }
      }
    }`,
    variables: {
      id: 1 // this.$auth.loggedIn ? this.$auth.user.id : ''
    }
  },
  users_aggregate: {
    query: gql`query ($id: String = "") {
      users_aggregate(where: {courses: {course: {teacher_id: {_eq: $id}}}}) {
        aggregate {
          count
        }
      }
    }`,
    variables: {
      id: 1 // this.$auth.loggedIn ? this.$auth.user.id : ''
    }
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
}

export default {
  data () {
    return {
      courses_aggregate: 0,
      user_course_aggregate: 0,
      users_aggregate: 0,
      total_volume_credit_card: 0,
      total_volume_tezos: 0
    }
  },
  created () {
    this.getStats()
  },
  mounted () {
    this.stripe_transaction_info.forEach((transaction) => {
      this.total_volume_credit_card += transaction.amount
    })
    this.tezos_transaction_info.forEach((transaction) => {
      this.total_volume_tezos += transaction.amount
    })
  },
  methods: {
    getStats () {
      this.$apollo.query(apolloQueries.courses_aggregate)
        .then((response) => {
          this.courses_aggregate = response.data.courses_aggregate.aggregate.count
        })
        .catch((error) => {
          console.error(error)
        })

      this.$apollo.query(apolloQueries.user_course_aggregate)
        .then((response) => {
          this.user_course_aggregate = response.data.user_course_aggregate.aggregate.count
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
