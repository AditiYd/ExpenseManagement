using Expense_Management.Models;
namespace Expense_Management.Services
{
    public interface IUserService
    {
        List<User> Get();
        User Get(int Id);
        User Create(User user);
        void Update(int Id, User user);
        void UpdateMultiple(string dept, int budget);
        void Remove(int Id);
        Task<User> Register(User user);
        Task<User> Login(string Email, string PasswordHash);
    }
}
