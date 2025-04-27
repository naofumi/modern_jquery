/*
* This is a plain JavaScript class that
* contains the business logic for calculating
* the price of the train ticket in this demo.
*
* This allows us to separate business logic from
* presentation and can be unit tested easily.
*
* Note that the ability to use modules (in this case
* es modules) encourages us to split our code into
* smaller pieces.
*
* This was much more challenging in the early jQuery days.
* */
export class Price {
  private readonly grade: "regular" | "firstClass"
  private readonly passengerCount: number
  private readonly discount: number

  private gradeLookup = {
    regular: {unit: 10000},
    firstClass: {unit: 15000},
  }

  constructor(
    {grade, passengerCount, discount}: {
      grade: "regular" | "firstClass",
      passengerCount: number,
      discount: number
    }
  ) {
    this.grade = grade
    this.passengerCount = passengerCount
    this.discount = discount
  }

  unit() {
    const { unit } = this.gradeLookup[this.grade]
    return unit
  }

  total() {
    return this.passengerCount * (1.0 - this.discount/100) * this.unit()
  }
}
