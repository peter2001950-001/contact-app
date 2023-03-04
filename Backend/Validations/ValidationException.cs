using System;
using System.Collections.Generic;

namespace ContactApp.Backend.Validations
{
    public class ValidationException : Exception
    {
        public ValidationException(IEnumerable<ValidationError> validationErrors) => ValidationErrors = validationErrors;
        public ValidationException(ValidationError validationError) => ValidationErrors = new[] { validationError };

        public IEnumerable<ValidationError> ValidationErrors { get; set; }
    }
   
}
