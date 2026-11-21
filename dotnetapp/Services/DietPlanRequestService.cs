using System;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class DietPlanRequestService
    {
        public ApplicationDbContext _context;

        public DietPlanRequestService(ApplicationDbContext context)
        {
            _context = context;
        }

        //List all DietPlanRequest
        public async Task<IEnumerable<object>> GetAllDietPlanRequests()
    {
        return await _context.DietPlanRequests
            .Include(d => d.DietPlan)
            .Include(u => u.User)
            .Select(r => new
            {
                dietPlanRequestId = r.DietPlanRequestId,
                createdAt = r.CreatedAt,
                age = r.Age,
                weight = r.Weight,
                height = r.Height,
                gender = r.Gender,
                activityLevel = r.ActivityLevel,
                goal = r.Goal,
                medicalConditions = r.MedicalConditions,
                status = r.Status,

                user = new
                {
                    userId = r.User.UserId,
                    username = r.User.Username,
                    email = r.User.Email,
                    mobileNumber = r.User.MobileNumber
                },

                dietPlan = new
                {
                    dietPlanId = r.DietPlan.DietPlanId,
                    planName = r.DietPlan.PlanName,
                    description = r.DietPlan.Description,
                    duration = r.DietPlan.Duration,
                    createdAt = r.DietPlan.CreatedAt
                }
            })
            .ToListAsync<object>();
        }


        //Add DietPlanRequest
        public async Task<bool> AddDietPlanRequest (DietPlanRequest dietPlanRequest)
        {
            _context.DietPlanRequests.Add(dietPlanRequest);
            await _context.SaveChangesAsync();
            return true;
        }

        //Update DietPlanRequest
        public async Task<bool> UpdateDietPlanRequest(int dietPlanRequestId, DietPlanRequest dietPlanRequest)
        {
            var obj = await _context.DietPlanRequests.FirstOrDefaultAsync(d => d.DietPlanRequestId == dietPlanRequestId);

            if(obj == null)
            {
                return false;
            }

            obj.ActivityLevel = dietPlanRequest.ActivityLevel;
            obj.Age = dietPlanRequest.Age;
            obj.CreatedAt = dietPlanRequest.CreatedAt;
            obj.Gender = dietPlanRequest.Gender;
            obj.Goal = dietPlanRequest.Goal;
            obj.Height = dietPlanRequest.Height;
            obj.MedicalConditions = dietPlanRequest.MedicalConditions;
            obj.Status = dietPlanRequest.Status;
            obj.Weight = dietPlanRequest.Weight;

            await _context.SaveChangesAsync();
            return true;
        }

        //Delete DietPlanRequest
        public async Task<bool> DeleteDietPlanRequest(int dietPlanRequestId)
        {
            var obj = await _context.DietPlanRequests.FirstOrDefaultAsync(d => d.DietPlanRequestId == dietPlanRequestId);

            if(obj == null)
            {
                return false;
            }

            _context.DietPlanRequests.Remove(obj);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<DietPlanRequest> GetDietPlanRequestById(int dietPlanRequestId)
        {
            return await _context.DietPlanRequests.Include(d => d.DietPlan).Include(u => u.User).FirstOrDefaultAsync(d =>d.DietPlanRequestId == dietPlanRequestId);
        }
    }
}