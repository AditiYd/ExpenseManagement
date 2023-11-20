using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Expense_Management.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;
        [BsonElement("UserId")]
        public int UserId { get; set; }
        [BsonElement("Email")]
        public string Email { get; set; } = string.Empty;
        [BsonElement("PasswordHash")]
        public string PasswordHash { get; set; } = string.Empty;
        [BsonElement("Role")]
        public string Role { get; set; } = string.Empty;
        [BsonElement("Department")]
        public string Department { get; set; } = string.Empty;
        [BsonElement("Budget")]
        public int Budget { get; set; }
    }
}
