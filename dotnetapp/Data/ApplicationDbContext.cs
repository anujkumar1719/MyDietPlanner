using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
namespace dotnetapp.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options){

        }
        public ApplicationDbContext(){

        }
        public DbSet<Feedback> Feedbacks{get;set;}
        public DbSet<User> Users{get;set;}
        public DbSet<DietPlanRequest> DietPlanRequests{get;set;}
        public DbSet<DietPlan> DietPlans{get;set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<DietPlanRequest>().HasOne(d=>d.User).WithMany().HasForeignKey(d=>d.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DietPlanRequest>().HasOne(d=>d.DietPlan).WithMany().HasForeignKey(d=>d.DietPlanId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Feedback>().HasOne(f=>f.User).WithMany().HasForeignKey(f=>f.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>().HasIndex(i=>i.Username).IsUnique();
            modelBuilder.Entity<User>().HasIndex(i=>i.Email).IsUnique();
            //modelBuilder.Entity<User>().HasIndex(i=>i.MobileNumber).IsUnique();
        }
    }
}