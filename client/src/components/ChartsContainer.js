import React, { useContext, useState } from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer'
import { AppContext } from '../context/AppContext'
import AreaChart from './AreaChartContainer'
import BarChartContainer from './BarChartContainer'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const {monthlyApplications: data} = useContext(AppContext)
  return (
   <Wrapper>
    <h4>Monthly Applications</h4>
    <button type='button' onClick={()=>setBarChart(!barChart)}>{barChart? 'Area Chart' : 'Bar Chart'}</button>
    {barChart ? <BarChartContainer data={data} /> :  <AreaChart data={data} /> }
    </Wrapper>
  )
}

export default ChartsContainer
