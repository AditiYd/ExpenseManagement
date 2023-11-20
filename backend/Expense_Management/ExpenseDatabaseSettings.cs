namespace Expense_Management
{
    public class ExpenseDatabaseSettings : IExpenseDatabaseSettings
    {
       public string ExpensesCollectionName { get; set; } = string.Empty;
       public string ConnectionString { get; set; } = string.Empty;
       public string DatabaseName { get; set; } = string.Empty;
    }
}
