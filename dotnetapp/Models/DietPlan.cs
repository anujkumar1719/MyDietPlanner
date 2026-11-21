using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetapp.Models
{
    public class DietPlan
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DietPlanId {get;set;}
        [Required]
        public string PlanName {get;set;}
        [Required]
        public string Description {get;set;}
        [Required]
        public int Duration {get;set;}
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt {get;set;}
    }
}