using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Controllers.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ContactApp.Backend.Validations
{
    public class CustomValidationAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ModelState.IsValid) return;
            var errors = context.ModelState.Keys;
            var validationErrors = new List<ValidationError>();
            foreach (var errorKey in errors)
            {
                var error = context.ModelState[errorKey];
                if (error.ValidationState == ModelValidationState.Invalid)
                {
                    validationErrors.Add(new ValidationError(errorKey, error.Errors.Select(x => x.ErrorMessage).ToArray()));
                }

            }

            context.Result = new BadRequestObjectResult(new ValidationFailedResponse(validationErrors));
        }
    }
}
