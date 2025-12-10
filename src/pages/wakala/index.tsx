import React from 'react'
import Header from '../../layout/navbar/Header'
import { useApp } from '../../context/ContextProvider';
import WakalaCreate from './WakalaCreate';
import { WakalaTable } from './WakalaList';

const Wakala = () => {
    const { isButtonPress, setIsButtonPress } = useApp();

  return (
    <section>
        <Header title="Wakala Management"  />
        <div>
            <WakalaTable/>
        </div>
        {isButtonPress && <WakalaCreate />}
    </section>
  )
}

export default Wakala