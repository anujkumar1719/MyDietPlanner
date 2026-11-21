using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(
            ApplicationDbContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            try
            {
                var userExists = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == model.Email);

                if (userExists != null)
                {
                    return (0, "User already exists");
                }

                model.UserRole = role;
                   if (model.Password.Length < 8 || model.Password.Length > 20)
                  {
                     return (0, "Password must be between 8 and 20 characters.");
                  }

                // BCrypt Hash Password
                model.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
            

                _context.Users.Add(model);
                await _context.SaveChangesAsync();

                return (1, "Registration successful");
            }
           catch (Exception ex)
              {
                 return (0, ex.InnerException?.Message ?? ex.Message);
              }
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == model.Email);

            if (user == null)
            {
                return (0, "Invalid email");
            }

            bool isPasswordValid =
                BCrypt.Net.BCrypt.Verify(
                    model.Password,
                    user.Password);

            if (!isPasswordValid)
            {
                return (0, "Invalid password");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("Role", user.UserRole),
                new Claim("UserId", user.UserId.ToString())
            };

            string token = GenerateToken(claims);
            
            return (1,token);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["JWT:Secret"]));

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}