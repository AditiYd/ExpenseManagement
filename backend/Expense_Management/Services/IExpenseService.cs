using Expense_Management.Models;
namespace Expense_Management.Services
{
    public interface IExpenseService
    {
        List<Expense> Get();
        Expense Get(int Id);
        Expense Create(Expense expense);
        void Update(int Id, Expense expense);
        void Remove(int Id);
    }
}
