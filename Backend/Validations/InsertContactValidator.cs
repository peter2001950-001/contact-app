using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Commands;
using FluentValidation;

namespace ContactApp.Backend.Validations
{
    public class InsertContactValidator: AbstractValidator<InsertContactCommand>
    {
        public InsertContactValidator()
        {
            RuleFor(x => x.DateOfBirth).LessThanOrEqualTo(DateTime.Now)
                .WithMessage("Date of birth cannot be a future date.");
            RuleFor(x => x.PhoneNumber).SetValidator(new TelephoneValidator());
            RuleFor(x => x.FirstName).NotEmpty().SetValidator(new PersonNameValidator()).WithMessage("First name is invalid");
            RuleFor(x => x.Surname).NotEmpty().SetValidator(new PersonNameValidator()).WithMessage("Surname is invalid");
            RuleFor(x => x.Iban).NotNull().Length(5, 34)
                .Matches(@"^[A-ZA-Z]{2}[0-9]{2}([A-ZA-Z0-9]){11,30}$").WithMessage("Iban is not valid");
            RuleFor(x => x.Address).MaximumLength(250);
        }
    }
}
