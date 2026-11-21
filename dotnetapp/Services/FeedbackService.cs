using System;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
namespace dotnetapp.Services
{
    public class FeedbackService
    {
        private readonly ApplicationDbContext _context;
        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<object>> GetAllFeedbacks()
        {
            return await _context.Feedbacks
                .Include(f => f.User)
                .Select(f => new
                {
                    feedbackId = f.FeedbackId,
                    feedbackText = f.FeedbackText,
                    date = f.Date,
                    userId = f.UserId,

                    user = new
                    {
                        userId = f.User.UserId,
                        username = f.User.Username,
                        email = f.User.Email,
                        mobileNumber = f.User.MobileNumber
                    }
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userld)
        {
            return await _context.Feedbacks.Include(u=>u.User).Where(f => f.UserId == userld).ToListAsync();
        }

        public async Task<bool> AddFeedback(Feedback feedback)
        {
            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();

        return true;
        }

        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            var feedback = await _context.Feedbacks.FirstOrDefaultAsync(f => f.FeedbackId == feedbackId);

            if (feedback == null)
            {
                return false;
            }

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}