<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;

use App\Models\Contract;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Services\ContractService;
use DB;

class ContractController extends Controller
{    
    protected $contractService;

    public function __construct(ContractService $contractService)
    {
        $this->contractService = $contractService;
    }

    public function index()
    {
        Log::emergency('An informational message.');
        return Contract::all();        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'user_id' => 'required',     
            'value' => 'required',  
            'numberOfClients' => 'required',
            'gigabytesStorage' => 'required',                            
        ]);

        try {
            $data = $request->all();    
            return $this->contractService->createContractAndPayment($data);
        } catch (\Exception $e) {
            return response()->json(['Ocorreu um erro. Repita a operação!', $e->getMessage()], 404);
        }                
    } 
    
    public function getPaymentsByContract($id){

        try {
            $contract = Contract::find($id);
            if ($contract) {            
                return response()->json($contract->payments, 200);
            } else {
                return response()->json('Contrato não encontrado', 404);
            }
        } catch (\Exception $e) {
            return response()->json(['Falha ao buscar os pagamentos.', $e->getMessage()], 404);
        } 
    }

}
