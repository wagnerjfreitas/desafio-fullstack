<?php
namespace App\Services;

use App\Models\Contract;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ContractService
{
    public function createContractAndPayment(array $contract)
    {
        DB::beginTransaction();

        try {       
            $contract['date_payment'] = Carbon::now()->format('Y-m-d');
            $contract['active'] = false;

            $user = User::find($contract['user_id']);

            if (!$user) {
                return response()->json(['Usuário não encontrado', $e->getMessage()], 404); 
            }
            
            $oldActivedContract = $user->activedContracts()->first();

            if(!empty($oldActivedContract)) {

                if ($contract['date_payment'] === $oldActivedContract['date_payment']){
                    return response()->json('Não é possível alterar o contrato no mesmo dia de sua criação.', 404); 
                }

                $oldContractDay = Carbon::parse($oldActivedContract['date_payment'])->day;
                $newContractDay = Carbon::parse($contract['date_payment'])->day;                

                $endOfCurrentMonth = Carbon::now()->endOfMonth()->day;
                if($newContractDay > $oldContractDay) {                
                    $dayWithCredit = $endOfCurrentMonth - $newContractDay + $oldContractDay;
                } else {
                    $dayWithCredit = $oldContractDay - $newContractDay;
                }

                $discount = (($oldActivedContract['value'] / $endOfCurrentMonth) * $dayWithCredit) + $oldActivedContract['discount'];
                    
                if ($contract['value'] < $discount) {
                    $newPaymentValue = 0;
                    $discount = $discount - $contract['value'];
                    $contract['discount'] = $discount;
                } else {
                    $newPaymentValue = $contract['value'] - $discount;
                    $contract['discount'] = 0;
                }

                $newContract = Contract::create($contract); 

                $this->deactivateContract($oldActivedContract['id']);
            }        

            $newContract = Contract::create($contract);     

            $payment = new Payment([
                'value' => $newContract['value'],
                'due_date' => Carbon::now()->format('Y-m-d'),
                'contract_id' => $newContract['id'],
                'isPaid' => false,
            ]);
            $payment->save();

            DB::commit();

            return response()->json($newContract['id'], 201); 
        } catch (\Exception $e) {
            DB::rollback();
            throw $e; 
        }
    }

    private function deactivateContract($id)
    {    
        $contract = Contract::find($id);

        if (!$contract) {
            return response()->json('contrato não encontrado!', 404);
        }

        $contract->update(['active' => false]);      
    }
}
