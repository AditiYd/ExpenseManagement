using Expense_Management.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Expense_Management.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly MongoCollectionBase<Expense> _theExpenses;
        public ExpenseService(IExpenseDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _theExpenses = (MongoCollectionBase<Expense>?)database.GetCollection<Expense>(settings.ExpensesCollectionName);
        }
        public Expense Create(Expense expense)
        {
            var maxExpenseId = _theExpenses.Find(x => true).SortByDescending(x => x.ExpenseId).FirstOrDefault()?.ExpenseId ?? 0;
            expense.ExpenseId = maxExpenseId + 1;

            expense.Id = ObjectId.GenerateNewId().ToString();
            _theExpenses.InsertOne(expense);
            return expense;
        }

        public List<Expense> Get()
        {
            return _theExpenses.Find(expense => true).ToList();
        }

        public Expense Get(int Id)
        {
            return _theExpenses.Find(expense => expense.ExpenseId == Id).FirstOrDefault();
        }

        public void Remove(int Id)
        {
            _theExpenses.DeleteOne(expense => expense.ExpenseId == Id);
        }

        public void Update(int id, Expense expense)
        {
            var oldExpense = _theExpenses.Find(x => x.ExpenseId == id).FirstOrDefault(); 
            if (oldExpense != null)
            {
                expense.Id = oldExpense.Id;
                expense.ExpenseId = oldExpense.ExpenseId;
                expense.UserId = oldExpense.UserId;
                expense.Date = (expense.Date == "string") ? oldExpense.Date : expense.Date;
                expense.Category = (expense.Category == "string") ? oldExpense.Category : expense.Category;
                expense.Status = (expense.Status == "string") ? oldExpense.Status : expense.Status;
                expense.Feedback = (expense.Feedback == "string") ? oldExpense.Feedback : expense.Feedback;
                expense.Amount = expense.Amount == 0 ? oldExpense.Amount : expense.Amount;

                _theExpenses.ReplaceOne(x => x.ExpenseId == id, expense);
            }
        }
    }
}
