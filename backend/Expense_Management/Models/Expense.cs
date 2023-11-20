using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Expense_Management.Models
{
    public class Expense
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;
        [BsonElement("ExpenseId")]
        public int ExpenseId { get; set; }
        [BsonElement("UserId")]
        public int UserId { get; set; }
        [BsonElement("Date")]
        public string Date { get; set; } = string.Empty;
        [BsonElement("Category")]
        public string Category { get; set; } = string.Empty;
        [BsonElement("Amount")]
        public int Amount { get; set; }
        [BsonElement("Status")]
        public string Status { get; set; } = string.Empty;
        [BsonElement("Feedback")]
        public string Feedback { get; set; } = string.Empty;
    }
}
