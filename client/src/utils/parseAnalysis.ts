interface AnalysisResult {
  calories: number
  totalWeight: number
  totalNutrientsKCal: {
    ENERC_KCAL: Spec
    PROCNT_KCAL: Spec
    FAT_KCAL: Spec
    CHOCDF_KCAL: Spec
  }
}

interface Spec {
  label: string
  quantity: number
  unit: string
}

export interface ParsedAnalysisResult {
  totalCal: number
  proteinCalTotal: number
  fatCalTotal: number
  carbsCalTotal: number
  calPer100g: number
  proteinCalPer100: number
  fatCalPer100: number
  carbsCalPer100: number
  totalRatio: {
    protein: number
    fat: number
    carbs: number
  }
}

export const parseAnalysisResult = (
  data: AnalysisResult
): ParsedAnalysisResult => {
  const {
    calories: totalCal,
    totalWeight,
    totalNutrientsKCal: { PROCNT_KCAL, FAT_KCAL, CHOCDF_KCAL }
  } = data

  const calPer100g = (totalCal * 100) / totalWeight

  /* calculating % ratio total */
  let calInOnePercent = totalCal / 100
  const calFromProtPercent = PROCNT_KCAL.quantity / calInOnePercent
  const calFromFatPercent = FAT_KCAL.quantity / calInOnePercent
  const calFromCarbsPercent = CHOCDF_KCAL.quantity / calInOnePercent

  /* calculating nutrient amounts per 100g */
  calInOnePercent = calPer100g / 100
  const proteinCalPer100 = calFromProtPercent * calInOnePercent
  const fatCalPer100 = calFromFatPercent * calInOnePercent
  const carbsCalPer100 = calFromCarbsPercent * calInOnePercent

  return {
    totalCal: Math.round(totalCal),
    proteinCalTotal: Math.round(PROCNT_KCAL.quantity),
    fatCalTotal: Math.round(FAT_KCAL.quantity),
    carbsCalTotal: Math.round(CHOCDF_KCAL.quantity),
    calPer100g: Math.round(calPer100g),
    proteinCalPer100: Math.round(proteinCalPer100),
    fatCalPer100: Math.round(fatCalPer100),
    carbsCalPer100: Math.round(carbsCalPer100),
    totalRatio: {
      protein: Math.round(calFromProtPercent),
      fat: Math.round(calFromFatPercent),
      carbs: Math.round(calFromCarbsPercent)
    }
  }
}
