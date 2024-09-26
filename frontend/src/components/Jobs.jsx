import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './job';


const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div className='max-w-7xl mx-auto '>
        <Navbar/>
        <div className='w-20%'>
            <FilterCard/>
            {
                jobsArray.map((job, index) => <Job/>)
            }
        </div>
    </div>
  )
}

export default Jobs