using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{   
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DietPlanController : ControllerBase
    {
        private readonly DietPlanService _dietPlanService;

        public DietPlanController(DietPlanService dietPlanService)
        {
            _dietPlanService = dietPlanService;
        }

        // Get All Diet Plans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DietPlan>>> GetAllDietPlans()
        {
            var dietPlans = await _dietPlanService.GetAllDietPlans();
            return Ok(dietPlans);
        }

        // Get Diet Plan By Id
        [HttpGet("{dietPlanId}")]
        public async Task<ActionResult<DietPlan>> GetDietPlanById(int dietPlanId)
        {
            var dietPlan = await _dietPlanService.GetDietPlanById(dietPlanId);

            if (dietPlan == null)
            {
                return NotFound("Cannot find any diet plan");
            }

            return Ok(dietPlan);
        }

        //Add Diet Plan
        [HttpPost]
        public async Task<ActionResult> AddDietPlan([FromBody] DietPlan dietPlan)
        {
            try
            {
                var result = await _dietPlanService.AddDietPlan(dietPlan);

                if (result)
                {
                    return Ok("Diet Plan added successfully");
                }

                return StatusCode(500, "Failed to add diet plan");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //Update Diet Plan
        [HttpPut("{dietPlanId}")]
        public async Task<ActionResult> UpdateDietPlan(int dietPlanId,
            [FromBody] DietPlan dietPlan)
        {
            try
            {
                var result = await _dietPlanService.UpdateDietPlan(dietPlanId, dietPlan);

                if (!result)
                {
                    return NotFound("Cannot find any diet plan");
                }

                return Ok("Diet Plan updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Delete Diet Plan
        [HttpDelete("{dietPlanId}")]
        public async Task<ActionResult> DeleteDietPlan(int dietPlanId)
        {
            try
            {
                var result = await _dietPlanService.DeleteDietPlan(dietPlanId);

                if (!result)
                {
                    return NotFound("Cannot find any diet plan");
                }

                return Ok("Diet Plan deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
