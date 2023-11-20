using Expense_Management.Models;
using Expense_Management.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Expense_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IMongoDatabase _mongoDatabase;

        public UserController(IUserService userService, IMongoClient mongoClient) 
        {
            this.userService = userService;
            _mongoDatabase = mongoClient.GetDatabase("ExpenseDB"); 
        }

        // GET: api/<ExpenseController>
        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            return userService.Get();
        }

        // GET api/<ExpenseController>/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            var exp = userService.Get(id);
            if (exp == null)
            {
                return NotFound($"Expense with Id = {id} not found");
            }
            return exp;
        }

        // POST api/<ExpenseController>
        [HttpPost]
        public ActionResult<User> Post([FromBody] User user)
        {
            userService.Create(user);
            return CreatedAtAction(nameof(Get), new { id = user.UserId }, user);
        }

        // PUT api/<ExpenseController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] User user)
        {
            var existingUser = userService.Get(id);
            if (existingUser == null)
            {
                return NotFound($"Expense with Id = {id} not found");
            }
            userService.Update(id, user);
            return NoContent();
        }

        // DELETE api/<ExpenseController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var user = userService.Get(id);
            if (user == null)
            {
                return NotFound($"Expense with Id = {id} not found");
            }
            userService.Remove(user.UserId);
            return Ok($"Expense with Id = {id} deleted");
        }

        [HttpPut("{dept}/{budget}")]
        public ActionResult Put(string dept, int budget)
        {
            userService.UpdateMultiple(dept, budget);
            return NoContent();
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(User user)
        {
            var userdata = _mongoDatabase.GetCollection<User>("User");
            var maxUserId = userdata.Find(x => true).SortByDescending(x => x.UserId).FirstOrDefault()?.UserId ?? 0;
            user.UserId = maxUserId + 1;

            user.Id = ObjectId.GenerateNewId().ToString();
            var registeredUser = await userService.Register(user);
            return Ok(registeredUser);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(User user)
        {
            var loginUser = await userService.Login(user.Email, user.PasswordHash);
            if (loginUser == null)
            {
                return Unauthorized();
            }
            else
            {
                return Ok(loginUser);
            }
        }
    }
}