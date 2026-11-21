using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DietPlanRequestController : ControllerBase
    {
        public DietPlanRequestService objDietPRS;
        public DietPlanRequestController(DietPlanRequestService dietPlanRequestService)
        {
            objDietPRS = dietPlanRequestService;
        }

        // Get all DietPlanRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DietPlanRequest>>> GetAllDietPlanRequests()
        {
            var dietPlanRequests = await objDietPRS.GetAllDietPlanRequests();
            return Ok(dietPlanRequests);
        }

        //Add DietPlanRequest
        [HttpPost]
        public async Task<ActionResult> AddDietPlanRequest([FromBody] DietPlanRequest dietPlanRequest)
        {
            try
            {
                var result = await objDietPRS.AddDietPlanRequest(dietPlanRequest);
                if (result)
                {
                    return Ok("Diet Plan Request added successfully");
                }
                else
                {
                    return StatusCode(500, "Failed to add diet plan request");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //Get DietPlanRequest by user Id
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<DietPlanRequest>>> GetDietPlanRequestByUserId(int userId)
        {
            var dietPlanRequests = await objDietPRS.GetDietPlanRequestById(userId);
            return Ok(dietPlanRequests);
        }

        //Update DietPlanRequest
        [HttpPut("{dietPlanRequestId}")]
        public async Task<ActionResult> UpdateDietPlanRequest(int dietPlanRequestId, [FromBody] DietPlanRequest dietPlanRequest)
        {
            try
            {
                var result = await objDietPRS.UpdateDietPlanRequest(dietPlanRequestId, dietPlanRequest);
                if (!result)
                {
                    return NotFound(new
                    {
                        message = "Cannot find any diet plan request"
                    });
                }

                return Ok(new
                {
                    message = "Diet Plan Request updated successfully"
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //Delete DietPlanRequest
        [HttpDelete("{dietPlanRequestId}")]
        public async Task<ActionResult> DeleteDietPlanRequest(int dietPlanRequestId)
        {
            try
            {
                var result = await objDietPRS.DeleteDietPlanRequest(dietPlanRequestId);
                if (!result)
                {
                    return NotFound("Cannot find any diet plan request");
                }
                return Ok("Diet Plan Request deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}