using System;
using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;    
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class DietPlanService
    {
        private readonly ApplicationDbContext _context;
        public DietPlanService(ApplicationDbContext context)
        {
            _context = context;
        }

        //Get All Diet Plans
        public async Task<IEnumerable<DietPlan>> GetAllDietPlans()
        {
            return await _context.DietPlans.ToListAsync();
        }

        //Get Diet Plan By Id
        public async Task<DietPlan?> GetDietPlanById(int dietPlanId)
        {
            var dietPlanById = await _context.DietPlans.FirstOrDefaultAsync(d => d.DietPlanId == dietPlanId);
            if (dietPlanById == null)
            {
                return null;
            }
            else
            {
                return dietPlanById;
            }

        }

        //Add Diet Plan
        public async Task<bool> AddDietPlan(DietPlan dietPlan)
        {
            bool exists = await _context.DietPlans.AnyAsync(d => d.PlanName == dietPlan.PlanName);
            if (exists)
            {
                throw new DietPlanException("Diet Plan with the same name already exists");
            }

            await _context.DietPlans.AddAsync(dietPlan);
            await _context.SaveChangesAsync();

            return true;
        }

        //Update Diet Plan
        public async Task<bool> UpdateDietPlan(int dietPlanId, DietPlan dietPlan)
        {
            var existingDietPlan = await _context.DietPlans.FirstOrDefaultAsync(d => d.DietPlanId == dietPlanId);

            if (existingDietPlan == null)
            {
                return false;
            }

            bool duplicateName = await _context.DietPlans.AnyAsync(d =>
                d.PlanName == dietPlan.PlanName &&
                d.DietPlanId != dietPlanId);

            if (duplicateName)
            {
                throw new DietPlanException("Diet Plan with the same name already exists");
            }
            existingDietPlan.PlanName = dietPlan.PlanName;
            existingDietPlan.Description = dietPlan.Description;
            existingDietPlan.Duration = dietPlan.Duration;
            existingDietPlan.CreatedAt = dietPlan.CreatedAt;

            await _context.SaveChangesAsync();

            return true;
        }

        //Delete Diet Plan
        public async Task<bool> DeleteDietPlan(int dietPlanId)
        {
            var dietPlan = await _context.DietPlans.FirstOrDefaultAsync(d => d.DietPlanId == dietPlanId);

            if (dietPlan == null)
            {
                return false;
            }

            _context.DietPlans.Remove(dietPlan);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
