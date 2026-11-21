using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class DietPlanRequest
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DietPlanRequestId {get; set;}
        
        [Required]
        public int UserId {get;set;}
        [JsonIgnore]
        public User? User {get;set;}
        
        [Required]
        public int DietPlanId {get;set;}
        [JsonIgnore]
        public DietPlan? DietPlan {get;set;}
         
        [Required]
        public int Age {get;set;}

        [Required]
        public double Weight {get;set;}
        [Required]
        public double Height {get;set;}
        [Required]
        public string Gender {get;set;}
        [Required]
        public string ActivityLevel {get;set;}
        [Required]
        public string Goal {get;set;}
        [Required]
        public string MedicalConditions {get;set;}
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt {get;set;}
        [Required]
        public string Status {get;set;}
        
    }
}