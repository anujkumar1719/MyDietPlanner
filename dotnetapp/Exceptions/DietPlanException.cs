using System;

namespace dotnetapp.Exceptions
{
    public class DietPlanException:Exception
    {
        public DietPlanException(string message):base(message)
        {

        }        
    }
}