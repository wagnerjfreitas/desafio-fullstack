

import { useContext, useEffect, useState } from 'react'
import { apiException, api } from '@/lib/axios'
import { CheckIcon } from '@heroicons/react/20/solid'
import { UserContext } from '@/contexts/UserContext';
import { formatMoney } from '@/contexts/utils/format';
import { Contract } from './Contracts';
import { ModalContext } from '@/contexts/ModalContext';


interface Plan {
  id: number;
  description: string;
  numberOfClients: number;
  gigabytesStorage: number;
  price : number;
  active: boolean;
}

export function Plans() {

  const { user, logIn } = useContext(UserContext);
  const { handleOpenModal } = useContext(ModalContext);
  const [plans, setPlans] = useState<Plan[]>([] as Plan[])

  useEffect(() => {    
    if(!user){
      logIn();
    }
    loadPlans()
  }, [])

  async function loadPlans() {
    const {data} = await api.get('/plans')
    console.log('plans:', data)
    const ativedPlans = data.filter((p: Plan) => p.active)
    setPlans(ativedPlans)
  }

  async function payContract(plan: Plan){
    console.log('payContract', user)
    console.log('plan', plan)

    const newContract: Contract = {
      user_id: user ? user.id : 0,
      description: plan.description,
      gigabytesStorage: plan.gigabytesStorage,
      numberOfClients: plan.numberOfClients,
      discount: 0,
      value: plan.price,      
    }

    try {      
      const {data} = await api.post(`/contracts/`, newContract)
      console.log('contracts:', data)
      window.location.href = '/contracts';
    } catch (error) {         
      handleOpenModal('Ops!', apiException(error), 'danger');
    }
  }

  return (
    <div className="bg-white py-2">
        {plans.map(plan => {
          const textNumberOfClients = `${plan.numberOfClients} ${plan.numberOfClients > 1 ? 'Clientes' : 'Cliente'}`
          return(
            <div key={plan.id} className="my-4 mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-1 lg:mx-4 lg:flex lg:max-w-none">
              <div className="items-center lg:justify-center text-center p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">{plan.description}</h3>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">O que está incluso neste plano</h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {plan.gigabytesStorage} GBytes de espaço
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {textNumberOfClients} 
                    </li>
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">Pagamento Mensal</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">{formatMoney(plan.price)}</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">R$</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => payContract(plan)}
                      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                       Pagar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

