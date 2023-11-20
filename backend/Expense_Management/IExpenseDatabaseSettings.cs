namespace Expense_Management
{
    public interface IExpenseDatabaseSettings
    {
        string ExpensesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
