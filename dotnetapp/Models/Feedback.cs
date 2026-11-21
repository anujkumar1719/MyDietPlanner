using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class Feedback
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FeedbackId{get;set;}
        [Required]
        public int UserId{get;set;}
        [JsonIgnore]
        public User? User {get;set;}
        [Required]
        public string FeedbackText {get;set;}
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Date{get;set;}

    }
}