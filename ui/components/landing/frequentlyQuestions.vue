<script>
export default {
  data () {
    return {
      questions: [
        {
          question: 'What is the Academy by Blind Gallery?',
          answer: 'The Academy aims to provide educational content for anyone interested in learning the digital art market',
          isCollapsed: true
        },
        {
          question: 'What is the Blind Gallery?',
          answer: 'The Blind Gallery is a digital gallery specializing in blockchain art. It has collaborated with over 70 artists, reaching over 1,000 collectors worldwide',
          isCollapsed: true
        },
        {
          question: 'Who is the founder of the Blind Gallery?',
          answer: 'Kaloh founded the Blind Gallery in 2022, and we are a team of five blockchain art enthusiasts.',
          isCollapsed: true
        },
        {
          question: 'Who creates the content?',
          answer: 'The Blind Gallery team. In addition, we are looking for experts interested in sharing their knowledge in the blockchain art space. Please reach out here if interested.',
          isCollapsed: true
        },
        {
          question: 'What payment methods are available?',
          answer: 'You can purchase the courses using a Credit Card via Stripe or XTZ (Tezos) cryptocurrency.',
          isCollapsed: true
        },
        {
          question: 'What login methods are available?',
          answer: 'You can create an account using an email or a Tezos crypto wallet.',
          isCollapsed: true
        },
        {
          question: 'Where can I ask questions and get support?',
          answer: 'You can find the customer support team on our Discord server',
          isCollapsed: true
        }
      ]
    }
  },
  methods: {
    toggleCollapse (index) {
      this.questions[index].isCollapsed = !this.questions[index].isCollapsed
    },
    beforeEnter (el) {
      el.style.maxHeight = '0'
    },
    enter (el) {
      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.transition = 'max-height 0.3s ease-in-out'
    },
    afterEnter (el) {
      el.style.maxHeight = 'none'
    },
    beforeLeave (el) {
      el.style.maxHeight = el.scrollHeight + 'px'
    },
    leave (el) {
      setTimeout(() => {
        el.style.maxHeight = '0'
      }, 10)
    },
    afterLeave (el) {
      el.style.maxHeight = 'none'
    }
  }
}
</script>

<template>
  <div class="tw-container tw-my-16">
    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-items-end">
      <div>
        <h4 class="tw-mb-8">
          Frequently Asked Questions
        </h4>
        <div v-for="(question, index) in questions" :key="index" class="tw-border tw-rounded tw-mb-2 tw-overflow-hidden">
          <div class="tw-cursor-pointer tw-flex tw-flex-col hover:tw-bg-gray-100 tw-truncate tw-ease-in-out tw-duration-200 tw-p-4" @click="toggleCollapse(index)">
            <div class="tw-w-full tw-justify-between tw-flex">
              <span class="tw-truncate">{{ question.question }}</span>

              <div :class="{'tw-transform tw-rotate-180': !question.isCollapsed, 'tw-transform': question.isCollapsed}" class="tw-ease-in-out tw-duration-200">
                <Icon icon="material-symbols-light:keyboard-arrow-down-rounded" width="1.5rem" />
              </div>
            </div>
          </div>

          <transition
            name="accordion"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
          >
            <div v-show="!question.isCollapsed">
              <div class="tw-p-4 tw-flex tw-items-center tw-gap-2">
                <span class="tw-text-sm tw-text-gray-500">
                  {{ question.answer }}
                </span>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div>
        <iframe
          src="https://blindgallery.substack.com/embed"
          height="150"
          width="100%"
          frameborder="0"
          scrolling="no"
        />
      </div>
    </div>
  </div>
</template>
