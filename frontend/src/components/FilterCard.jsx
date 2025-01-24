import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const  filterData =[
  {
    filterType:"Location",
    array:["Noida", "Bangalore", "Hyderbad", "Bhubaneswar", "Mumbai"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer", "Backend Developer", "Python Developer"]
  },
  {
    filterType:"Salary",
    array:["0-40k", "42k-1lakh", "1lakh-5lakh"]
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
  return (
    <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                <div className='flex sm:flex-col gap-5 sm:gap-0'>
                {
                    filterData.map((data, index) => (
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            <div>
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
                        </div>
                    ))
                }
                </div>
            </RadioGroup>
        </div>
  )
}

export default FilterCard