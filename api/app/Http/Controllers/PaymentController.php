<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Contract;

class PaymentController extends Controller
{
    public function payPayment($id)
    {
        try {       
            $payment = Payment::find($id);

            if (!$payment) {
                return response()->json(['Pagamento não encontrado', $e->getMessage()], 404); 
            }
            
            $payment->update(['isPaid' => true]);   
            
            $contract = Contract::find($payment->contract_id);        
            var_dump('contract: '.$contract);
            $contract->update(['active' => true]);

            return response()->json('Pagamento efetuado com sucesso!', 200); 
        } catch (\Exception $e) {
            return response()->json(['Falha ao realizar o pagamento.', $e->getMessage()], 500); 
        }
    }

}
