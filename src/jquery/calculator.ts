import $ from 'jquery'
import { Price } from './calculator/price.ts'

const calculators = $("[data-jquery='calculator']")

calculators.each((_i, el) => {
  const calculator = $(el)

  // Connect DOM elements
  const gradeButtonRegularTarget = calculator.find("[data-jquery-calculator-target='grade-selector-regular']")
  const gradeButtonFirstClassTarget = calculator.find("[data-jquery-calculator-target='grade-selector-first-class']")
  const passengerCountTarget = calculator.find("[data-jquery-calculator-target='passenger-count']")
  const discountTarget = calculator.find("[data-jquery-calculator-target='discount']")
  const unitPriceTarget = calculator.find("[data-jquery-calculator-target='unit-price']")
  const totalPriceTarget = calculator.find("[data-jquery-calculator-target='total-price']")
  const messageTarget = calculator.find("[data-jquery-calculator-target='message']")

  // State
  const state = {
    grade: 'regular',
    passengerCount: 1,
    discount: 20,
  }

  // Attach event handlers
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

  // Update DOM elements depending on current state
  function render() {
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
      messageTarget.text("ううう〜〜〜！ 高い！！！")
    } else {
      messageTarget.text("")
    }
  }

  render()
})

