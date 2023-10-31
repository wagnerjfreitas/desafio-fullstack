import { ModalContext } from "@/contexts/ModalContext";
import { UserContext } from "@/contexts/UserContext";
import { formatMoney } from "@/contexts/utils/format";
import { api, apiException } from "@/lib/axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface Payment {
  id: number;
  contract_id: number;
  description?: string;
  numberOfClients: number | 0;
  gigabytesStorage: number | 0;
  value: number | 0;  
  due_date?: string;
  isPaid?: boolean | false;
}

export const Payments = () => {

  const { contractId } = useParams();
  const { user, logIn } = useContext(UserContext);
  const { handleOpenModal } = useContext(ModalContext);
  const [payments, setPayments] = useState<Payment[]>([] as Payment[])

  useEffect(() => {
    if(!user){
      logIn();
    }
  }, [])

  useEffect(() => {  

    async function loadPaymentsByContract() {
      const {data} = await api.get(`/contracts/${contractId}/payments`)
      console.log('payments:', data)
      setPayments(data)
    }

    loadPaymentsByContract();    
  }, [])

  async function payPayment(id: number) {
    try {          
      const {data} = await api.patch(`/payments/${id}/pay`)
      console.log('payments:', data)
      const updatedPayments = payments.map(pay => {
        if (pay.id === id) {
          return { ...pay, isPaid: true };
        }
        return pay;
      });
      setPayments(updatedPayments)
      handleOpenModal('Uhuuu!', 'Pagamento concluído com sucesso!')
    } catch (error) {
      handleOpenModal('Ops!', apiException(error), 'danger')
    }
  }  


  return (
    <div className="bg-white py-10 px-10 sm:py-10">
    <ul role="list" className=" max-w-lg content-center">
      {payments && payments.length === 0 && <div>Nenhum pagamento encontrado</div>}
      {payments.map((pay) => {
        return(
          <li key={pay.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">            
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{pay.description}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">                
                  Vencimento: {format(new Date(pay.due_date as string), 'dd/MM/yyyy')}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{formatMoney(pay.value)}</p>

                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className={`flex-none rounded-full bg-emerald-500/20 ${pay.isPaid ? 'bg-emerald-500/20' : 'bg-red-500/20'} p-1`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${pay.isPaid ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">{pay.isPaid ? 'Pago' : 'Pendente'}</p>
                </div>
    
            </div>
            <button
              type="button"
              disabled={pay.isPaid}
              onClick={() => payPayment(pay.id)}
              className={`block rounded-md  ${pay.isPaid ? 'bg-slate-200' : 'bg-indigo-600  hover:bg-indigo-500 focus-visible:outline-indigo-600'} px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
                Pagar
            </button>
            
          </li>
      )})}
    </ul>
    </div>
  )
}


