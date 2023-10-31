<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Support\Facades\DB;

class PlanController extends Controller
{
    /**
     * Display a listing of the plans.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return Plan::all();

        return DB::table('plans')
                ->orderBy('id', 'asc')
                ->get();
    }
}
