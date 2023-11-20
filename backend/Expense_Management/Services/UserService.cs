using Expense_Management.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Expense_Management.Services
{
    public class UserService : IUserService
    {
        private readonly MongoCollectionBase<User> userdata;
        public UserService(IUserDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            userdata = (MongoCollectionBase<User>?)database.GetCollection<User>(settings.UserCollectionName);
        }
        public User Create(User user)
        {
            var maxUserId = userdata.Find(x => true).SortByDescending(x => x.UserId).FirstOrDefault()?.UserId ?? 0;
            user.UserId = maxUserId + 1;

            user.Id = ObjectId.GenerateNewId().ToString();
            userdata.InsertOne(user);
            return user;
        }

        public List<User> Get()
        {
            return userdata.Find(user => true).ToList();
        }

        public User Get(int Id)
        {
            return userdata.Find(user => user.UserId == Id).FirstOrDefault();
        }

        public void Remove(int Id)
        {
            userdata.DeleteOne(user => user.UserId == Id);
        }

        public void Update(int id, User user)
        {
            var oldUser = userdata.Find(x => x.UserId == id).FirstOrDefault();
            if (oldUser != null)
            {
                user.Id = oldUser.Id;
                user.UserId = oldUser.UserId;
                user.Email = string.IsNullOrEmpty(user.Email) ? oldUser.Email : user.Email;
                user.PasswordHash = string.IsNullOrEmpty(user.PasswordHash) ? oldUser.PasswordHash : user.PasswordHash;
                user.Role = string.IsNullOrEmpty(user.Role) ? oldUser.Role : user.Role;
                user.Department = string.IsNullOrEmpty(user.Department) ? oldUser.Department : user.Department;
                user.Budget = user.Budget == 0 ? oldUser.Budget : user.Budget;

                userdata.ReplaceOne(x => x.UserId == id, user);
            }
        }

        public void UpdateMultiple(string dept, int budget)
        {
            var filter = Builders<User>.Filter.Eq("Department", dept);
            var update = Builders<User>.Update.Set("Budget", budget);

            userdata.UpdateMany(filter, update);
        }

        public async Task<User> Register(User user)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            await userdata.InsertOneAsync(user);
            return user;
        }
        public async Task<User> Login(string Email, string PasswordHash)
        {
            var user = await userdata.Find(user => user.Email == Email).FirstOrDefaultAsync();
            if(user != null && BCrypt.Net.BCrypt.Verify(PasswordHash, user.PasswordHash))
            {
                return user;
            }
            return null;
        }
    }
}
