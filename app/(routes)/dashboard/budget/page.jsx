"use client";

import React from "react";
import dynamic from "next/dynamic";

const BudgetList = dynamic(() => import("./_components/BudgetList"), {
  ssr: false,
});

const Budget = () => {
  return (
    <div>
      <div className="p-4 text-3xl">My Budgets</div>
      <BudgetList />
    </div>
  );
};

export default Budget;
