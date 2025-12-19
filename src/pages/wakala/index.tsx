import React from 'react'
import Header from '../../layout/navbar/Header'
import { WakalaTable } from './WakalaList';

const Wakala = () => {
  return (
    <section>
        <Header title="Wakala Management"  />
        <div>
            <WakalaTable/>
        </div>
    </section>
  )
}

export default Wakala