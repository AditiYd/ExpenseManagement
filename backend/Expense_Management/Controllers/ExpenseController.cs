using Expense_Management.Models;
using Expense_Management.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Expense_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService expenseService;
        public ExpenseController(IExpenseService expenseService)
        {
            this.expenseService = expenseService;
        }
        // GET: api/<ExpenseController>
        [HttpGet]
        public ActionResult<List<Expense>> Get()
        {
            return expenseService.Get();
        }

        // GET api/<ExpenseController>/5
        [HttpGet("{id}")]
        public ActionResult<Expense> Get(int id)
        {
            var exp = expenseService.Get(id);
            if(exp == null)
            {
                return NotFound($"Expense with Id = {id} not found");
            }
            return exp;
        }

        // POST api/<ExpenseController>
        [HttpPost]
        public ActionResult<Expense> Post([FromBody] Expense expense)
        {
            expenseService.Create(expense);
            return CreatedAtAction(nameof(Get), new { id = expense.ExpenseId }, expense);

        }

        // PUT api/<ExpenseController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Expense expense)
        {
            var existingExpense = expenseService.Get(id);
            if(existingExpense == null)
            {
                return NotFound($"Expense with Id = {id} not found");
            }
            expenseService.Update(id, expense);
            return NoContent();
        }

        // DELETE api/<ExpenseController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var expense = expenseService.Get(id);
            if (expense == null)
            {
                return NotFound($"Expense with Id = {id} not found");
            }
            expenseService.Remove(expense.ExpenseId);
            return Ok($"Expense with Id = {id} deleted");
        }
    }
}
