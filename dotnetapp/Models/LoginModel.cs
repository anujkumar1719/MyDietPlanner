using System;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        public string Email{get;set;}
        
        [StringLength(20, MinimumLength = 8,
        ErrorMessage = "Password must be between 8 and 20 characters.")]
        [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$",
        ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.")]
        public string Password{get;set;}
    }
}