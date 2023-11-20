using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Expense_Management.Models;
using Expense_Management.Services;
using Expense_Management;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ExpenseDatabaseSettings>(
    builder.Configuration.GetSection(nameof(ExpenseDatabaseSettings)));
builder.Services.AddSingleton<IExpenseDatabaseSettings>(sp =>
    sp.GetRequiredService<IOptions<ExpenseDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(sp =>
    new MongoClient(builder.Configuration.GetValue<string>("ExpenseDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IExpenseService, ExpenseService>();

builder.Services.Configure<UserDatabaseSettings>(
    builder.Configuration.GetSection(nameof(UserDatabaseSettings)));
builder.Services.AddSingleton<IUserDatabaseSettings>(sp =>
    sp.GetRequiredService<IOptions<UserDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(sp =>
    new MongoClient(builder.Configuration.GetValue<string>("UserDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IUserService, UserService>();



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(options =>
            options.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

app.MapControllers();

app.Run();
