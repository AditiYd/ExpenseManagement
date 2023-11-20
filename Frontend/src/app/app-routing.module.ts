import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddExpenseComponent } from './features/add-expense/add-expense.component';
import { EditExpenseComponent } from './features/edit-expense/edit-expense.component';
import { RegisterComponent } from './login-register/register/register.component';
import { LoginComponent } from './login-register/login/login.component';
import { DeleteComponent } from './features/delete/delete.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { ApprovalComponent } from './manager/approval/approval.component';
import { ViewEmployeeComponent } from './manager/view-employee/view-employee.component';
import { EmployeeExpenseComponent } from './manager/employee-expense/employee-expense.component';
import { RejectedComponent } from './features/rejected/rejected.component';
import { ProfileComponent } from './features/profile/profile.component';
import { BudgetComponent } from './manager/budget/budget.component';
import { ReceiptComponent } from './features/receipt/receipt.component';
import { ViewReceiptComponent } from './features/view-receipt/view-receipt.component';
import { ManagerReceiptComponent } from './manager/manager-receipt/manager-receipt.component';


const routes: Routes = [
  {
    path: "",
    component: RegisterComponent
  },
  { 
    path: "dashboard", 
    component: DashboardComponent 
  },
  {
    path: 'add-expense',
    component: AddExpenseComponent
  },
  {
    path: 'edit-expense/:expenseId',
    component: EditExpenseComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'delete/:expenseId',
    component: DeleteComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'manager-dashboard',
    component: ManagerDashboardComponent
  },
  {
    path: 'approval/:expenseId',
    component: ApprovalComponent
  },
  {
    path: 'view-employee',
    component: ViewEmployeeComponent
  },
  {
    path: 'employee-expense',
    component: EmployeeExpenseComponent
  },
  {
    path: 'rejected',
    component: RejectedComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'budget',
    component: BudgetComponent
  },
  {
    path: 'receipt/:expenseId',
    component: ReceiptComponent
  },
  {
    path: 'view-receipt/:expenseId',
    component: ViewReceiptComponent
  },
  {
    path: 'manager-receipt/:expenseId',
    component: ManagerReceiptComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
