import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddExpenseComponent } from './features/add-expense/add-expense.component';
import { EditExpenseComponent } from './features/edit-expense/edit-expense.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared/shared.module';
import { MaterialModule } from './material/material/material.module';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { DeleteComponent } from './features/delete/delete.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { ApprovalComponent } from './manager/approval/approval.component';
import { BudgetComponent } from './manager/budget/budget.component';
import { ViewEmployeeComponent } from './manager/view-employee/view-employee.component';
import { EmployeeExpenseComponent } from './manager/employee-expense/employee-expense.component';
import { RejectedComponent } from './features/rejected/rejected.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ReceiptComponent } from './features/receipt/receipt.component';
import { ViewReceiptComponent } from './features/view-receipt/view-receipt.component';
import { ManagerReceiptComponent } from './manager/manager-receipt/manager-receipt.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddExpenseComponent,
    EditExpenseComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    DeleteComponent,
    ManagerDashboardComponent,
    ApprovalComponent,
    BudgetComponent,
    ViewEmployeeComponent,
    EmployeeExpenseComponent,
    RejectedComponent,
    ProfileComponent,
    ReceiptComponent,
    ViewReceiptComponent,
    ManagerReceiptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
