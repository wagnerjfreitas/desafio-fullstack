import { UserContext } from "@/contexts/UserContext";
import { formatMoney } from "@/contexts/utils/format";
import { api } from "@/lib/axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";

export interface Contract {
  id?: number;
  user_id: number;
  description?: string;
  numberOfClients: number | 0;
  gigabytesStorage: number | 0;
  value: number | 0;
  discount: number | 0;
  date_payment?: string;
  active?: boolean | false;
}

export const Contracts = () => {

  const { user, logIn } = useContext(UserContext);
  const [contracts, setContracts] = useState<Contract[]>([] as Contract[])

  useEffect(() => {
    if(!user){
      logIn();
    }
  }, [])

  useEffect(() => {  
    if(!user) return;

    async function loadContractsByUser() {
      const {data} = await api.get(`/user/${user?.id}/contracts`)
      console.log('contracts:', data)
      setContracts(data)
    }

    loadContractsByUser();    
  }, [user])

  

  return (
    <div className="bg-white py-10 px-10 sm:py-10">
    <ul role="list" className="content-center">
      {contracts && contracts.length === 0 && <div>Nenhum plano contrato</div>}
      {contracts.map((contract) => {
        const textNumberOfClients = `${contract.numberOfClients} ${contract.numberOfClients > 1 ? 'Clientes' : 'Cliente'}`
        return(
          <li key={contract.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">            
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{contract.description}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">                
                  Contratado em {format(new Date(contract.date_payment as string), 'dd/MM/yyyy')}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">                
                  {contract.gigabytesStorage} GBytes de espaço / {textNumberOfClients} 
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{formatMoney(contract.value)}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Desconto no próximo pagamento: {formatMoney(contract.discount)}
                  </p>
              
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className={`flex-none rounded-full bg-emerald-500/20 ${contract.active ? ' bg-emerald-500/20' : ' bg-red-500/20'} p-1`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${contract.active ? ' bg-emerald-500' : ' bg-red-500'}`} />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Plano {contract.active ? 'ativo' : 'inativo'} </p>
                </div>
              
            </div>

            <a
                href={`/contracts/${contract.id}/payments`}
                className="my-5 rounded-md bg-indigo-600 px-3 py-2 justify-center text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"                                         
                aria-current={contract.active ? 'page' : undefined}
              >
                Pagamentos
              </a>
            
          </li>
      )})}
    </ul>
    </div>
  )
}


