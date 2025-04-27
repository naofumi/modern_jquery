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
