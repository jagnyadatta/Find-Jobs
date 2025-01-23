import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=> navigate(`/description/${job._id}`)} className='w-[95%] sm:w-[100%] p-3 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='font-medium text-sm sm:text-lg'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-sm sm:text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex-row sm:flex-col items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#04c40a] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
        </div>

    </div>
  )
}

export default LatestJobCards