import React, { FunctionComponent } from 'react'
import { ParsedAnalysisResult } from '../utils/parseAnalysis'

interface AnalysisModalProps {
  title: string
  data: ParsedAnalysisResult
}

export const AnalysisModal: FunctionComponent<AnalysisModalProps> = ({
  title,
  data
}) => {
  const {
    totalCal,
    proteinCalTotal,
    fatCalTotal,
    carbsCalTotal,
    calPer100g,
    proteinCalPer100,
    fatCalPer100,
    carbsCalPer100,
    totalRatio
  } = data

  return (
    <div
      className='modal fade'
      id='analysisModal'
      tabIndex={-1}
      role='dialog'
      aria-labelledby='analysisModalTitle'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='analysisModalTitle'>
              Analysis results
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>

          <div className='modal-body'>
            <p className='lead'>
              It looks like the ratio of energy sources in the recipe '{title}'
              is {totalRatio.protein}% protein, {totalRatio.fat}% fat, and{' '}
              {totalRatio.carbs}% carbs.
            </p>
            <p className='lead'>
              USDA recommends adhering to 10-35% protein, 20-35% fat, and 45-65%
              in your daily calorie consumption.*
            </p>

            <div className='container-fluid px-0'>
              <div className='row justify-content-center no-gutters'>
                <div className='col'>
                  <table className='table table-sm table-hover'>
                    <tbody>
                      <tr>
                        <td className='border-top-0 font-weight-bold'>
                          Total kcal
                        </td>
                        <td className='border-top-0 font-weight-bold'>
                          {totalCal}
                        </td>
                      </tr>
                      <tr>
                        <td className='font-weight-light pl-3'>from protein</td>
                        <td className='font-weight-light'>{proteinCalTotal}</td>
                      </tr>
                      <tr>
                        <td className='font-weight-light pl-3'>from fat</td>
                        <td className='font-weight-light'>{fatCalTotal}</td>
                      </tr>
                      <tr>
                        <td className='font-weight-light pl-3'>from carbs</td>
                        <td className='font-weight-light'>{carbsCalTotal}</td>
                      </tr>
                      <tr>
                        <td className='font-weight-bold'>Kcal per 100g</td>
                        <td className='font-weight-bold'>{calPer100g}</td>
                      </tr>
                      <tr>
                        <td className='font-weight-light pl-3'>from protein</td>
                        <td className='font-weight-light'>
                          {proteinCalPer100}
                        </td>
                      </tr>
                      <tr>
                        <td className='font-weight-light pl-3'>from fat</td>
                        <td className='font-weight-light'>{fatCalPer100}</td>
                      </tr>
                      <tr>
                        <td className='font-weight-light pl-3'>from carbs</td>
                        <td className='font-weight-light'>{carbsCalPer100}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <p className='small text-muted'>
              *Please note, planning a proper diet depends on a variety of
              factors, including environment specifics, fitness goals, and
              health characteristics. It is wise to consult a medical specialist
              in some cases.
            </p>
          </div>

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-outline-secondary'
              data-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
