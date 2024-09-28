import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const  filterData =[
  {
    filterType:"Location",
    array:["Delhi NCR", "Bangalore", "Hyderbad", "Pune", "Mumbai"]
  },
  {
    filterType:"Industry",
    array:["FullStack Developer", "Backend Developer", "Fullstack Developer"]
  },
  {
    filterType:"Salary",
    array:["0-40k", "42k-1lakh", "1lakh-5lakh"]
  },
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} className="form-radio h-4 w-4 text-blue-600" />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
  )
}

export default FilterCard