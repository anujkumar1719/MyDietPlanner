using System;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class ApplicationUser
    {
        [Required]
        [MaxLength(30)]
        public string Name {get;set;}
    }
}