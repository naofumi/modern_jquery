import $ from 'jquery'
import { Price } from './calculator/price.ts'

const calculators = $("[data-jquery='calculator']")

calculators.each((_i, el) => {
  const calculator = $(el)

  /*
  * Connect DOM elements via behavior hooks.
  *
  * Having all of these defined at the top of the main function makes it
  * easy to grasp what your code is responding to and what it changes.
  *
  * Notice how we use `data-*` attributes for behavior hooks.
  * This makes it easy to understand the connection between the HTML and jQuery code.
  * It is also very easy to search with grep.
  *
  * The attribute names used here were inspired by Stimulus.
  * */
  const gradeButtonRegularTarget = calculator.find("[data-jquery-calculator-target='grade-selector-regular']")
  const gradeButtonFirstClassTarget = calculator.find("[data-jquery-calculator-target='grade-selector-first-class']")
  const passengerCountTarget = calculator.find("[data-jquery-calculator-target='passenger-count']")
  const discountTarget = calculator.find("[data-jquery-calculator-target='discount']")
  const unitPriceTarget = calculator.find("[data-jquery-calculator-target='unit-price']")
  const totalPriceTarget = calculator.find("[data-jquery-calculator-target='total-price']")
  const messageTarget = calculator.find("[data-jquery-calculator-target='message']")

  /*
  * State
  *
  * You can define state as a simple variable.
  * This will be used inside functions as closures.
  * */
  const state = {
    grade: 'regular',
    passengerCount: 1,
    discount: 20,
  }

  /*
  * Attach event handlers
  *
  * It is a good idea to keep all your event handlers in the same section.
  * */
  passengerCountTarget.on('change', () => {
    state.passengerCount = Number(passengerCountTarget.val() ?? 0)
    render()
  })

  discountTarget.on('change', () => {
    state.discount = Number(discountTarget.val() ?? 0)
    render()
  })

  gradeButtonRegularTarget.on('click', () => {
    state.grade = 'regular'
    gradeButtonRegularTarget.attr('aria-selected', 'true')
    gradeButtonFirstClassTarget.attr('aria-selected', 'false')
    render()
  })

  gradeButtonFirstClassTarget.on('click', () => {
    state.grade = 'firstClass'
    gradeButtonRegularTarget.attr('aria-selected', 'false')
    gradeButtonFirstClassTarget.attr('aria-selected', 'true')
    render()
  })

  /*
  * When you have a lot of event handlers updating a lot of DOM elements,
  * it makes sense to use the [Mediator Pattern](https://refactoring.guru/design-patterns/mediator),
  * and patterns that are similar to the one-way data flow pattern in React.
  *
  * Here, the Mediator is the `state`.
  * Changes in the `state` flow through to all the DOM elements that are affected by
  * this jQuery function.
  *
  * For some changes, you may not need to update all the elements.
  * Indeed, it may be inefficient.
  *
  * However, just having a single function to update everything makes it much easier
  * to reason about.
  * */
  // Update DOM elements depending on current state
  function render() {
    /*
    * Business logic (calculating the price) is delegated to the
    * Price class (model).
    *
    * This allows for cleaner code and also allows you to unit test the
    * pricing algorithm.
    * */
    const price = new Price({
      grade: gradeButtonRegularTarget.attr('aria-selected') === 'true' ? 'regular' : 'firstClass',
      passengerCount: state.passengerCount,
      discount: state.discount,
    })

    passengerCountTarget.val(state.passengerCount)
    discountTarget.val(state.discount)
    unitPriceTarget.text(price.unit())
    totalPriceTarget.text(Math.round(price.total()))
    if (price.total() > 40000) {
      messageTarget.text("Wow!! That's expensive!")
    } else {
      messageTarget.text("")
    }
  }

  render()
})

