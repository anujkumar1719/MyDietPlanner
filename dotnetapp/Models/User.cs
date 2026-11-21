using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetapp.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId{get;set;}
        [Required]
        [EmailAddress]
        public string Email{get;set;}
        [Required]
        [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$",
        ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.")]

        public string Password{get;set;}
        [Required]
        public string Username{get;set;}
        [Required]

        [RegularExpression(@"^[6-9]\d{9}$",
        ErrorMessage = "Enter a valid 10-digit mobile number.")]

        public string MobileNumber{get;set;}
        [Required]
        public string UserRole{get;set;}

    }
}